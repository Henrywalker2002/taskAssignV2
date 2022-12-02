from flask import Flask, request, render_template
import json
import openrouteservice as ors
import folium
from flask.json import jsonify
import pymysql
from app import app
from config import mysql
import datetime
import os
import random

client = ors.Client(key = '5b3ce3597851110001cf6248390b1ad3cc304b409773df1e48fb3930')

listRoute = dict()

#handle route
def getRouteAndCreateLink(coordinates, routeId, lstName):
    route = client.directions(coordinates=coordinates,
                          profile='driving-car',
                          format='geojson')
    map_directions = folium.Map(location=[10.773057,106.700014], zoom_start=13)
    i = 0
    for x in coordinates:
        folium.Marker(location=[x[1], x[0]], popup=lstName[i]).add_to(map_directions)
        i+=1

    # add geojson to map
    folium.GeoJson(route, name='route').add_to(map_directions)

    # add layer control to map (allows layer to be turned on or off)
    folium.LayerControl().add_to(map_directions)

    # map save to html
    name = './templates/' + str(routeId) + '.html'
    map_directions.save(name)
    return route

@app.route('/')
def index():
    return "success"

#display map
@app.route('/route/<route>')
def getIndex(route):
    return render_template(str(route)+ '.html')

#for api call createRoute 
@app.route('/createRoute', methods = ['GET', 'POST'])
def createRoute():
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        json_ = request.json
        MCPs = json_['MCPs']
        cursor.execute('select max(id) from route')
        temp = cursor.fetchall()
        if temp[0]['max(id)'] == None:
            routeId = 1
        else:
            routeId = temp[0]['max(id)'] + 1
        coordinates = []
        tempLst = []
        for x in MCPs:
            cursor.execute('select * from mcp where id = %s', x)
            temp = cursor.fetchall()
            coordinate = [temp[0]['y'], temp[0]['x']]
            coordinates.append(coordinate)
            tempLst.append(temp[0]['id'])
        route = getRouteAndCreateLink(coordinates, routeId, tempLst)
        x = route['features'][0]['properties']['segments'][0]['steps']
        path = []
        link = 'https://serverurbanwatse.herokuapp.com/route/' + str(routeId)
        for y in x:
            path.append('distance: '+ str(y['distance']) + ', instruction: ' + str(y['instruction']))
        d = {"result":"ok", "message": {"path" : path, "link":link, "routeId": routeId}}
        listRoute[routeId] = [path, link, MCPs]
        return jsonify(d)
    except Exception as e:
        return e
    finally:
        if conn.open:
            cursor.close()
            conn.close()

@app.route('/getRoute', methods = ['GET', 'POST'])
def getRoute():
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        json_ = request.json
        routeId = json_['routeId']
        rc = cursor.execute("select * from route where id = %s",routeId)
        if rc == 0:
            d = {"result":"fail", "message": "no route found"}
            return jsonify(d)
        d=  {"result":"ok", "message": cursor.fetchall()[0]} 
        return jsonify(d)
    except Exception as e:
        return e
    finally:
        if conn.open:
            cursor.close()
            conn.close()
    
@app.route('/listTruckFree', methods = ['GET'])
def getListTruck():
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        rc = cursor.execute('select * from truck where status = 0')
        if rc == 0:
            d = {"result":"fail", "message":"no truck is free now"}
            return jsonify(d)
        d = {"result":"ok", "message": cursor.fetchall()}
        return jsonify(d)
    except Exception as e:
        return e
    finally:
        if conn.open:
            cursor.close()
            conn.close()

@app.route('/listEmployeeFree', methods = ['GET'])
def listEmployeeFree():
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        rc = cursor.execute('select * from employee where status = 0')
        if rc == 0:
            d = {"result":"fail", "message":"no employee is free now"}
            return jsonify(d)
        d = {"result":"ok", "message": cursor.fetchall()}
        return jsonify(d)
    except Exception as e:
        return e
    finally:
        if conn.open:
            cursor.close()
            conn.close()

@app.route('/listMCPs')
def getMCPs():
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        rc = cursor.execute('select * from mcp where status = 0 and percentContain >= 80')
        if rc == 0:
            d = {"result":"fail", "message":"no mcp need to collect now"}
            return jsonify(d)
        d = {"result":"ok", "message" : cursor.fetchall()}
        return jsonify(d)
    except Exception as e:
        return e
    finally:
        if conn.open:
            cursor.close()
            conn.close()

@app.route('/listTask')
def getListTask():
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        rc = cursor.execute('select * from task where date = %s', datetime.date.today())
        if rc == 0:
            d = {"result":"fail", "message":"no task to view"}
            return jsonify(d)
        d = {"result":"ok", "message": cursor.fetchall()}
        return jsonify(d)
    except Exception as e:
        return e
    finally:
        if conn.open:
            cursor.close()
            conn.close()

@app.route('/task', methods = ['POST'])
def addTask():
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        json_ = request.json
        employee = json_['employeeId']
        license_plate = json_['licensePlate']
        routeId = json_['routeId']
        if listRoute.get(routeId) == None:
            d = {"result":"fail", "message":"no routeId found, please retry"}
            return jsonify(d)
        temp = listRoute[routeId]
        s = '\n'.join(temp[0])
        rc = cursor.execute('insert into route (id, path, map) values (%s, %s, %s)', (routeId, s, temp[1]))
        for x in employee:
            query = 'insert into task (licensePlate, employeeId, routeId, `date`) values (%s, %s, %s, %s)'
            bindData = (license_plate, x, routeId, datetime.date.today())
            rc = cursor.execute(query, bindData)
            if rc == 0:
                d = {"result":"fail", "message":"error occured, retry please"}
                return jsonify(d)
            rc = cursor.execute('update employee set status = 1 where id = %s', x)
        rc = cursor.execute('update truck set status = 1 where licensePlate = %s', license_plate)
        for x in temp[2]:
            rc = cursor.execute('update mcp set status = 0, routeId = %s where id = %s', (routeId, x))
        conn.commit()
        listRoute.pop(routeId)
        d = {"result":"ok", "message":"success"}
        return jsonify(d)
    except Exception as e:
        return e
    finally:
        if conn.open:
            cursor.close()
            conn.close()

@app.route('/detailTask', methods = ['GET', 'POST'])
def getTask():
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        json_ = request.json    
        routeId = json_['routeId']
        rc = cursor.execute('select licensePlate, name, id from task join employee on task.employeeId = employee.id where routeId =%s', routeId)
        if rc == 0:
            d = {"result":"fail", "message":"no task found"}
            return jsonify(d)
        employee = cursor.fetchall()
        rc = cursor.execute('select id, address from mcp where routeId = %s', routeId)
        mcps = cursor.fetchall()
        rc = cursor.execute('select * from route where id = %s', routeId)
        route = cursor.fetchall()
        licensePlate = employee[0]['licensePlate']
        for x in employee:
            x.pop('licensePlate')
        message = {"employee":employee, "MCPs": mcps, "route": route[0], "licensePlate": licensePlate}
        d = {"result":"ok", "message":message}
        return jsonify(d)
    except Exception as e:
        return e
    finally:
        if conn.open:
            cursor.close()
            conn.close()
            
@app.route('/task', methods = ['DELETE'])
def delTask():
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        json_ = request.json    
        routeId = json_['routeId']
        rc = cursor.execute('select * from task where routeId = %s', routeId)
        if rc == 0:
            d = {"result":"fail", "message":"no task found"}
            return jsonify(d)
        temp = cursor.fetchall()
        licensePlate = temp[0]['licensePlate']
        for x in temp:
            rc = cursor.execute('update employee set status = 0 where id = %s', x['employeeId'])
        cursor.execute('update mcp set status = 0 where routeId = %s', routeId)
        rc = cursor.execute('update truck set status = 0 where licensePlate = %s', licensePlate)
        cursor.execute('delete from task where routeId = %s', routeId)
        cursor.execute('delete from route where id = %s', routeId)
        conn.commit()
        if os.path.exists('tempalates/' + str(routeId) + '.html'):
            os.remove('tempalates/' + str(routeId) + '.html')
        d = {"result":"ok", "message":"success"}
        return jsonify(d)
    except Exception as e:
        return e
    finally:
        if conn.open:
            cursor.close()
            conn.close()

@app.route('/doneTask', methods = ['POST'])
def doneTask():
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        json_ = request.json    
        routeId = json_['routeId']
        rc = cursor.execute('select * from task where routeId = %s', routeId)
        if rc == 0:
            d = {"result":"fail", "message":"no task found"}
            return jsonify(d)
        temp = cursor.fetchall()
        licensePlate = temp[0]['licensePlate']
        for x in temp:
            rc = cursor.execute('update employee set status = 0 where id = %s', x['employeeId'])
        cursor.execute('update mcp set status = 0,percentContain = 0 where routeId = %s', routeId)
        rc = cursor.execute('update truck set status = 0 where licensePlate = %s', licensePlate)
        cursor.execute('delete from task where routeId = %s', routeId)
        cursor.execute('delete from route where id = %s', routeId)
        conn.commit()
        if os.path.exists('tempalates/' + str(routeId) + '.html'):
            os.remove('tempalates/' + str(routeId) + '.html')
        d = {"result":"ok", "message":"success"}
        return jsonify(d)
    except Exception as e:
        return e
    finally:
        if conn.open:
            cursor.close()
            conn.close()

@app.route('/refillMCPs')
def refill():
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        for i in range(0,100):
            check = random.randint(0,2)
            if check == 2:
                percent = random.randint(80,97)
                rc = cursor.execute('update mcp set percentContain = %s where id = %s', (percent, i))
            else:
                percent = random.randint(0, 70)
                rc = cursor.execute('update mcp set percentContain = %s where id = %s', (percent, i))
        conn.commit()
        return jsonify({"result":"ok"})
    except Exception as e:
        return e
    finally:
        if conn.open:
            cursor.close()
            conn.close()
    
@app.route('/login', methods = ['GET', "POST"])
def login():
    try:
        json_ = request.json
        if (json_['username'] == "admin" and json_['password'] == "admin"):
            return jsonify({"result":"ok", "message":"success"})
        return jsonify({"result":"fail", "message":"wrong username or password"})
    except Exception as e:
        return e

if __name__ == '__main__':
    app.run()

