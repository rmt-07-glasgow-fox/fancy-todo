const baseUrl = 'http://localhost:3000'

$(function(){
    authorization()
})

function authorization(){
    if(localStorage.access_token){
        $('.nav').show()
        $('#greetings').hide()
        $('#login-form').hide()
        $('#signin-form').hide()
        $('#form-todo').hide()
        $('#todo-feature').show()
        getTodoList()
        $(".todo-list").show()
        $("#welcome-page").hide()
        $('#error-add').empty()
        $("#function-holidays").hide()
        $("#template-login").hide()
        $("#website-name").show()
    } else {
        $('.nav').hide()
        $('#login-form').hide()
        $('#signin-form').hide()
        $('#todo-feature').hide()
        $('#form-todo').hide()
        $('#greetings').hide()
        $("#welcome-page").show()

        $('#btn-login').hide()
        $("#template-login").show()
        $("#website-name").hide()
        $("#register-button").hide()
        $("#btn-sign-up").show()
        $("#login-button").show()
    }
}

$('#btn-sign-up').on('click', function(){
    event.preventDefault()
    $('#signin-form').show()
    $('#login-form').hide()
    $('#btn-sign-up').hide()
    $('#btn-login').show()
    $("#login-error").empty()
    $("#email").val('')
    $("#password").val('')
    $("#register-button").show()
    $("#login-button").hide()
    $("#btn-login").show()
    $("#btn-sign-up").hide()
})

$('#btn-login').on('click', function(event){
    event.preventDefault()
    // $('#signin-form').hide()
    // $('#login-form').show()
    // $('#btn-login').hide()
    // $('#btn-sign-up').show()
    // $("#signup-error").empty()
    $("#login-button").show()
    $("#register-button").hide()
    $("#btn-login").hide()
    $("#btn-sign-up").show()
})



$("#logout").on('click',function(){
    localStorage.clear()
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    authorization()
    $("#email").val('')
    $("#password").val('')
})

$("#register").on('click',function(event){
    event.preventDefault()
    const email = $("#email").val()
    const password = $("#password").val()
    $.ajax({
        method : "POST",
        url : `${baseUrl}/register`,
        data : {
            email,
            password
        }
    })
    .done(response => {
        authorization()
    })
    .fail(error => {
        $("#signup-error").empty()
        error.responseJSON.Errors.forEach(el =>{
            $("#signup-error").append(`
            <h5>${el}<h5>
            `)
        })
    })
    .always(() => {
        $("#email").val('')
        $("#password").val('')
    })
})

$('#login').on('click', function(event){
    event.preventDefault()
    const email = $("#email").val()
    const password = $("#password").val()
    $.ajax({
        method : 'POST',
        url : `${baseUrl}/login`,
        data : {
            email,
            password
        }
    })
    .done(function(response){
        localStorage.setItem('access_token', response.access_token)
        authorization()
    })
    .fail(function(error){
        console.log(error)
        $("#login-error").empty()
        $("#login-error").append(`<h5>${error.responseJSON.message}<h5>`)
    })
    .always(function(){
        console.log('always')
    })
})

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token)
    $.ajax({
        method : "POST",
        url : `${baseUrl}/loginGoogle`,
        data : {
            id_token
        }
    })
    .done(response => {
        localStorage.setItem('access_token', response.access_token)
        authorization()
    }).fail((xhr, status) => {

    })
}

function getTodoList(){
    $.ajax({
        method : 'GET',
        url : `${baseUrl}/todos`,
        headers : {
            access_token : localStorage.access_token
        }
    })
    .done(function(response){
        todolist = response
        $('#todo').empty()
        if(todolist.message){
            $('#todo').append(`
            <div>
                <h5>No Todo<h5>
            </div>`)
        } else {
            todolist.forEach((el , i) => {
                $('#todo').append(`
                <div>
                    <h5>${i + 1}
                    <h5>${el.title}<h5>
                    <h5>${el.description}<h5>
                    <h5>${el.status}<h5><a href="#" onclick="editStatus(${el.id})">Complete Task</a>
                    <h5>${el.due_date.substring(0,10)}<h5>
                    <a href="#" onclick="getTodo(${el.id})">Edit</a>
                    <a href="#" onclick="deleteTodo(${el.id})">Delete</a>
                </div>`)  
            })
        }
    })
    .fail(function(jqXHR, textStatus){
        console.log(jqXHR)
        console.log(textStatus)
    })
}

function addTodoList(){
    const status = false
    const title = $("#title").val()
    const description = $("#description").val()
    const due_date = $("#due_date").val()
    $.ajax({
        method : "POST",
        url : `${baseUrl}/todos`,
        headers : {
            access_token : localStorage.access_token
        },
        data : {
            title,
            description,
            status,
            due_date
        },
    })
    .done((response) => {
        authorization()
    })
    .fail(error => {
        $('#error-add').empty()
        error.responseJSON.Errors.forEach(el =>{
            $("#error-add").append(`
            <h5>${el}<h5>
            `)
        })
    })
    .always(()=>{
        
    })
}

function getTodo(id){
    $.ajax({
        method : "GET",
        url : `${baseUrl}/todos/${id}`,
        headers : {
            access_token : localStorage.access_token
        }
    })
    .done(response => {
        const date = response.due_date.substring(0,10)
        $('#error-form').empty()
        $("#form-todo").show()
        $(".todo-list").hide()
        $('#add-todo').hide()
        $('#edit-todo').show()
        $('#title').val(response.title)
        $('#description').val(response.description)
        $('#due_date').val(date)
        $('#edit-todo').data('id', id)
    })
    .fail(error => {
        console.log(error)
    })
}

function editStatus(id){
    $.ajax({
        method : "PATCH",
        url : `${baseUrl}/todos/${id}`,
        headers : {
            access_token : localStorage.access_token
        },
        data : {
            status : true
        }
    })
    .done(response => {
        $(".todo-list").show()
        authorization()
    })
    .fail(error => {
        
    })
}


function deleteTodo(id){
    $.ajax({
        method : "DELETE",
        url : `${baseUrl}/todos/${id}`,
        headers : {
            access_token : localStorage.access_token
        }
    })
    .done((response) => {
        authorization()
    })
    .fail(error => {
        console.log(err)
    })
}

$("#btn-add-todo").on('click',function(){
    $("#form-todo").show()
    $('#add-todo').show()
    $(".todo-list").hide()
    $('#edit-todo').hide()
})

$("#add-todo").on('click', function(event){
    event.preventDefault()
    addTodoList()
    authorization()
})

$("#edit-todo").on('click', function(event){
    event.preventDefault()
    const todoID = $("#edit-todo").data('id')
    const title = $('#title').val()
    const description = $('#description').val()
    const date = $('#due_date').val()
    $.ajax({
        method : "PUT",
        url : `${baseUrl}/todos/${todoID}`,
        headers : {
            access_token : localStorage.access_token
        },
        data : {
            title,
            description,
            due_date : date
        }
    })
    .done(response => {
        authorization()
        $('#title').val('')
        $('#description').val('')
        $('#due_date').val('')
    }).fail(error => {
        $('#error-form').empty()
        error.responseJSON.Errors.forEach(el =>{
            $("#error-form").append(`
            <h5>${el}<h5>
            `)
        })
    }).always(() => {
        
    })
})

$("#btn-cancel-add-todo").on('click', function(event){
    event.preventDefault()
    authorization()
    $('#title').val('')
    $('#description').val('')
    $('#due_date').val('')
})

$("#btn-delete-todo").on('click',function(){
    deleteTodo()
})

$("#show-holidays").on('click', function(){
    $("#main-todo").hide()
    $("#function-holidays").show()
    getHolidays()
    $("#show-holidays").hide()
})


function getHolidays(){
    $.ajax({
        method : 'GET',
        url : `${baseUrl}/calendar`,
        headers : {
            access_token : localStorage.access_token
        }
    })
    .done(response => {
        $("#holidays").empty()
        $("#holidays").show()
        response.holidays.forEach(el => {
            $("#holidays").append(`
            <h5>${el.name}<h5>
            <h5>${el.date.iso}<h5>
            `)
        })
        
    })
    .fail(error => {

    })
}

$("#hide-holidays").on('click', function(){
    $("#main-todo").show()
    $("#holidays").hide()
    $("#function-holidays").hide()
    $("#show-holidays").show()
})
