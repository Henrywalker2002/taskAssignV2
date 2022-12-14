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

mcps()

$('#addMcps').click(function () {
    var listSelMcps = document.querySelectorAll('.mcpCheck:checked')
    var arrMcpsId = []
    listSelMcps.forEach(mcps => {
        arrMcpsId.push(parseInt(mcps.id.slice(3)))
    })
    console.log(arrMcpsId)
    var mcpsTab = document.getElementById('mcp')
    mcpsTab.style.display = "none"
})

async function emp() {

}