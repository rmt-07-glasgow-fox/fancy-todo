let baseURL = "http://localhost:3000"

$('#register-form').hide()

function checkAuth() {
    // console.log(localStorage.access_token)
    if(localStorage.access_token) {
        loggedIn()
    } else {
        // console.log('no')
        loggedOut()
    }
}

function loggedIn() {
    $('#login-form').hide()
    $('#logout-button').show()
    $('#register-form').hide()
}

function loggedOut() {
    $('#login-form').show()
    $('#register-form').hide()
    $('#logout-button').hide()
}

$(document).ready(function() {

    console.log('page di reload')
    checkAuth()
})

$('#login-btn').click(function(event) {
    event.preventDefault()
    let email = $('#login-email').val()
    let password = $('#login-password').val()

    // console.log(email, password)

    $.ajax({
        method: 'POST',
        url: `${baseURL}/login`,
        data: {
            email,
            password
        }
    })
    .done(response => {
        localStorage.setItem('access_token', response.access_token)
        checkAuth()
    })
    .fail(err => {
        console.log(err)
    })
    .always(() => {
        $('#login-email').val('')
        $('#login-password').val('')
    })
})

$('#logout-button').click(function(event) {
    event.preventDefault()
    localStorage.clear()
    checkAuth()
})

$('#register-button').click(function(event) {
    event.preventDefault()
    $('#register-form').show()
    $('#login-form').hide()
})

$('#register-submit').click(function(event) {
    event.preventDefault()

    let email = $('#register-email').val()
    let password = $('#register-password').val()
    let name = $('#register-name').val()

    $.ajax({
        method: 'POST',
        url: `${baseURL}/register`,
        data: {
            name,
            email,
            password
        }
    })
    .done(response => {
        loggedOut()
    })
    .fail(err => {
        console.log(err)
    })
    .always(() => {
        console.log('always')
    })
})