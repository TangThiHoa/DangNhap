function login() {
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    let user = {
        username: username,
        password: password
    }
    console.log(user)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "POST",
        url: "http://localhost:8000/login",
        data: JSON.stringify(user),
        success: function (data) {
            console.log(data.accessToken)
            accessToken = data.accessToken
            idUser = data.id;
            checkLogin()
        },
    })
}
