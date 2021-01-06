const baseURL = "http://localhost:5000"

$(document).ready(function () {
    
    checkAuth()
    //event listener masuk ke dalam document ready
    $("#login-button").click(function (event) {
        event.preventDefault()
        const email = $ ("#email-login").val()
        const password = $ ("#password-login").val()
        
    
        $.ajax({
            method: "POST", 
            url: `${baseURL}/users/login`,
            data: {
                email,
                password
            }
        })
        .done (result => {
            localStorage.setItem("access_token", result.access_token)
            checkAuth()
        })
        .fail (err => {
            console.log(err)
        })
        .always (function () {
            $ ("#email").val("")
            $ ("#password").val("")
        })
    })
    
    $("#logout-button").click(function () {
        localStorage.clear()
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        console.log('User signed out.');
        })
        checkAuth()
    })

    $("#back-to-login").click (function () {
        checkAuth()
    })

    $("#go-register").click (function (event) {

        event.preventDefault()

        $("#login").hide()
        $("#register").show()
        $("#todo").hide()
        $("#logout-button").hide()
    })

    $("#register-button").click(function (event) {
        event.preventDefault()
        const email = $ ("#email-register").val()
        const password = $ ("#password-register").val()
    
        $.ajax({
            method: "POST", 
            url: `${baseURL}/users/register`,
            data: {
                email,
                password
            }
        })
        .done (result => {
            // console.log(result.access_token)
            checkAuth()
        })
        .fail (err => {
            console.log(err)
        })
        .always (function () {
            $ ("#email").val("")
            $ ("#password").val("")
        })
    })

})

function checkAuth () {
    if (localStorage.access_token) {
        $("#login").hide()
        $("#register").hide()
        $("#todo").show()
        getTodoList()
        $("#logout-button").show()
    } else {
        $("#login").show()
        $("#register").hide()
        $("#todo").hide()
        $("#logout-button").hide()   
    }
}

function onSignIn(googleUser) {

    // const profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    const id_token = googleUser.getAuthResponse().id_token;

    $.ajax ({
        method: "POST",
        url: `${baseURL}/users/googleUser`,
        data: { id_token }
    })
    .done (result => {
        localStorage.setItem("access_token", result.access_token)
        checkAuth()
        console.log(result.access_token);
    })
    .fail (err => {
        console.log(err)
    })
}
  

function getTodoList () {
    $.ajax ({
        method: "GET",
        url: `${baseURL}/todos`,
        headers: {
            access_token: localStorage.access_token
        }
    })
    .then (result => {
        console.log(result)
    })
    .fail (err => {
        console.log(err)
    })
}
