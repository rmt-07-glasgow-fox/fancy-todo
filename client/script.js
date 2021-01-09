const baseUrl = "http://localhost:3000"

$(document).ready(myFunction())

function myFunction(){
    checkAuth()
    getDataToDo()
    getWeather()

    $("#create-account").click(function(){
        $("#my-signin").hide()
        $("#my-signup").show()
    })

    $("#open-signin").click(function(){
        $("#my-signin").show()
        $("#my-signup").hide()
    })

    $("#signin-btn").click(function(event){
        event.preventDefault()
        var email = $('#email-signin').val()
        var password = $('#password-signin').val()

        $.ajax({
            method: 'POST',
            url: `${baseUrl}/signin`,
            data: { email, password }   
        })
        .done(response => {
            localStorage.setItem('access_token', response.access_token )
            console.log('INI BERHASIL MASUK SIGN IN UDAH AING BILANG')
            $(document).empty()
            $(document).ready(myFunction())
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => {
            console.log("always RUN")
        })
    })

    $("#signup-btn").click(function(event){
        event.preventDefault()
        var email = $('#email-signup').val()
        var password = $('#password-signup').val()
        console.log(email, "DIA MASUK SIGN UP")

        $.ajax({
            method: 'POST',
            url: `${baseUrl}/signup`,
            data: { email, password }  
        })
        .done(response => {
            console.log(response)
            $("#my-signin").show()
            $("#my-signup").hide()
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => {
            console.log("always RUN")
        })
    })

    $("#logout-btn").click(function(){
        localStorage.clear()
        console.log(localStorage)
        checkAuth()
    })

    $("#cancel").click(function(){
        $(document).empty()
            $(document).ready(myFunction())
    })

    $("#create-task-btn").click(function(){
        $("#create-task").show()
        $("#create-task-btn").hide()
        $("#my-signin").hide()
        $("#my-signup").hide()
        $("#my-task").show()
        $("#logout-btn").show()
        $("#update-task").hide()
    })

    $("#create-task-form-btn").click(function(event){
        
        $("#create-task").hide()
        $("#create-task-btn").hide()


        event.preventDefault()
        let title = $('#task-title').val()
        let description = $('#task-description').val()
        let status = "true"
        let due_date = $('#task-due-date').val()
        console.log(title, "DIA MASUK CREATE")

        $.ajax({
            method: 'POST',
            url: `${baseUrl}/todos`,
            data: {title, description, status, due_date},
            headers: {access_token: localStorage.getItem('access_token')}     
        })
        .done(response => {
            $(document).empty()
            $(document).ready(myFunction())
        })
        .fail(err => {
            console.log("GAGAL")
            console.log(err)
        })
        .always(() => {
            console.log("always RUN")
        })
    })
}

function checkAuth(){
    if(localStorage.access_token){
        $("#read-task").show()
        $("#my-signin").hide()
        $("#my-signup").hide()
        $("#logout-btn").show()
        $("#create-task").hide()
        $("#update-task").hide()
        $("#my-weather").show()
    } else {
        $("#my-signin").show()
        $("#my-signup").hide()
        $("#read-task").hide()
        $("#logout-btn").hide()
        $("#read-task").hide()
        $("#update-task").hide()
        $("#create-task").hide()
        $("#my-weather").hide()
    }
}

function getDataToDo(){
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/todos`,
        data: {},
        headers: {access_token: localStorage.getItem('access_token')}     
    })
    .done(response => {
        console.log("DATA BERHASIL DIPEROLEH")
        readTodo(response)
        
    })
    .fail(err => {
        console.log("GAGAL")
        console.log(err)
    })
    .always(() => {
        console.log("always RUN")
    })
}

function getWeather(){
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/weather`,
        data: {},
        headers: {access_token: localStorage.getItem('access_token')}     
    })
    .done(response => {
        let weather = response.contentWeather
        $("#my-weather").empty()
        $('#my-weather').append(`<h3> Cuaca Hari Ini </h3>
        <table class="table table-dark table-bordered" style="text-align: center;">
        <thead class="thead-dark">
            <tr>
            <th scope="col">Location</th>
            <th scope="col">Temperature</th>
            <th scope="col">Condition</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>${weather.location.name}</td>
            <td>${weather.current.temperature}</td>
            <td>${weather.current.weather_descriptions}</td>
            </tr>
        </tbody>
        </table>`)
    })
    .fail(err => {
        console.log("GAGAL")
        console.log(err)
    })
    .always(() => {
        console.log("always RUN")
    })
}

function readTodo(response){
    let toDoList = response.data
    console.log(toDoList)
    $("#my-todo").empty()
    toDoList.forEach(el => {
        $('#my-todo').append(`<div class="col-6 d-flex align-items-stretch">
        <div class="card shadow p-3 mb-5 bg-white rounded card-news" style="width: 40rem;">
        <div class="card-body">
          <h5 class="card-title">${el.title}</h5>
          <p class="card-text">${el.description}</p>
          <p class="card-text">Due Date: ${el.due_date}</p>
          <p class="card-text">Status: ${el.status}</p>
          <button class="btn btn-primary edit-btn" onclick="editToDo(${el.id})">Edit</button>
          <button class="btn btn-danger dark delete-btn" onclick="deleteToDo(${el.id})">Delete</button>
          <button class="btn btn-warning dark delete-btn" onclick="patchToDoBacklog(${el.id})">Update Status to Backlog</button>
          <button class="btn btn-success dark delete-btn" onclick="patchToDo(${el.id})">Update Status to Complete</button>
        </div>
        </div>
      </div>`)
    })
    $("#my-todo").show()
}

function deleteToDo(num){
    $.ajax({
        method: 'DELETE',
        url: `${baseUrl}/todos/${+num}`,
        data: {},
        headers: {access_token: localStorage.getItem('access_token')}     
    })
    .done(response => {
        console.log("DATA BERHASIL DIHAPUS")
        $(document).empty()
        $(document).ready(myFunction())
    })
    .fail(err => {
        console.log("GAGAL")
        console.log(err)
    })
    .always(() => {
        console.log("always RUN")
    })
}

function editToDo(num){
    $("#update-task").show()
    $("#create-task-btn").hide()

    $("#update-task-form-btn").click(function(event){
        event.preventDefault()
        let title = $('#task-title-update').val()
        let description = $('#task-description-update').val()
        let status = "true"
        let due_date = $('#task-due-date-update').val()
        console.log(title, "DIA MASUK UPDATE")

        $.ajax({
            method: 'PUT',
            url: `${baseUrl}/todos/${+num}`,
            data: {title, description, status, due_date},
            headers: {access_token: localStorage.getItem('access_token')}     
        })
        .done(response => {
            $(document).empty()
            $(document).ready(myFunction())
        })
        .fail(err => {
        })
        .always(() => {
            console.log("always RUN")
        })  
    })  
}

function patchToDoBacklog(num){
    let status = "false"

    $.ajax({
        method: 'PATCH',
        url: `${baseUrl}/todos/${+num}`,
        data: {status},
        headers: {access_token: localStorage.getItem('access_token')}     
    })
    .done(response => {
        $(document).empty()
        $(document).ready(myFunction())
    })
    .fail(err => {
        console.log(err)
    })
    .always(() => {
        console.log("RUN")
    })   
}

function patchToDo(num){
    let status = "true"

    $.ajax({
        method: 'PATCH',
        url: `${baseUrl}/todos/${+num}`,
        data: {status},
        headers: {access_token: localStorage.getItem('access_token')}     
    })
    .done(response => {
        $(document).empty()
        $(document).ready(myFunction())
    })
    .fail(err => {
        console.log(err)
    })
    .always(() => {
        console.log("RUN")
    })   
}

function onSignIn(googleUser) {
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: 'POST',
        url:`${baseUrl}/loginGoogle`,
        data: {id_token},
    })
    .done(response => {
        localStorage.setItem('access_token',response.access_token)
        checkAuth()
    })
    .fail((xhr,status) => {

    })
}