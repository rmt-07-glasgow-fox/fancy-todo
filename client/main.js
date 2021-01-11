const baseurl = 'http://localhost:3000'

function checkAuth() {
    $('#create-form').hide()
    getWeather()
    if (localStorage.access_token) {
        $('#navbar').show()
        showTodoList()
        $('#todo').show()
        $('#sign-in-form').hide()
        $('#sign-up-form').hide()
        $('#weather').show()
        localStorage.edit ? $('#update-form').show() : $('#update-form').hide() 
    } else {
        $('#weather').hide()
        $('#navbar').hide()
        $('#sign-in-form').show()
        $('#todo').hide()
        $('#update-form').hide()
    }
    
}

function logout() {
    localStorage.clear()
    $('#todo').hide()
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });

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

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: 'POST',
        url: `${baseurl}/signInGoogle`,
        data: { id_token }
    })
    .done(response => {
        localStorage.setItem('access_token', response.access_token)
        checkAuth()
    })
    .fail(err => {
        next(err)
    })
}
  
function getWeather() {
    $.ajax({
        method: 'GET',
        url: `${baseurl}/weather`,
    })
    .done(response => {
        console.log(response);
        const city = response.city
        const desc = response.description
        const icon = response.icon
        const imgIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        const temp = response.temp
        $('#weather').empty()
        $('#weather').append(`
        <h3>Weather</h3>
        <img src="${imgIcon}" clstyle="width: 2rem;height: 2rem; "alt="">
        <div>
          <small class="fw-bolder">${city}</small><br>
          <small>${desc}</small><br>
          <small class="fs-6">${temp}</small>
        </div>
        `)
    })
    .fail(err => {
        console.log(err);
    })
}

function showTodo(response) {
    response.forEach(el => {
        if (el.status) {
            $('#todo-list').append(`
            <div class="card border-info mb-3" style="width: 18rem; padding: 1em;">
        <div class="card-header">${el.due_date}</div>
        <div class="card-body">
          <h5 class="card-title">${el.title}</h5>
          <p class="card-text">${el.description}</p>
          <div class="form-check" style="margin-bottom: 1em;">
            <input class="form-check-input" type="checkbox" value="${el.status}"
              onclick="updateStatus(${el.id}, ${el.status})" checked id="update-status">
            <label class="form-check-label" for="status">
              Done
            </label>
          </div>
          <div class="container d-flex justify-content-around">
            <button type="button" class="btn btn-secondary" id="edit-btn" onclick="updateForm(${el.id})">Edit</button>
            <button type="button" class="btn btn-danger" onclick="deleteTodo(${el.id})">Delete</button>
          </div>
        </div>
      </div>`)
        } else {
            $('#todo-list').append(`
            <div class="card border-info mb-3" style="width: 18rem; padding: 1em;">
        <div class="card-header">${el.due_date}</div>
        <div class="card-body">
          <h5 class="card-title">${el.title}</h5>
          <p class="card-text">${el.description}</p>
          <div class="form-check" style="margin-bottom: 1em;">
            <input class="form-check-input" type="checkbox" value="${el.status}"
              onclick="updateStatus(${el.id}, ${el.status})" id="update-status">
            <label class="form-check-label" for="status">
              Done
            </label>
          </div>
          <div class="container d-flex justify-content-around">
            <button type="button" class="btn btn-secondary" id="edit-btn" onclick="updateForm(${el.id})">Edit</button>
            <button type="button" class="btn btn-danger" onclick="deleteTodo(${el.id})">Delete</button>
          </div>
        </div>
      </div>`)
        }
    });
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
        showTodo(response)
    })
    .fail(err => {
        console.log(err);
    })
}

function createTodo(obj) {
    $.ajax({
        method: 'POST',
        url: `${baseurl}/todos`,
        headers: {
            access_token: localStorage.access_token
        },
        data: obj
    })
    .done(response => {
        console.log(`test`);
        $('#add-title').val('')
        $('#add-description').val('')
        $('#add-due_date').val('')
        checkAuth()
    })
    .fail(err => {
        console.log(err);
    })
}

function updateStatus(id, status) {
    $.ajax({
        method: 'PATCH',
        url: `${baseurl}/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            status: !status
        }
    })
    .done(response => {
        console.log(response);
        showTodoList()
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
        $('#todo-list').empty()
        showTodoList()
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
        checkAuth()
    })
    .fail(err => {
        console.log(err);
    })
}

$(function(){
    console.log('page reload');
    $('#sign-up-form').hide()
    checkAuth()
    $('#update-form').hide()
    
    $('#show-add-form').click(function(event) {
        event.preventDefault()
        $('#todo').hide()
        $('#create-form').show()
    })
    
    $('#btn-close-add').click(function() {
        $('#todo').show()
        $('#create-form').hide()
    })
    
    $('#add-btn').click(function(event) {
        event.preventDefault()
        let title = $('#add-title').val()
        let description = $('#add-description').val()
        let status = false
        let due_date = dateFormater($('#add-due_date').val())
        createTodo({title, description, status, due_date})
        showTodoList()
    })
    
    $('#update-btn').click(function(event) {
        event.preventDefault()
        let obj = {
            title: $('#title').val(),
            description: $('#description').val(),
            status: $('#status').val(),
            due_date: $('#due_date').val()
        }
        updateTodo(obj)
        localStorage.setItem('edit', false)
    })
    
    $('#status').click(function() {
        if ($('#status').val() === 'true') {
            $('#status').val('false')
        } else {
            $('#status').val('true')
        }
    })
    
    $('#edit-btn').click(function() {
        $('#update-form').show()
    })
    
    $('#btn-close').click(function() {
        $('#update-form').hide()
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
        $('#sign-in-form').hide()
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

    $('#home-page').click(function(event) {
        event.preventDefault()
        $('#sign-up-form').hide()
        checkAuth()
    })
})
