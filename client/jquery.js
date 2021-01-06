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
        $('.todo-feature').show()
        $('#form-todo').hide()
        getTodoList()
    } else {
        $('.nav').hide()
        $('#login-form').hide()
        $('#signin-form').hide()
        $('.todo-feature').hide()
        $('#form-todo').hide()
        $('#greetings').show()
    }
}

$("#show-login").on('click',function(){
    $('#login-form').show()
    $('#greetings').hide()
})

$("#logout").on('click',function(){
    localStorage.clear()
    authorization()
    $("#email").val('')
    $("#password").val('')
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
    })
    .always(function(){
        console.log('always')
    })
})

function getTodoList(){
    console.log(localStorage.access_token)
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
        todolist.forEach((el , i) => {
            $('#todo').append(`
            <div>
                <h5>${i + 1}
                <h5>${el.title}<h5>
                <h5>${el.description}<h5>
                <h5>${el.status}<h5>
                <h5>${el.due_date}<h5>
                <a href="#" onclick="getTodo(${el.id})">Edit</a>
                <a href="#" onclick="deleteTodo(${el.id})">Delete</a>
            </div>`)  
        })
    })
    .fail(function(error){
        console.log(error)
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
        console.log(err)
    })
    .always()
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
    $(".todo-list").hide()
    $('#edit-todo').hide()
})

$("#add-todo").on('click', function(event){
    event.preventDefault()
    addTodoList()
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
    }).fail(error => {
        console.log(error)
    }).always(() => {
        $('#title').val('')
        $('#description').val('')
        $('#due_date').val('')
    })
})

$("#btn-cancel-add-todo").click(function(){
    $("#form-todo").hide()
    $(".todo-list").show()
    $('#title').val('')
    $('#description').val('')
    $('#due_date').val('')
})

$("#btn-delete-todo").on('click',function(){
    deleteTodo()
})