async function appendTask() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
      
    var response = await fetch("https://serverurbanwatse.herokuapp.com/listTask", requestOptions)
    var json_ = await response.json()
    if (json_['result'] == "ok") {
        var arr = json_['message']
        var cur = json_['message'][0]
        var allEmp = ''
        console.log(json_)
        arr.forEach(element => {
            if (element['licensePlate'] != cur['licensePlate']) {
                var body = document.getElementById('lstTask')
                var tr = document.createElement('tr')
                tr.id = 'tr' + cur['routeId']
                var th = document.createElement('th')
                th.scope = "row"
                th.textContent = cur['routeId']
                tr.appendChild(th)
                var th1 = document.createElement('th')
                th1.textContent = allEmp
                tr.appendChild(th1)
                var th2 = document.createElement('th')
                th2.textContent = cur['licensePlate']
                tr.appendChild(th2)
                var th3 = document.createElement('th')
                th3.textContent = cur['map']
                tr.appendChild(th3)
                tr.onclick = function () {
                    var routeId = tr.id
                    console.log(routeId)
                }
                body.append(tr)
                allEmp = element['name'] + ', '
                cur = element
            }
            else {
                allEmp += element['name'] + ', '
            }
        });

        var body = document.getElementById('lstTask')
        var tr = document.createElement('tr')
        tr.id = 'tr' + cur['routeId']
        var th = document.createElement('th')
        th.scope = "row"
        th.textContent = cur['routeId']
        tr.appendChild(th)
        var th1 = document.createElement('th')
        th1.textContent = allEmp
        tr.appendChild(th1)
        var th2 = document.createElement('th')
        th2.textContent = cur['licensePlate']
        tr.appendChild(th2)
        var th3 = document.createElement('th')
        th3.textContent = cur['map']
        tr.appendChild(th3)
        tr.onclick = function () {
            var routeId = tr.id
            console.log(routeId)
        }
        body.append(tr)
    }        
};

appendTask();
