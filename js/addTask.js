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

$('#addMcps').click(function () {
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

        fetch("https://serverurbanwatse.herokuapp.com/createRoute", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
        var mcpsTab = document.getElementById('mcp')
        mcpsTab.style.display = "none"
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
        var arrEmpId = []
        listSelEmp.forEach(mcps => {
            arrEmpId.push(parseInt(mcps.id.slice(3)))
        })
        console.log(arrEmpId)
        var empTab = document.getElementById('emp')
        empTab.style.display = "none"
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
    var arrTruck = []
    if (listSelTruck.length != 1) {
        window.alert("please choose only one truck")
    }
    else {
        listSelTruck.forEach(mcps => {
            arrTruck.push(mcps.id.slice(5))
        })
        console.log(arrTruck)
        var empTab = document.getElementById('truck')
        empTab.style.display = "none"
    }
})

truck()