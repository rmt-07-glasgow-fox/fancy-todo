const baseurl = 'http://localhost:3000'


$(function(){
    console.log('page reload');
    $('#sign-up-form').hide()
    checkAuth()
    $('#update-form').hide()
    
})

function checkAuth() {
    if (localStorage.access_token) {
        $('#navbar').show()
        showTodoList()
        $('#todo-list').show()
        $('#sign-in-form').hide()
        localStorage.edit ? $('#update-form').show() : $('#update-form').hide() 
    } else {
        $('#navbar').hide()
        $('#sign-in-form').show()
        $('#todo-list').hide()
        $('#update-form').hide()
    }
    
}

function logout() {
    localStorage.clear()
}

function signIn(email, password) {
    $.ajax({
        method: 'POST',
        url: `${baseurl}/signIn`,
        data: { email, password }
    })
    .done(response => {
        localStorage.setItem('access_token', response.access_token)
        checkAuth()
    })
    .fail(err => {
        console.log(err, 'err');
    })
    .always(() => {
        $('#email').val('')
        $('#password').val('')
    })
}

function signUp(email, password) {
    $.ajax({
        method: 'POST',
        url: `${baseurl}/signUp`,
        data: { email, password }
    })
    .done(response => {
        console.log(response);
        
    })
    .fail(err => {
        console.log(err);
    })
    .always(() => {
        $('#reg-email').val('')
        $('#reg-password').val('')
    })
}

function showTodoList() {
    $.ajax({
        method: 'GET',
        url: `${baseurl}/todos`,
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(response => {
        $('#todo-list').empty()
        response.forEach(el => {
            $('#todo-list').append(`
            <div class="container d-flex justify-content-start flex-row-reverse flex-wrap">
            <div class="card border-info mb-3" style="width: 18rem; padding: 1em;">
            <div class="card-header">${el.due_date}</div>
            <div class="card-body">
              <h5 class="card-title">${el.title}</h5>
              <p class="card-text">${el.description}</p>
              <div class="form-check" style="margin-bottom: 1em;">
                <input class="form-check-input" type="checkbox" value="" id="update-status">
                <label class="form-check-label" for="status">
                  Done
                </label>
              </div>
              <div class="container d-flex justify-content-around">
              <button type="button" class="btn btn-secondary" id="edit-btn" onclick="updateForm(${el.id})">Edit</button>
              <button type="button" class="btn btn-danger" onclick="deleteTodo(${el.id})">Delete</button>
            </div>
            </div>
          </div>
          </div>`)
        });
    })
    .fail(err => {
        console.log(err);
    })
}

function dateFormater(date) {
    let today = new Date(date)
    let dd = today.getDate();

    let mm = today.getMonth()+1; 
    const yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd=`0${dd}`;
    } 

    if(mm<10) 
    {
        mm=`0${mm}`;
    } 
    return today = `${yyyy}-${mm}-${dd}`;
}

function updateForm(id) {
    checkAuth()
    $.ajax({
        method: 'GET',
        url: `${baseurl}/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(response => {
        localStorage.setItem('edit', true)
        localStorage.setItem('id', response.id)
        $('#title').val(response.title)
        $('#description').val(response.description)
        $('#status').val(response.status)
        $('#due_date').val(dateFormater(response.due_date))
    })
    .fail(err => {
        console.log(err);
    })
}

function updateTodo(obj) {
    $.ajax({
        method: 'PUT',
        url: `${baseurl}/todos/${localStorage.id}`,
        headers: {
            access_token: localStorage.access_token
        },
        data: obj
    })
    .done(response => {
        $('#update-form').hide()
        console.log(response);
    })
    .fail(err => {
        console.log(err);
    })
}

function deleteTodo(id) {
    $.ajax({
        method: 'DELETE',
        url: `${baseurl}/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(response => {
        console.log(response);
    })
    .fail(err => {
        console.log(err);
    })
}

$('#update-btn').click(function(event) {
    event.preventDefault()
    let obj = {
        title: $('#title').val(),
        description: $('#description').val(),
        status: $('#status').val() ? true : false,
        due_date: $('#due_date').val()
    }
    console.log($('#status').val(), 'update-btn');
    updateTodo(obj)
    localStorage.setItem('edit', false)
})

$('#status').click(function() {
    localStorage.setItem('status', localStorage.status)
    $.ajax({
        method: 'PATCH',
        url: `${baseurl}/todos/${localStorage.id}`,
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            status: !Boolean($('#status').val())
        }
    })
    .done(response => {
        localStorage.setItem('status', response.status)
        console.log(localStorage.status);
    })
    .fail(err => {
        console.log(err);
    })
})

$('#edit-btn').click(function() {
    console.log(`test`);
    $('#update-form').show()
})

$('#logout-btn').click(function(event) {
    event.preventDefault()
    logout()
    checkAuth()
})

let email = null
let password = null

$('#sign-in-btn').click(function(event) {
    event.preventDefault()
    email = $('#email').val()
    password = $('#password').val()
    
    signIn(email, password)
})

$('#show-sign-up').click(function(event) {
    event.preventDefault()
    
    $('#sign-in-form').hide()
    $('#sign-up-form').show()
})

$('#sign-up-btn').click(function(event){
    event.preventDefault()
    email = $('#reg-email').val()
    password = $('#reg-password').val()
    signUp(email, password)
})