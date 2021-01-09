const baseURL = 'http://localhost:3000'
const todoList = []
const newsList = []


// start web
$(document).ready(function(){
    authenticate()
    // jQuery methods go here...
  
});

// function
function authenticate(){
    if(localStorage.access_token) {
        $('#todos').show()
        getTodo()
        $('#newsAPI').show()
        getNews()
        $('#addTodo').show()
        $('#logout').show()
        $('.form-regis').hide()
        $('.form-login').hide()
        $('#addFormTodos').hide()
        $('#editFormTodos').hide()
        
    } else {
        $('.form-login').show()
        $('#editFormTodos').hide()
        $('.form-regis').hide()
        $('#todos').hide()
        $('#logout').hide()
        $('#addFormTodos').hide()
        $('#addTodo').hide()
    }
}

function trafficLogin(){
    $('.form-regis').hide()
    $('.form-login').show()
    $('#logout').hide()
    $('#addTodo').hide()
}

// hide show onclick
$('#registbtn').click(function(){
    trafficLogin()
})
$('#sent-form-signin').click(function(){
    trafficLogin()
})
$('#sent-form-signup').click(function(){
    $('.form-regis').show()
    $('.form-login').hide()
    $('#logout').hide()
})
$('#logout').click(function() {
    localStorage.clear()
    authenticate()
})
$('#addTodo').click(function(){
    $('#addFormTodos').show()
    $('#addTodo').hide()
    $('#todos').hide()
    $('#logout').hide()
})
$('#cancelAddBtn').click(function(event){
    event.preventDefault()
    authenticate()
})
$('#cancelEditBtn').click(function(event){
    event.preventDefault()
    authenticate()
})
$('#editTodo').click(function(event){
    event.preventDefault()
    $('#editFormTodos').show()
    $('#logout').hide()
    $('#addTodo').hide()
})



//============== TAKE DATA FORM ==============
/**                 list:
 *               o> SIGN UP
 *               o> SIGN IN
 *               o> ADD TODO
 *               o> EDIT TODO
 *               o> DELETE TODO
 */

// SIGN UP
$('#regisbtn').click(function(event) {
    event.preventDefault()
    let email = $('#email-regis').val()
    let password = $('#password-regis').val()
    
    $.ajax({
        method: 'POST',
        url: `${baseURL}/signup`,
        data: {
            email,
            password
        }
    })
    .done(response => {
        console.log(response, '...............')
    })
    .fail(err => {
        console.log(err, '...........')
    })
    .always(() => {
        console.log('always');
    })
})

// SIGN IN
$('#loginbtn').click(function(event) {
    event.preventDefault()
    let email = $('#email-login').val()
    let password = $('#password-login').val()
    
    $.ajax({
        method: 'POST',
        url: `${baseURL}/signin`,
        data: {
            email,
            password
        }
    })
    .done(response => {
        console.log(response, '........response.......')
        localStorage.setItem('access_token', response.access_token)
        authenticate()
    })
    .fail(err => {
        console.log(err, '-------error-------')
    })
    .always(() => {
        console.log('always');
        $('#email-login').val('')
        $('#password-login').val('')
    })
})

// ADD TODO
$('#addBtn').click(function(event) {
    event.preventDefault()
    let title = $('#adding-title').val()
    let description = $('#adding-description').val()
    let due_date = $('#adding-date').val()
    let status = $('#adding-status').val()
    
    $.ajax({
        method: 'POST',
        url: `${baseURL}/todos`,
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            title,
            description,
            due_date,
            status
        }
    })
    .done(response => {
        authenticate()
        $('#addFormTodos').hide()
    })
    .fail(err => {
        console.log(err), '---------error--------';
    })
    .always(() => {
        console.log('always');
    })
})

// EDIT TODO
$('#editedBtn').click(function(event) {
    event.preventDefault()
    let todoId = $('#editedBtn').data('id')
    let title = $('#edit-title').val()
    let description = $('#edit-description').val()
    let date = $('#edit-date').val()
    let status = $('#edit-status').val()
    
    console.log(
        todoId,
        title,
        description
    );
    $.ajax({
        method: 'PUT',
        url: `${baseURL}/todos/${todoId}`,
        headers: {
            access_token: localStorage.access_token
        },
        data: { 
            title,
            description,
            date,
            status    
        }
    })
    .done(response => {
        console.log(response);
        getTodo()
    })
    .fail(err => {

    })
    .always(() => {
        $('#edit-title').val('')
        $('#edit-description').val('')
        $('#edit-date').val('')
        $('#edit-status').val('')
    })
})


// ===============  FUNCTION TODOS  ==================

/**                 list:
 * o> getTodo       => list get all
 * o> getOneTode    => get data by id (to edit)
 * o> update        => submit update/ edited data
 * o> deleteTodo    => Delete todo
 * o> get News      => Display News
 * 
 */
function getTodo() {
    $.ajax({
        method: 'GET',
        url: `${baseURL}/todos`,
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(response => {
        $('#todos').empty()
        console.log(response, 'response');
        response.map(el => {
            if (el.status) {
                $('#todos').append(`<div class="card p-2 mb-2" data-aos="fade-left">
                    <h5>${el.title}</h5>
                    <a>${el.description}</a>
                    <a>${el.due_date}</a>
                    <a>Finish, yeay!</a>
                    <div class="width-button align-items-center"> 
                        <button id="editTodo" onclick="getOneTodo(${el.id})">Edit</button>
                        <button onclick="deleteTodo(${el.id})"> Delete </button>
                    </div>
                    </div>`)
            } else {
                $('#todos').append(`<div class="card p-2 mb-2" data-aos="fade-left">
                    <h5>${el.title}</h5>
                    <a>${el.description}</a>
                    <a>${el.due_date}</a>
                    <a>Not Finish yet</a>
                    <div class="width-button align-items-center"> 
                        <button id="editTodo" onclick="getOneTodo(${el.id})">Edit</button>
                        <button onclick="deleteTodo(${el.id})"> Delete </button>
                    </div>
                </div>`)
            }
        });
    })
    .fail(err => {
        console.log(err, '-------error list todo-------');
    })
    .always(() => {
        console.log('always');
    })
}
function getOneTodo(id) {
    $.ajax({
        method: 'GET',
        headers: {
            access_token: localStorage.access_token
        },
        url: `${baseURL}/todos/${id}`
    })
    .done(response => {
        console.log(response)
        
        $('#editFormTodos').show()
        $('#logout').hide()

        $('#edit-title').val(response.title)
        $('#edit-description').val(response.description)
        $('#edit-date').val(response.due_date)
        $('#edit-status').val(response.status)
        $('#editedBtn').data('id', id)
    })
    .fail(err => {
        console.log(err);
    })
    .always(() => {

    })
}
function deleteTodo(id){
    $.ajax({
        method: 'DELETE',
        headers: {
            access_token: localStorage.access_token
        },
        url: `${baseURL}/todos/${id}`
    })
    .done(response => {
        console.log(response)
        authenticate()
    })
    .fail(err => {
        console.log(err);
    })
    .always(() => {

    })
}
function getNews(){
    $.ajax({
      method: 'GET',
      url: `${baseURL}/news`,
      headers: {
        access_token: localStorage.access_token
      }
    })
    .done(response => {
        console.log(response, '<=== response')
   
        response.map(el => {
        $('#newsAPI').append(
        `<li class="list-group-item">
            ${el.title} <br> <a href="${el.url}">Read More</a>
        </li>`
        )
      })
    })
    .fail(err => {
      console.log(err, '<=== error')
    })
    .always(() => {
      console.log('always')
    })
}
function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token);
    $.ajax({
        method: `POST`,
        url: `${baseURL}/googleLogin`,
        data: {
            id_token
        }
    })
    .done(response => {
        const token = response.access_token;
        localStorage.setItem("access_token", token);
    })
    .fail(err => {
        console.log(err)
    })
}