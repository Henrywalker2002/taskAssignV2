// global var
var idRoute
var arrEmpId = []
var lisencePlate = ""
// end

$('#mcp').hide()
$('#truck').hide()
$('#backEmp').click(function() {
    window.location.href = "index.html"
})

$('#backTruck').click(function() {
    $('#truck').hide()
    $('#emp').show()
})

$('#backMcp').click(function() {
    $('#mcp').hide()
    $('#truck').show()
})

async function mcps () {
    var tableBody = document.getElementById('mcpsBody')
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
    var response = await fetch("https://serverurbanwatse.herokuapp.com/listMCPs", requestOptions)
    var json_ = await response.json()
    if (json_['result'] == "ok") {
        var listMCPs = json_['message']
        listMCPs.forEach(x => {
            var tr = document.createElement('tr')
            tr.id = 'row'+x['id']
            var td1 = document.createElement('td')
            td1.textContent = x['id']
            var td2 = document.createElement('td')
            td2.textContent = x['address']
            var td3 = document.createElement('td')
            var boxCheck = document.createElement('input')
            boxCheck.className = "mcpCheck"
            boxCheck.type = "checkbox"
            boxCheck.id = 'mcp' + x['id']
            td3.appendChild(boxCheck)
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tableBody.appendChild(tr)
        }
        )
    }
    else {
        window.alert(json_['message'])
    }
}

$('#addMcps').click(async function () {
    var listSelMcps = document.querySelectorAll('.mcpCheck:checked')
    var arrMcpsId = []
    if (listSelMcps.length < 5 | listSelMcps.length > 10) {
        window.alert("number of mcps must in [5-10]")
    }
    else {
        listSelMcps.forEach(mcps => {
            arrMcpsId.push(parseInt(mcps.id.slice(3)))
        })
        console.log(arrMcpsId)
        // begin api
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "MCPs": arrMcpsId
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        var response = await fetch("https://serverurbanwatse.herokuapp.com/createRoute", requestOptions)
        var json_ = await response.json()
        if (json_['result'] == "ok") {
            idRoute = json_['message']['routeId']
            var mcpsTab = document.getElementById('mcp')
            mcpsTab.style.display = "none"
            handleConfirm(json_)
        }
        else {
            window.alert(json_['message'])
        }

        // end api
    }
})

async function emp() {
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
    else {
        window.alert(json_['message'])
    }
}

$('#addEmp').click(function () {
    var listSelEmp = document.querySelectorAll('.empCheck:checked')
    if (listSelEmp.length < 3 | listSelEmp.length > 5) {
        window.alert("number of emp must in 3-5")
    }
    else {
        listSelEmp.forEach(mcps => {
            arrEmpId.push(parseInt(mcps.id.slice(3)))
        })
        console.log(arrEmpId)
        var empTab = document.getElementById('emp')
        empTab.style.display = "none"
        $('#truck').show()
        truck()
    }
})

async function truck() {
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
    else {
        window.alert(json_['message'])
    }
}

$('#addTruck').click(function () {
    var listSelTruck = document.querySelectorAll('.truckCheck:checked')
    if (listSelTruck.length != 1) {
        window.alert("please choose only one truck")
    }
    else {
        listSelTruck.forEach(mcps => {
            lisencePlate = mcps.id.slice(5)
        })
        console.log(lisencePlate)
        var empTab = document.getElementById('truck')
        empTab.style.display = "none"
        $('#mcp').show()
        mcps()
    }
})

async function handleConfirm(json_) {
    var confirmTab = document.getElementById('confirmTab')

    // add license plate
    var row1 = document.createElement('div')
    row1.className = 'row table-responsive'
    row1.style.maxHeight = '500px' 
    var col3 = document.createElement('div')
    col3.className = 'col'
    col3.textContent = "License Plate"
    var col4 = document.createElement('div')
    col4.className = 'col-10'
    col4.textContent = lisencePlate
    row1.appendChild(col3)
    row1.appendChild(col4)
    confirmTab.append(row1)
    // add emps
    var row2 = document.createElement('div')
    row2.className = 'row table-responsive'
    row2.style.maxHeight = '390px' 
    var col5 = document.createElement('div')
    col5.className = 'col'
    col5.textContent = "EmpId"
    var col6 = document.createElement('div')
    col6.className = 'col-10'
    var s = ""
    for (let x in arrEmpId) {
        s += arrEmpId[x].toString() + ', '
    }
    col6.textContent = s.slice(0,-2)
    row2.appendChild(col5)
    row2.appendChild(col6)
    confirmTab.append(row2)

    for (let x in json_['message']){ 
        var row = document.createElement('div')
        row.className = 'row table-responsive'
        row.style.maxHeight = '500px' 
        // 
        var col1 = document.createElement('div')
        col1.className = 'col'
        col1.textContent = x.toUpperCase()
        // 
        var col2 = document.createElement('div')
        col2.className = 'col-10'
        if (x == "path") {
            json_['message'][x].forEach(e => {
                var tempDiv = document.createElement('div')
                tempDiv.textContent = e
                col2.appendChild(tempDiv)
            })
        }
        else if (x == "link") {
            var a = document.createElement('a')
            a.href = json_['message'][x]
            a.target = "_blank"
            a.textContent = json_['message'][x]
            col2.appendChild(a)
        }
        else {
            col2.textContent = json_['message'][x]
        }
        row.appendChild(col1)
        row.appendChild(col2)
        confirmTab.appendChild(row)
    }



    var temp = document.createElement('div')
    temp.style.textAlign = "right"
    var btnConfirm = document.createElement('button')
    btnConfirm.type = "submit"
    btnConfirm.onclick = function() {
        addTask()
    }
    btnConfirm.className = 'btn btn-success'
    btnConfirm.textContent = "confirm"
    // btn cancel
    var btnCancel = document.createElement('button')
    btnCancel.type = 'submit'
    btnCancel.onclick = function () {
        window.location.reload()
    }
    btnCancel.className = "btn btn-success"
    btnCancel.textContent = "Cancel"
    temp.appendChild(btnCancel)
    temp.appendChild(btnConfirm)
    //
    confirmTab.appendChild(temp)
}

async function addTask() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "employeeId": arrEmpId,
    "licensePlate": lisencePlate,
    "routeId": idRoute
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    var response = await fetch("https://serverurbanwatse.herokuapp.com/task", requestOptions)
    var json_ = await response.json()
    if (json_['result'] == "ok") {
        window.alert("success")
        window.location.href = "index.html"
    }
    else {
        window.alert(json_['message'])
    }
}

emp()

$('#logout').click(function() {
    window.localStorage.removeItem('username')
})

if (window.localStorage.getItem('username') == null) {
    window.location.href = "login.html"
}