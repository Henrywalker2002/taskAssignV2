var gJson

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
        var row = document.createElement('div')
        row.className = 'row'
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
        else if (x == "lstId") {

        }
        else {
            col2.textContent = gJson['message'][x]
        }
        row.appendChild(col1)
        row.appendChild(col2)
        divContainter.appendChild(row)
    }
    body.appendChild(divContainter)
}

detail()

$('#delete').click(async function() {
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
})

$('.cancel').click(function () {
    window.location.href = "index.html"
})

$('#edit').click (async function() {
    var curId = gJson['message']['lstId']
    $('#btn1').hide()
    $('#btn2').show()
    $('#detailTask').hide()
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

$('next').click (async function() {
    
})