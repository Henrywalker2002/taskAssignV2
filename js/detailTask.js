var gJson
lstEmp = []
document.title = 'route ' + localStorage.getItem('routeId')
async function detail() {
    routeId = parseInt(localStorage.getItem('routeId'))
    var body = document.getElementById('detailTask')
    var divContainter = document.createElement('div')
    divContainter.className = "containner"
    // 
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "routeId": routeId
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    var response = await fetch("https://serverurbanwatse.herokuapp.com/detailTask", requestOptions)
    gJson = await response.json()
    console.log(gJson)
    // 
    var h2 = document.createElement('h2')
    h2.textContent = 'Route ' + routeId.toString()
    body.appendChild(h2)
    for (let x in gJson['message']) {
        if (x == 'lstId') {
            continue
        }
        var row = document.createElement('div')
        row.className = 'row table-responsive'
        row.style.maxHeight = "350px"
        var col1 = document.createElement('div')
        col1.className = 'col'
        col1.textContent = x.toUpperCase()
        var col2 = document.createElement('div')
        col2.className = 'col-10'
        if (x == "route" | x == "MCPs") {
            for (let y in gJson['message'][x]) {
                var tempDiv = document.createElement('div')
                tempDiv.textContent = gJson['message'][x][y]
                col2.appendChild(tempDiv)
            }
        }
        else {
            if (x == 'map') {
                var a = document.createElement('a')
                a.href = gJson['message'][x]
                a.target = "_blank"
                a.textContent = gJson['message'][x]
                col2.appendChild(a)
            }
            else{
                col2.textContent = gJson['message'][x]
            }
        }
        row.appendChild(col1)
        row.appendChild(col2)
        divContainter.appendChild(row)
    }
    body.appendChild(divContainter)
}

detail()

$('#delete').click(async function() {
    
    var pass = window.prompt("Enter password","");
    if (pass != "admin") {
        window.alert("wrong password")
    }
    else {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "routeId": parseInt(localStorage.getItem('routeId'))
        });

        var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        var response = await fetch("https://serverurbanwatse.herokuapp.com/task", requestOptions)
        json_ = await response.json()
        if (json_['result']) {
            window.alert("success")
            window.location.href = "index.html"
        }
    }
})

$('.cancel').click(function () {
    window.location.href = "index.html"
})

$('#edit').click (async function() {
    var curId = gJson['message']['lstId']
    $('#btn1').hide()
    $('#btn2').show()
    $('#detailTask').hide()
    $('#editForm').show()
    var body = document.getElementById('empBody')
    curId.forEach(x => {
        var tr = document.createElement('tr')
        tr.id = 'emp'+x['id']
        var td1 = document.createElement('td')
        td1.textContent = x['id']
        var td2 = document.createElement('td')
        td2.textContent = x['name']
        var td3 = document.createElement('td')
        var boxCheck = document.createElement('input')
        boxCheck.className = "empCheck"
        boxCheck.type = "checkbox"
        boxCheck.id = 'emp' + x['id']
        boxCheck.checked = true
        td3.appendChild(boxCheck)
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        body.appendChild(tr)
    })

    // 
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
      
    var response = await fetch("https://serverurbanwatse.herokuapp.com/listEmployeeFree", requestOptions)
    var json_ = await response.json()
    if (json_['result'] == "ok") {
        var body = document.getElementById('empBody')
        var arr = json_['message']
        arr.forEach(x => {
            var tr = document.createElement('tr')
            tr.id = 'emp'+x['id']
            var td1 = document.createElement('td')
            td1.textContent = x['id']
            var td2 = document.createElement('td')
            td2.textContent = x['name']
            var td3 = document.createElement('td')
            var boxCheck = document.createElement('input')
            boxCheck.className = "empCheck"
            boxCheck.type = "checkbox"
            boxCheck.id = 'emp' + x['id']
            td3.appendChild(boxCheck)
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            body.appendChild(tr)
        })
    }
    //

})

$('#next').click (async function() {
    //
    var listSelEmp = document.querySelectorAll('.empCheck:checked')
    if (listSelEmp.length < 3 | listSelEmp.length > 5) {
        window.alert("number of emp must in 3-5")
    }
    else {
        listSelEmp.forEach(emp => {
            lstEmp.push(parseInt(emp.id.slice(3)))
        })
        console.log(lstEmp)
    }
    //

    var body = document.getElementById('truckBody')
    var tr = document.createElement('tr')
    var td2 = document.createElement('td')
    td2.textContent = gJson['message']['licensePlate']
    var td3 = document.createElement('td')
    var boxCheck = document.createElement('input')
    boxCheck.className = "truckCheck"
    boxCheck.type = "checkbox"
    boxCheck.id = 'truck' + gJson['message']['licensePlate']
    boxCheck.checked = true
    td3.appendChild(boxCheck)
    tr.appendChild(td2)
    tr.appendChild(td3)
    body.appendChild(tr)

    //
    $('#btn2').hide()
    $('#btn3').show()
    $('#editForm').hide()
    //
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
      
    var response = await fetch("https://serverurbanwatse.herokuapp.com/listTruckFree", requestOptions)
    var json_ = await response.json()
    if (json_['result'] == "ok") {
        var body = document.getElementById('truckBody')
        var arr = json_['message']
        arr.forEach(x => {
            var tr = document.createElement('tr')
            var td2 = document.createElement('td')
            td2.textContent = x['licensePlate']
            var td3 = document.createElement('td')
            var boxCheck = document.createElement('input')
            boxCheck.className = "truckCheck"
            boxCheck.type = "checkbox"
            boxCheck.id = 'truck' + x['licensePlate']
            td3.appendChild(boxCheck)
            tr.appendChild(td2)
            tr.appendChild(td3)
            body.appendChild(tr)
        })
    }
    // 
    $('#editTruck').show()
})

$('#btn2').hide()
$('#btn3').hide()
$('#editTruck').hide()
$('#editForm').hide()

$('#confirm').click(async function() {
    //
    var lisencePlate = ''
    var listSelTruck = document.querySelectorAll('.truckCheck:checked')
    if (listSelTruck.length != 1) {
        window.alert("please choose only one truck")
    }
    else {
        listSelTruck.forEach(mcps => {
            lisencePlate = mcps.id.slice(5)
        })
        console.log(lisencePlate)
    }
    //
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "routeId": parseInt(localStorage.getItem('routeId'))
    });

    var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    var response = await fetch("https://serverurbanwatse.herokuapp.com/task", requestOptions)
    json_ = await response.json()
    if (json_['result'] == "ok") {
        //
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
        "employeeId": lstEmp,
        "licensePlate": lisencePlate,
        "routeId": parseInt(localStorage.getItem('routeId'))
        });
    
        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
    
        var response = await fetch("https://serverurbanwatse.herokuapp.com/task", requestOptions)
        var json2 = await response.json()
        if (json2['result'] == "ok") {
            window.alert("success")
            window.location.href = "index.html"
        }
        //
    }
})

$('#back').click(function() {
    $('#btn3').hide()
    $('#btn2').show()
    $('#editTruck').hide()
    $('#editForm').show()
} )

$('.exit').click( function(){
    window.location.reload()
})

$('#logout').click(function() {
    window.localStorage.removeItem('username')
})

if (window.localStorage.getItem('username') == null) {
    window.location.href = "login.html"
}