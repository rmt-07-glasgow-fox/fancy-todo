const baseUrl = 'http://localhost:3000'

$(document).ready(function() {
    if (localStorage.token_access) {
        dashboardPage()
    } else {
        loginPage()
    }
    $("#newPassword, #confirmPassword").keyup(checkPasswordMatch);
});

const dashboardPage = () => {
    $('#dashboardPage').show();
    $('#loginPage').hide();
    $('#registerPage').hide();
    document.body.className = document.body.className.replace("no-javascript", "");
}

const registerPage = () => {
    $('#dashboardPage').hide();
    $('#loginPage').hide();
    $('#registerPage').slideDown();
    $(document.body).addClass('bg-gradient-primary');
}

const loginPage = () => {
    $('#dashboardPage').hide();
    $('#loginPage').slideDown();
    $('#registerPage').hide();
    $(document.body).addClass('bg-gradient-primary');
}

const logout = () => {
    localStorage.clear()
    $('#logoutModal').modal('hide')
    loginPage()

}

const checkPasswordMatch = () => {
    let password = $("#txtNewPassword").val();
    let confirmPassword = $("#txtConfirmPassword").val();

    if (password != confirmPassword)
        $("#checkPasswordMatch").html("Passwords do not match!");
    else
        $("#checkPasswordMatch").html("Passwords match.");
}

$('#btnLogin').click((event) => {
    event.preventDefault()
    let email = $('#loginEmail').val()
    let password = $('#loginPassword').val()

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/login`,
        data: {
            email,
            password
        },
        success: (data) => {
            localStorage.setItem('access_token', data.token)
            dashboardPage()
        },
        error: (err) => {
            console.log(err);
        }
    })

})