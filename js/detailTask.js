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
    json_ = await response.json()
    console.log(json_)
    // 
    var h2 = document.createElement('h2')
    h2.textContent = 'Route ' + routeId.toString()
    body.appendChild(h2)
    for (let x in json_['message']) {
        var row = document.createElement('div')
        row.className = 'row'
        var col1 = document.createElement('div')
        col1.className = 'col'
        col1.textContent = x.toUpperCase()
        var col2 = document.createElement('div')
        col2.className = 'col-10'
        if (x == "route" | x == "MCPs") {
            for (let y in json_['message'][x]) {
                var tempDiv = document.createElement('div')
                tempDiv.textContent = json_['message'][x][y]
                col2.appendChild(tempDiv)
            }
        }
        else {
            col2.textContent = json_['message'][x]
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