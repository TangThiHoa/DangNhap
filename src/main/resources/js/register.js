function saveUser() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let user = {
        username: username,
        password: password,
        confirmPassword: confirmPassword,
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
            $('#registerModal2').modal('hide');
            showFormLogin()
        },
    })
}
