var baseUrl = 'http://localhost:3000';

$(document).ready(function() {
    checkAuth()
})

function checkAuth() {
    if (!localStorage.access_token) {
        $('#login-page').show();
        $('#register-page').hide();
        $('#big-div').hide();
        $('#error-message-login').empty();
        $('#error-message-register').empty()
    } else {
        $('#login-page').hide();
        $('#register-page').hide();
        $('#big-div').show();
        $('#todo-page').show();
        $('#todo-list').show();
        getTodos();
        getWeather();
    }
}

function register() {
    $('#register-page').show();
    $('#login-page').hide();
}

function getTodos() {
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/todos`,
        headers: { access_token: localStorage.access_token }
    })
    .done(res => {
        var todoList = res;
        $('#todo-list').empty();
        todoList.map(todo => {
            var check = todo.status ? 'checked' : '';
            $('#patch-checkbox').val(todo.status);
            $('#todo-list').append(`
        <li id="todo-list-id" class="list-group-item">
            <div class="todo-indicator bg-warning"></div>
                <div class="widget-content p-0">
                    <div class="widget-content-wrapper">
                        <div class="widget-content-left mr-2">
                            <input id="patch-checkbox" class="btn"type="checkbox" ${check} onclick="patchTodo(${todo.id}, ${todo.status})">
                        </div>
                    </div>
                    <div id="todo-${todo.id}">
                        <div class="widget-content-left">
                            <div class="widget-heading"><b>${todo.title}</b></div><br>
                            <div class="widget-detail"><b>Description:&nbsp&nbsp </b>${todo.description}</div>
                            <div class="widget-date"><b>Due Date:&nbsp&nbsp </b>${new Date(todo.due_date.substring(0, 10)).toString().substring(0, 15)}</div>
                            <div class="widget-subheading"><i>by&nbsp ${todo.User.name}</i></div><br>
                        </div>
                        <div class="widget-content-left"> 
                            <button class="border-0 btn-transition btn btn-outline-success" id="edit-btn" onclick="getTodo(${todo.id})"> Edit </button> 
                            <button class="border-0 btn-transition btn btn-outline-danger" id="delete-btn" onclick="deleteTodo(${todo.id})"> <i class="fa fa-trash"></i> </button> 
                        </div>
                    </div>
                </div>
            </div>
        </li>
        `);
            $('#edit-btn').data('id', todo.id);
            $('#delete-btn').data('id', todo.id);
        })
    })
    .fail(xhr => {
        var err = eval("(" + xhr.responseText + ")");
        err = Array.isArray(err) ? err[0] : err;
        console.log(err)
    })
}

function addTodo() {
    var title = $('#add-title').val();
    var description = $('#add-detail').val();
    var due_date = $('#add-date').val();
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/todos`,
        data: { title, description, due_date },
        headers: { access_token: localStorage.access_token }
    })
    .done(res => {
        checkAuth();
    })
    .fail(xhr => {
        var err = eval("(" + xhr.responseText + ")");
        err = err.length > 1 ? err[1] : err[0];
        $('#error-message-add').empty()
        $('#error-message-add').append(`<p>${err.message}</p>`)
    })
    .always(() => {
        $('#add-title').val('');
        $('#add-detail').val('');
        $('#add-date').val('');
    })
}

function getTodo(id) {
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/todos/${id}`,
        headers: { access_token: localStorage.access_token }
    })
    .done(res => {
        var todo = res;
        $(`#todo-${id}`).empty();
        $(`#todo-${id}`).append(`
    <div class="widget-content-left">
        <p id="edit-error-${id}"></p>
        <form>
            <label>Title</label>
            <input type="text" id="put-title" value="${todo.title}" class="form-control inputbox">
            <label>Description</label>
            <input type="text" id="put-detail" value="${todo.description}" class="form-control inputbox">
            <label>Due Date</label>
            <input type="date" id="put-date" value="${todo.due_date.substring(0, 10)}" class="form-control inputbox">
        </form>
    </div>
    <div class="widget-content-right"> 
        <button class="border-0 btn-transition btn btn-outline-success" id="put-btn" onclick=putTodo(${todo.id})> Done </button> 
        <button class="border-0 btn-transition btn btn-outline-danger" id="cancel-btn" onclick="getTodos()"> Cancel </i> </button> 
    </div>
    `)
    })
    .fail(xhr => {
        var err = eval("(" + xhr.responseText + ")");
        err = Array.isArray(err) ? err[0] : err;
        console.log(err)
    })
}

function putTodo(id) {
    var title = $('#put-title').val();
    var description = $('#put-detail').val();
    var due_date = $('#put-date').val();
    $.ajax({
        method: 'PUT',
        url: `${baseUrl}/todos/${id}`,
        headers: { access_token: localStorage.access_token },
        data: { title, description, due_date }
    })
    .done(res => {
        checkAuth();
    })
    .fail(xhr => {
        var err = eval("(" + xhr.responseText + ")");
        err = Array.isArray(err) ? err[0] : err;
        console.log(err);
    })
    .always(() => {
        $('#put-title').clear();
        $('#put-detail').clear();
        $('#put-date').clear();
    })
}

function patchTodo(id, status) {
    status = !status;
    $.ajax({
        method: 'PATCH',
        url: `${baseUrl}/todos/${id}`,
        headers: { access_token: localStorage.access_token },
        data: { status }
    })
    .done(res => {
        getTodos()
    })
    .fail(err => {
        getTodos()
    })
}

function deleteTodo(id) {
    $.ajax({
        method: 'DELETE',
        url: `${baseUrl}/todos/${id}`,
        headers: { access_token: localStorage.access_token },
    })
    .done(res => {
        getTodos()
    })
    .fail(xhr => {
        var err = eval("(" + xhr.responseText + ")");
        err = Array.isArray(err) ? err[0] : err;
        console.log(err)
    })
}

function getWeather() {
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/weather`,
        headers: { access_token: localStorage.access_token }
    })
    .done(res => {
        var weathers = res;
        $('#weather-row').empty();
        weathers.map(weather => {
            var imgSrc;
            if (weather.cuaca[0] == 'C') {
                imgSrc = 'https://img.icons8.com/ios/100/000000/sun.png';
            } else if (weather.cuaca[0] == 'H') {
                imgSrc = 'https://img.icons8.com/cotton/64/000000/rain--v3.png';
            } else {
                imgSrc = 'https://img.icons8.com/windows/100/000000/cloud.png';
            }
            $('#weather-row').append(`
        <div class="col">
            <div class="row row1">${weather.tempC}&deg;</div>
            <div class="row row2"><img class="img-fluid" src="${imgSrc}" /></div>
            <div class="row row3">${weather.jamCuaca.substring(10, 16)}</div>
            <div class="row row4">${weather.cuaca}</div>
        </div>
        `)
        });
    })
    .fail(xhr => {
        var err = eval("(" + xhr.responseText + ")");
        err = Array.isArray(err) ? err[0] : err;
        console.log(err)
    })
}


// GOOGLE LOGIN LOGOUT

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/loginGoogle`,
        data: { id_token }
    })
    .done(res => {
        console.log('asdas')
        localStorage.setItem('access_token', res.access_token);
        checkAuth();
    })
    .fail(xhr => {
        var err = eval("(" + xhr.responseText + ")");
        err = Array.isArray(err) ? err[0] : err;
        $('#error-message-login').empty()
        $('#error-message-login').append(`<p>${err.message}</p>`)
    })
}

function googleLogout() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut()
    .then(_ => {
        checkAuth();
    })
}


// BUTTONS

$('#login-btn').click(function (event) {
    event.preventDefault();
    var email = $('#email-login').val();
    var password = $('#password-login').val();
    $.ajax({
        method: `POST`,
        url: `${baseUrl}/login`,
        data: { email, password }
    })
    .done(res => {
        localStorage.setItem('access_token', res.access_token);
        checkAuth();
    })
    .fail(xhr => {
        var err = eval("(" + xhr.responseText + ")");
        err = Array.isArray(err) ? err[0] : err;
        $('#error-message-login').empty()
        $('#error-message-login').append(`<p>${err.message}</p>`)
    })
    .always(() => {
        $('#email-login').val('');
        $('#password-login').val('');
    })
})

$('#register').click(function (event) {
    event.preventDefault();
    register();
})

$('#register-btn').click(function (event) {
    event.preventDefault();
    var email = $('#email-register').val();
    var name = $('#name-register').val();
    var password = $('#password-register').val();
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/register`,
        data: { email, name, password }
    })
    .done(res => {
        checkAuth();
    })
    .fail(xhr => {
        var err = eval("(" + xhr.responseText + ")");
        err = Array.isArray(err) ? err[0] : err;
        $('#error-message-register').empty()
        $('#error-message-register').append(`<p>${err.message}</p>`)
    })
    .always(() => {
        $('#email-register').val('');
        $('#name-register').val('');
        $('#password-register').val('');
    })
})

$('#logout-btn').click(function (event) {
    event.preventDefault();
    googleLogout();
    localStorage.clear();
    checkAuth();
})


