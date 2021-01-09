const server = 'http://localhost:3000'

const authCheck = () => {
    if(localStorage.access_token){
        $('#register-page').hide()
        $('#login-page').hide()
        $('#logout-nave').show()
        $('#addTodos-page').show()
        $('#form-todos').hide()
        $('#showform').show()
        $('#edit-user').show()
    }
    else {
        register()
    }
}

// register
const register = () => {
    $('#register-page').show()
    $('#login-page').hide()
    $('#logout-nave').hide()
    $('#addTodos-page').hide()
    $('#form-todos').hide()
    $('#showform').hide()
    $('#edit-user').hide()
}

$('#showLogin').click((event) => {
    event.preventDefault()
    login()
})

$('#register-btn').click(function(event){
    event.preventDefault()
    let email = $('#email-reg').val()
    let name = $('#name-reg').val()
    let password = $('#password-reg').val()
    $.ajax({
        method: 'POST',
        url: `${server}/register`,
        data: {
            email,
            name,
            password
        }
    })
    .done(response => {
        console.log(response, 'this is response')
        login()
    })
    .fail(err => {
        console.log(err, '>>>>>>> this is error')
        let errMessage = err.responseJSON.message
        console.log(errMessage);
        // Swal.fire({
        //     title: 'Error!',
        //     text: errMessage,
        //     icon: 'error',
        //     confirmButtonText: 'Close'
        //   })
    })
    .always(() => {
        $('#email-reg').val('')
        $('#name-reg').val('')
        $('#password-reg').val('')
        $('#rePassword').val('')
    })
})

//login

const login = () => {
    $('#register-page').hide()
    $('#login-page').show()
    $('#logout').hide()
    $('#addTodos-page').hide()
    $('#form-todos').hide()
    $('#showform').hide()
    $('#edit-user').hide()
}

function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

$('#login-btn').click(function(event){
    event.preventDefault()
    let email = $('#email-login').val()
    let password = $('#password-login').val()
    $.ajax({
        method: 'POST',
        url: `${server}/login`,
        data : {
            email,
            password
        }
    })
    .done(response => {
        console.log(response, 'ini res')
        localStorage.setItem("access_token", response.access_token)
    })
    .fail(err => {
        console.log(err.responseJSON)
        let errMessage = err.responseJSON.message
        Swal.fire({
            title: 'Error!',
            text: errMessage.split('Validation error:').join('\n'),
            icon: 'error',
            confirmButtonText: 'Close'
          })
    })
    .always(() => {
        $('#email-login').val('')
        $('#password-login').val('')
    })
})

$('#logout-nave').click((event) => {
    event.preventDefault()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut()
    .then(function () {
        localStorage.clear()
        console.log('User signed out.');
        login()
    })
    .catch(err=>{
        console.log(err, `ini error di google account`)
    })
})



$(document).ready(function(){
    console.log('Greetings My lords')
    authCheck()
});


