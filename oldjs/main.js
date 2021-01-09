"use strict"

$(document).ready(function() {
    console.log('reload page~');
    auth()
})

const auth = () => {
    if (localStorage.access_token) {
        afterLogin()
    } else {
        beforeLogin()
    }
}
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://community-open-weather-map.p.rapidapi.com/weather?q=London%2Cuk&lat=0&lon=0&callback=test&id=2172797&lang=null&units=%22metric%22%20or%20%22imperial%22&mode=xml%2C%20html",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "4c7aed84b5msh67da7df9a154499p1e1673jsn2071a87ed6c1",
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});

const initContent = () => {
    $('#navbar').hide()
    $('#landing-page').hide()
    $('#login-section').hide()
    $('#register-section').hide()
    $('#logout-button').hide()
}

const beforeLogin = () => {
    $('#navbar').show()
    $('#landing-page').show()
    $('#login-section').hide()
    $('#register-section').hide()
    $('#logout-button').hide()
    $('#logged').hide()
}

const afterLogin = () => {
    $('#navbar').hide()
    $('#landing-page').hide()
    $('#login-section').hide()
    $('#register-section').hide()
    $('#logout-button').show()
    $('#logged').show()
    // readTodo()
}

$('#to-login-button').click(function(event) {
    event.preventDefault()
    $('#landing-page').hide()
    $('#login-section').show()
    $('#register-section').hide()
})
$('#to-login-button-2').click(function(event) {
    event.preventDefault()
    $('#landing-page').hide()
    $('#login-section').show()
    $('#register-section').hide()
})
$('#to-register-button').click(function(event) {
    event.preventDefault()
    $('#landing-page').hide()
    $('#login-section').hide()
    $('#register-section').show()
    // logout()
})
$('#to-register-button-2').click(function(event) {
    event.preventDefault()
    $('#landing-page').hide()
    $('#login-section').hide()
    $('#register-section').show()
})
$('#home-button').click(function(event) {
    event.preventDefault()
    $('#landing-page').show()
    $('#login-section').hide()
    $('#register-section').hide()
})

$('#register-button').click(function(event) {
    event.preventDefault()
    let email = $('#email-register').val()
    let password = $('#password-register').val()
    let name = $('#name-register').val()
    register(email, password, name)
})

$('#login-button').click(function(event) {
    event.preventDefault()
    let email = $('#email-login').val()
    let password = $('#password-login').val()
    login(email, password)
})

$('#logout-button').click(function(event) {
    event.preventDefault()
    logout()
})

$('#search-todo-button').click(function(event) {
    event.preventDefault()
    readOneTodo('10')
})

$('#read-all-todo').click(function(event) {
    event.preventDefault()
    readTodo()
})

$('#create-todo-button').click(function(event) {
    event.preventDefault()
    let title = $('#title-add').val()
    let description = $('#description-add').val()
    let due_date = $('#due_date-add').val()

    createTodo(title, description, due_date)
})

$('#update-todo-button').click(function(event) {
    event.preventDefault()
    let id = $('#id').val()
    let title = $('#title').val()
    let description = $('#description').val()
    let status = $('#status').val()
    let due_date = $('#due_date').val()
    updateTodo(id, title, description, status, due_date)
})

$('#update-status-todo').click(function(event) {
    event.preventDefault()
    let id = $('#id').val()
    let status = $('#status').val()
    updateStatusTodo(id, status)
})

$('#delete-todo-button').click(function(event) {
    event.preventDefault()
    let id = $('#id').val()
    deleteTodo(id)
})
