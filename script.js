async function appendTask() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
      
    var response = await fetch("https://serverurbanwatse.herokuapp.com/listTask", requestOptions)
    var json_ = await response.json()
    if (json_['result'] == "ok") {
        var arr = json_['message']
        console.log(json_)
        var body = document.getElementById('lstTask')
        arr.forEach(e => {
            var tr = document.createElement('tr')
            tr.id = 'routeId' + e['routeId']
            var td1 = document.createElement('td')
            td1.textContent = e['routeId']
            var td2 = document.createElement('td')
            td2.textContent = e['Employees']
            var td3 = document.createElement('td')
            td3.textContent = e['licensePlate']
            var td4 = document.createElement('td')
            var a = document.createElement('a')
            a.textContent = e['map']
            a.target = "_blank"
            a.href = e['map']
            td4.appendChild(a)
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tr.appendChild(td4)
            tr.onclick = function() {
                var gRouteId = parseInt(tr.id.slice(7))
                localStorage.setItem('routeId', gRouteId)
                window.location.href = "detailTask.html"
            }
            body.append(tr)
        })
    }        
}

appendTask()