document.getElementById('content').innerHTML = `
<div class="main">
            <input type="checkbox" id="chk" aria-hidden="true">

            <div class="signup" id="su">
                <div>
                    <label for="chk" aria-hidden="true">Sign up</label>
            <input type="text" name="username" id="username" placeholder="User name" required="">
            <input type="text" name="password" id="password" placeholder="Password" required="">
            <input type="text" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" required="">
            <button onclick="singUp()">Sign up</button>
        </div>
    </div>

    <div class="login" id="ln">
        <div>
            <label for="chk" aria-hidden="true">Login</label>
            <input type="username" name="username" placeholder="User name" required="" >
            <input type="password" name="password" placeholder="Password" required="">
            <button onclick="login()">Login</button>
        </div>
    </div>
</div>
`
let id;
let token;
let storageKey = 'token';
let storageKeyId = 'id';

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
            alert("Đăng nhập thành công! ")
            console.log(data)
            token = data.accessToken;
            id = data.id;
            localStorage.setItem(storageKey, token)
            localStorage.setItem(storageKeyId, id)


        },
        error: function (error) {
            alert("Đăng nhập thất bại!")
            console.log(error)

        }
    })
}

function singUp() {
    let userName = document.getElementById("username").value;
    let password = document.getElementById("password").value;
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
            $('#username').val("");
            $('#password').val("");
            $('#confirmPassword').val("");
            alert("Đăng kí thành công!")

        },
        error: function (error) {
            console.log(error)
            alert("Đăng kí thất bại!")
        }
    })
}
