const onUrl = 'https://127.0.0.1:8080'

$('#login-form').hide()


$(document).ready(function () {
    if (localStorage.accessToken) {
        userLogedIn()
    } else {
        userLogedOut()
    }
});

function showRegisterForm(el) {
    el.preventDefault()
    $('#login-form-display').hide()
    $('#register-form-display').show()
}

function showLoginForm(el) {
    el.preventDefault()
    $('#login-form-display').show()
    $('#register-form-display').hide()
}

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    
}

// sign out user google
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

