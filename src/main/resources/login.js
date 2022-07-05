document.getElementById("content").innerHTML
    = `<style>
    @import url(https://fonts.googleapis.com/css?family=Roboto:300);
    .login-page {
        width: 360px;
        padding: 8% 0 0;
        margin: auto;
    }
    .form {
        position: relative;
        z-index: 1;
        background: #FFFFFF;
        max-width: 360px;
        margin: 0 auto 100px;
        padding: 45px;
        text-align: center;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    }
    .form input {
        font-family: "Roboto", sans-serif;
        outline: 0;
        background: #f2f2f2;
        width: 100%;
        border: 0;
        margin: 0 0 15px;
        padding: 15px;
        box-sizing: border-box;
        font-size: 14px;
    }
    .form button {
        font-family: "Roboto", sans-serif;
        text-transform: uppercase;
        outline: 0;
        background: #4CAF50;
        width: 100%;
        border: 0;
        padding: 15px;
        color: #FFFFFF;
        font-size: 14px;
        -webkit-transition: all 0.3 ease;
        transition: all 0.3 ease;
        cursor: pointer;
    }
    .form button:hover,.form button:active,.form button:focus {
        background: #43A047;
    }
    .form .message {
        margin: 15px 0 0;
        color: #b3b3b3;
        font-size: 12px;
    }
    .form .message a {
        color: #4CAF50;
        text-decoration: none;
    }
    .form .register-form {
        display: none;
    }
    .container {
        position: relative;
        z-index: 1;
        max-width: 300px;
        margin: 0 auto;
    }
    .container:before, .container:after {
        content: "";
        display: block;
        clear: both;
    }
    .container .info {
        margin: 50px auto;
        text-align: center;
    }
    .container .info h1 {
        margin: 0 0 15px;
        padding: 0;
        font-size: 36px;
        font-weight: 300;
        color: #1a1a1a;
    }
    .container .info span {
        color: #4d4d4d;
        font-size: 12px;
    }
    .container .info span a {
        color: #000000;
        text-decoration: none;
    }
    .container .info span .fa {
        color: #EF3B3A;
    }
    body {
        background: #76b852; /* fallback for old browsers */
        background: rgb(141,194,111);
        background: linear-gradient(90deg, rgba(141,194,111,1) 0%, rgba(118,184,82,1) 50%);
        font-family: "Roboto", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>`
    + `
<div class="login-page">
  <div class="form" id="form">
    <div class="login-form">
    </div>
  </div>
</div>`
let id;
let token;
let storageKey = 'token';
let storageKeyId = 'id';
formLogin();
function formLogin(){
    document.getElementById("form").innerHTML = `<input type="text" placeholder="username"  id = "username"/>
      <input type="password" placeholder="password" id="password" />
      <button onclick="login()">login</button>
      <p class="message">Not registered? <a onclick="FormRegister()">Create an account</a></p>`
}
function login() {
    let userName = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let user = {
        username: userName,
        password: password,
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "POST",
        url: "http://localhost:8000/login",
        data: JSON.stringify(user),
        success: function (data) {
            console.log(data)
            token = data.accessToken;
            id = data.id;
            localStorage.setItem(storageKey , token)
            localStorage.setItem(storageKeyId , id)
            main();
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function FormRegister(){
    document.getElementById("form").innerHTML = `<input type="text" placeholder="name" id = "usernameRegister"/>
      <input type="password" placeholder="password" id="passWordRegister"/>
      <input type="text" placeholder="confirm password" id = "confirmPassword"/>
      <button onclick="register()">create</button>
      <p class="message">Already registered? <a onclick="formLogin()">Sign In</a></p>`
}

function register(){
    let userName = document.getElementById("usernameRegister").value;
    let password = document.getElementById("passWordRegister").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let user = {
        username: userName,
        password: password,
        confirmPassword: confirmPassword
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "POST",
        url: "http://localhost:8000/register",
        data: JSON.stringify(user),
        success: function () {
            $('#usernameRegister').val("");
            $('#passWordRegister').val("");
            $('#confirmPassword').val("");
            alert("Đăng kí thành công!")
        },
        error: function (error) {
            console.log(error)
        }
    })
}