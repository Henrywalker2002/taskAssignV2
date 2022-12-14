// global var
var idRoute
var arrEmpId = []
var lisencePlate = ""
// end

$('#mcp').hide()
$('#truck').hide()

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
            tr.id = 'emp'+x['id']
            var td1 = document.createElement('td')
            td1.textContent = x['id']
            var td2 = document.createElement('td')
            td2.textContent = x['licensePlate']
            var td3 = document.createElement('td')
            var boxCheck = document.createElement('input')
            boxCheck.className = "truckCheck"
            boxCheck.type = "checkbox"
            boxCheck.id = 'truck' + x['licensePlate']
            td3.appendChild(boxCheck)
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            body.appendChild(tr)
        })
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
    for (let x in json_['message']){ 
        var row = document.createElement('div')
        row.className = 'row' 
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
            a.textContent = "link to map"
            col2.appendChild(a)
        }
        else {
            col2.textContent = json_['message'][x]
        }
        row.appendChild(col1)
        row.appendChild(col2)
        confirmTab.appendChild(row)
    }
    btnConfirm = document.createElement('button')
    btnConfirm.type = "submit"
    btnConfirm.onclick = function() {
        addTask()
    }
    btnConfirm.textContent = "confirm"
    confirmTab.appendChild(btnConfirm)
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
    }
}

emp()