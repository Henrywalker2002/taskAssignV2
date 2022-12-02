from app import app
from flaskext.mysql import MySQL

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'bf314d8f7745a4'
app.config['MYSQL_DATABASE_PASSWORD'] = '76cb39fb'
app.config['MYSQL_DATABASE_DB'] = 'heroku_24617399df0705a'
app.config['MYSQL_DATABASE_HOST'] = 'us-cdbr-east-06.cleardb.net'
mysql.init_app(app)