let baseUrl = `http://localhost:3000`
let todoList = []

$(document).ready(function(){
    home()
    if(localStorage.access_token){
        //todo()
        $('#home').show()
        $('#register-form').hide()
        $('#login-form').hide()
        getTodoList()
        $('.link-home').hide()
        formEdit()
    }else{
        login()
        $('#todo').hide()
        $('#todoEdit').hide()
    }
})

function home (){
    $('#home').show()
    $('#register-form').hide()
    $('#login-form').hide()
    $('.link-regis').show()
    $('.todos').hide()
    $('#logout').hide()
    $('.link-login').show()
    $('.editContainer').hide()
    $('#add-todo').hide()
    $('.addTodos').hide()
}

function regis(){
    $('#register-form').show()
    $('#home').hide()
    $('#login-form').hide()
    $('.link-regis').hide()
    $('.todos').hide()
    $('#logout').hide()
    $('.link-login').show()
    $('.editContainer').hide()
    $('#add-todo').hide()
    $('.addTodos').hide()
}

function login (){
    $('#login-form').show()
    $('#home').hide()
    $('#register-form').hide()
    $('.link-regis').show()
    $('.todos').hide()
    $('#logout').hide()
    $('.link-home').show()
    $('.editContainer').hide()
    $('#add-todo').hide()
    $('.addTodos').hide()
}

function todo(){
    $('#todo').show()
    $('#home').hide()
    $('#register-form').hide()
    $('#login-form').hide()
    $('.link-regis').hide()
    $('.link-login').hide()
    $('.link-home').hide()
    $('#logout').show()
    $('.editContainer').hide()
    $('#add-todo').show()
    $('.addTodos').hide()
}

function formEdit(){
    $('#todoEdit').show()
    $('#todo').hide()
    $('#home').hide()
    $('#register-form').hide()
    $('#login-form').hide()
    $('.link-regis').hide()
    $('.link-login').hide()
    $('.link-home').hide()
    $('#logout').show()
    $('#add-todo').hide()
    $('.addTodos').hide()
}

function addTodo(){
    $('#addTodo').show()
    $('#todoEdit').hide()
    $('#todo').hide()
    $('#home').hide()
    $('#register-form').hide()
    $('#login-form').hide()
    $('.link-regis').hide()
    $('.link-login').hide()
    $('.link-home').hide()
    $('#logout').show()
    $('#add-todo').hide()
}

function getTodoList(){
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/todos`,
        headers:{
            access_token: localStorage.access_token
        }
    })
    .done(response =>{
        console.log(response.todos)
        todoList = response.todos
        $('#todo').empty()
        todoList.forEach(el =>{
            if(el.status === false){
                $('#todo').append(`<div class="list-group" style="margin: 2% 10%; border: 1px solid black; border-radius: 4px; padding: 50px; width: 40%; height: 5%;">
                <p class="list-group-item list-group-item-action active" aria-current="true">
                    <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${el.title}</h5>
                    </div>
                    <p class="mb-1">${el.description}</p>
                    <time datetime=${el.due_date}> ${el.due_date} </time><br>
                </p>
                    <div class="d-grid gap-2 d-md-block">
                        <button class="btn btn-primary" id ="updateTodo" onclick="editTodo(${el.id})" type="button">Edit</button>
                        <button class="btn btn-primary" id ="delete-btn" onclick="deleteTodo(${el.id})" type="button">Delete</button>
                        <button class="btn btn-primary" id ="patch-btn" onclick="patchTodo(${el.id})" value="true">Mark as Done</button>
                    </div>
                </div>`)
            }else {
                $('#todo').append(`<div class="list-group" style="margin: 2% 10%; border: 1px solid black; border-radius: 4px; padding: 50px; width: 40%; height: 5%;">
                <p class="list-group-item list-group-item-action active" aria-current="true">
                    <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${el.title}</h5>
                    </div>
                    <p class="mb-1">${el.description}</p>
                    <time datetime=${el.due_date}> ${el.due_date} </time><br>
                </p>
                    <div class="d-grid gap-2 d-md-block">
                        <button class="btn btn-primary" id ="updateTodo" onclick="editTodo(${el.id})" type="button">Edit</button>
                        <button class="btn btn-primary" id ="delete-btn" onclick="deleteTodo(${el.id})" type="button">Delete</button>
                        <button class="btn btn-primary" id ="patch-btn" onclick="patchTodo(${el.id})" value="false">Mark as Undone</button>
                    </div>
                </div>`)
            }
            
        })
    })
    .fail(err =>{
        console.log(`error nih`)
    })
    .always(()=>{
        console.log(`always`)
    })
}

function editTodo(id){
    //console.log(id)
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/todos/${id}`,
        headers:{
            access_token: localStorage.access_token
        }
    })
    .done(response =>{
        $('#title').val(response.todos.title)
        $('#description').val(response.todos.description)
        $('#status').val(response.todos.status)
        $('#duedate').val(response.todos.due_date)
        $('.edit-button').data('id', id)
        formEdit()
    })
    .fail(err =>{
        console.log(`error nih`)
    })
    .always(()=>{
        console.log(`always`)
    })
}

function patchTodo(id){
    // let status = $('#patch-btn').attr('value')
    // console.log(status)
    $.ajax({
        method: 'PATCH',
        url: `${baseUrl}/todos/${id}`,
        data:{
            status: $('#patch-btn').attr('value')
        },
        headers:{
            access_token: localStorage.access_token
        }
    })
    .done(response =>{
        todo()
        getTodoList()
    })
    .fail(err =>{
        console.log(`error nih`)
    })
}

$('.link-home').click(function(){
    home()
})

$('.link-login').click(function(){
    login()
})

$('.link-regis').click(function(){
    regis()
})

$('#logout').click(function (event){
    event.preventDefault()
    localStorage.clear()
    login()
})
$('#add-todo').click(function(){
    addTodo()
})


$('#regist-button').click(function(event){
    event.preventDefault()
    let email = $('#formEmail').val()
    let fullName = $('#formFullName').val()
    let password = $('#formPassword').val()
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/register`,
        data:{
            email,fullName,password
        }
    })
    .done(response =>{
        console.log(response.id, response.id)
        login()
    })
    .fail(err =>{
        console.log(`error nih`)
    })
    .always(()=>{
        $('#formEmail').val('')
        $('#formFullName').val('')
        $('#formPassword').val('')
    })
})

$('#updateEdit').submit(function(event){
    event.preventDefault()
    let todoId = $('.edit-button').data('id')
    
    $.ajax({
        method: 'PUT',
        url: `${baseUrl}/todos/${todoId}`,
        data:{
            title: $('#title').val(),
            description: $('#description').val(),
            status: $('#status').val(),
            due_date: $('#duedate').val()
        },
        headers:{
            access_token: localStorage.access_token
        }
    })
    .done(response =>{
        todo()
        getTodoList()
    })
    .fail(err =>{
        console.log(`error nih`)
    })
    .always(()=>{
        $('#title').val('')
        $('#description').val('')
        $('#status').val('')
        $('#duedate').val('')
    })
})



$('#login-button').click(function (event){
    event.preventDefault()
    let email = $('#email').val()
    let password = $('#password').val()
    //console.log(email, password)
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/login`,
        data: {
            email, password
        }
    })
    .done(response =>{
        //console.log(response)
        localStorage.setItem('access_token', response.access_token)
        todo()
    })
    .fail(err =>{
        console.log('error nih')
    })
    .always(()=>{
        $('#email').val('')
        $('#password').val('')
    })
})

$('.add-button').click(function(event){
    event.preventDefault()
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/todos`,
        data:{
            title: $('#addTitle').val(),
            description: $('#addDescription').val(),
            status: $('#addStatus').val(),
            due_date: $('#addDuedate').val()
        },
        headers:{
            access_token: localStorage.access_token
        }
    })
    .done(response =>{
        todo()
        getTodoList()
    })
    .fail(err =>{
        console.log(`error nih`)
    })
    .always(()=>{
        $('#addTitle').val('')
        $('#addDescription').val('')
        $('#addStatus').val('')
        $('#addDuedate').val('')
    })
})

function deleteTodo(id){
    $.ajax({
        method: 'DELETE',
        url: `${baseUrl}/todos/${id}`,
        headers:{
            access_token: localStorage.access_token
        }
    })
    .done(response =>{
        todo()
        getTodoList()
    })
    .fail(err =>{
        console.log(`error nih`)
    })
}