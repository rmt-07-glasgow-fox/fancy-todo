var baseUrl = window.location.origin;

$(document).ready(function(){
    checkAuth()
})


function checkAuth() {
    if (!localStorage.access_token) {
        $('#login-page').show();
        $('#register-page').hide();
        $('#todo-page').hide();
        $('#todo-list').hide();
        $('#logout-btn').hide();
        console.log(baseUrl+'asdasd')
    } else {
        $('#login-page').hide();
        $('#register-page').hide();
        $('#todo-page').show();
       
        $('#todo-list').show();
        getTodos();
        $('#logout-btn').show();
    }
}

function register() {
    $('#register-page').show();
    $('#login-page').hide();
    $('#todo-page').hide();
    $('#todo-list').hide();
    $('#logout-btn').hide();
}

function getTodos() {
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/todos`,
        headers: { access_token: localStorage.access_token }
    })
    .done(res => {
        var todoList = res;
        console.log(res);
        $('#todo-list').empty();
        todoList.map(todo => {
            var check = todo.status ? 'checked' : '';
            $('#todo-list').append(`
            <li id="todo-list-${todo.id}" class="list-group-item">
                <div class="todo-indicator bg-warning"></div>
                    <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                            <div class="widget-content-left mr-2">
                                <div class="custom-checkbox custom-control"> 
                                    <input class="custom-control-input" id="patch-checkbox" type="checkbox" value="${todo.status}" ${check}>
                                    <label class="custom-control-label" for="exampleCustomCheckbox12">&nbsp;</label>
                                </div>
                            </div>
                        </div>
                        <div id="todo-${todo.id}">
                            <div class="widget-content-left">
                                <div class="widget-heading">${todo.title}</div><br>
                                <div class="widget-detail">${todo.description}</div>
                                <div class="widget-date">${todo.due_date}</div><br>
                                <div class="widget-subheading"><i>by ${todo.User.name}</i></div>
                            </div>
                            <div class="widget-content-right"> 
                                <button class="border-0 btn-transition btn btn-outline-success" id="get-btn" onclick="getTodo(${todo.id})"> Edit </button> 
                                <button class="border-0 btn-transition btn btn-outline-danger" id="delete-btn" onclick="deleteTodo(${todo.id})"> <i class="fa fa-trash"></i> </button> 
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            `);
            $('#patch-checkbox').data('id', todo.id)
        })
    })
    .fail(err => {
        console.log(err)
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
        $(`todo-${id}`).empty();
        $(`todo-$${id}`).append(`
        <div class="widget-content-left">
            <form>
                <input type="text" id="put-title" value="${todo.title}" class="form-control inputbox">
                <input type="text" id="put-detail"value=${todo.detail} class="form-control inputbox">
                <input type="date" id="put-date" value="${todo.date}" class="form-control inputbox">
            </form>
        </div>
        <div class="widget-content-right"> 
            <button class="border-0 btn-transition btn btn-outline-success" id="put-btn"> Done </button> 
            <button class="border-0 btn-transition btn btn-outline-danger" id="cancel-btn" onclick="getTodos()"> Cancel </i> </button> 
        </div>
        `)
        $('#put-btn').data('id', id)
    })
    .fail(err => {
        console.log(err)
    })
}

// atau



$('#put-btn').click(function(event){
    event.preventDefault();
    var todoId = $('#put-btn').data('id');
    var title = $('#put-title').val();
    var detail = $('#put-detail').val();
    var date = $('#put-date').val();
    $.ajax({
        method: 'PUT',
        url: `http://localhost:3000/todos/${todoId}`,
        headers: { access_token: localStorage.access_token },
        data: {title, detail, date}
    })
    .done(res => {
        getTodos()
    })
    .fail(err => {
        console.log(err)
    })
    .always(() => {
        $('#put-title').clear();
        $('#put-detail').clear();
        $('#put-date').clear();
    })
})

$('#patch-checkbox').click(function(event){
    event.preventDefault();
    var todoId = $('#patch-checkbox').data('id', id);
    var status = $('#patch-checkbox').val();
    $.ajax({
        method: 'PATCH',
        url: `http://localhost:3000//todos/${todoId}`,
        headers: { access_token: localStorage.access_token },
        data: {status}
    })
    .done(res => {
        getTodos()
    })
    .fail(err => {
        console.log(err)
    })
})
 

$('#login-btn').click(function(event){
    event.preventDefault();
    var email = $('#email').val();
    var password = $('#password').val();
    $.ajax({
        method: `POST`,
        url: `http://localhost:3000/login`,
        data: {email, password}
    })
    .done(res => {
        localStorage.setItem('access_token', res.access_token);
        checkAuth();
    })
    .fail(err => {
        $('#error-message').append(`${err.message}`)
    })
    .always(() => {
        $('#email').val('');
        $('#password').val('');
    })
})

$('#register').click(function(event){
    event.preventDefault();
    register();
})

$('#register-btn').click(function(event) {
    event.preventDefault();
    var email = $('#email').val();
    var name = $('#name').val();
    var password = $('#password').val();
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/register`,
        data: {email, name, password}
    })
    .done(res => {
        checkAuth();
    })
    .always(() => {
        $('#email').val('');
        $('#name').val('');
        $('#password').val('');
    })
})


$('#logout-btn').click(function(event){
    event.preventDefault();
    localStorage.clear();
    checkAuth();
})