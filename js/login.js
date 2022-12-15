$('#btn-log').click(async function() {
    var username = $('#username').val()
    var password = $('#password').val()
    
    // api
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "username": username,
    "password": password
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    var response = await fetch("https://serverurbanwatse.herokuapp.com/login", requestOptions)
    var json_ = await response.json()
    if (json_['result'] == 'ok') {
        window.localStorage.setItem("username", username)
        window.location.href = "index.html"
    }
    else {
        var notify = document.getElementById('notify')
        notify.textContent = json_['message']
    }
    // end
})

if (window.localStorage.getItem('username')) {
    window.location.href = 'index.html'
}