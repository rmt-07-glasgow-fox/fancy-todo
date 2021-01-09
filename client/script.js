let baseUrl = 'http://localhost:3000'
$(document).ready(function(){
    $('#form-login').show()
    $('#form-register').hide()
    $('#navbar').hide()
    $('#homepage').hide()
    // $('#form-add-todo').hide()
    

  
    $('#signup').click(function(){
        $('#form-login').hide()
        $('#form-register').fadeIn()
        $('#navbar').hide()
        $('#homepage').hide()
        // $('#form-add-todo').hide()
        // $('#add-btn').hide()
        $('#btn').show()
        
    })

    $('#signin').click(function(){
        $('#form-login').fadeIn()
        $('#form-register').hide()
        $('#navbar').hide()
        $('#homepage').hide()
        // $('#form-add-todo').hide()
        // $('#add-btn').hide()

 
    })
    if(localStorage.access_token){
        $('#form-login').hide()
        AllListTodo()
        $('#form-register').hide()
        $('#navbar').show()
        $('#homepage').show()
        // $('#form-add-todo').show()
        // $('#add-btn').show()
        $('#btn').show()
        
    }else{
        $('#form-login').show()
        $('#form-register').hide()
        $('#navbar').hide()
        $('#homepage').hide()
        // $('#form-add-todo').hide()
        // $('#add-btn').hide()
 
    }
});



/*================LOGOUT================*/

  $('#logout').click(function(event){
    event.preventDefault()
    localStorage.clear()
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    $('#form-login').show()
    $('#form-register').hide()
    $('#navbar').hide()
    $('#list-Todo').hide()
    $('#homepage').hide()
    // $('#form-add-todo').hide()
    // $('#add-btn').hide()

    
  })


/*================REGISTER================*/
$('#register-btn').click(function(event){
    event.preventDefault()
    var email = $('#email-register').val()
    var password = $('#password-register').val()

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/register`,
        data:{
            email,
            password
        }
    })
    .done(response=>{
        $('#form-register').hide()
        $('#form-login').fadeIn()
        $('#navbar').hide()
        $('#homepage').hide()
        // $('#form-add-todo').hide()
        // $('#add-btn').hide()

    })
    .fail(err=>{
        console.log(err, '=> error')
    })
    .always(()=>{
        $('#email-register').val('')
        $('#password-register').val('')
    })
})


/*================LOGIN================*/

$('#login-btn').click(function(event){
    event.preventDefault()
    var email = $('#email').val()
    var password = $('#password').val()

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/login`,
        data:{
            email,
            password
        }
    })
    .done(response=>{
      console.log(response)
        localStorage.setItem('access_token', response.access_token)
        $('#form-login').hide()
        $('#navbar').show()
        AllListTodo()
        $('#list-Todo').show()
        $('#homepage').show()
        // $('#form-add-todo').show()
        // $('#add-btn').show()
    

    })
    .fail(err=>{
        console.log(err, '=> error')
    })
    .always(()=>{
        $('#email').val('')
        $('#password').val('')
    })
})

/*================SIGNIN GOOGLE================*/
function onSignIn(googleUser) {
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    const id_token = googleUser.getAuthResponse().id_token
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/login/google`,
        data:{id_token}
    })
    .done(response=>{
        localStorage.setItem('access_token', response.access_token)
        $('#form-login').hide()
        $('#navbar').show()
        $('#homepage').show()
        // $('#form-add-todo').show()
        // $('#add-btn').show()
    })
    .fail((xhr, status )=>{

    })
    .always(()=>{
        $('#email').val('')
        $('#password').val('')
    })
}

/*====================Todo List======================*/

function AllListTodo(){
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/todos`,
        headers: {
            access_token: localStorage.access_token
        },
        
    })
    .done(response=>{
        $('#list-Todo').empty()
        response.forEach((el=>{
            $('#list-Todo').append(`
            <div class="todo">
                <div id="title">
                    <span>${el.title}</span>
                </div>
                <div id="date">
                    <span>${el.due_date.slice(0, 10)}</span>
                </div>
                <div id="description">
                    <span>${el.description}</span>
                </div>
                <div>
                    <a href="" id="edit" onclick="getTodosById(${el.id},event)">Edit</a>
                    <a href="" id="delete" onclick="deleteTodo(${el.id},event)">Delete</a>
                </div>
            </div>
            `)
        }))
        console.log(response)
    })
    .fail(err=>{
        console.log(err, '=> error')
    })
}

/*====================Add todo======================*/

$('.add-btn').click(function(event){
    event.preventDefault()
    var title = $('#title').val()
    var due_date = $('#due_date').val()
    var description = $('#description').val()
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/todos`,
        headers: {
            access_token: localStorage.access_token
        },
        data:{
            title,
            description,
            due_date,
            status:false,
        }
    })
    .done(response=>{
        console.log(response)
    })
    .fail(err=>{
        console.log(err, '=> error')
    })
    .always(()=>{
    $('#title').val('')
    $('#due_date').val('')
    $('#description').val('')
    AllListTodo()
    })
})

/*====================Delete todo======================*/

function deleteTodo(id, event){
    event.preventDefault()
    $.ajax({
        method:'DELETE',
        url: `${baseUrl}/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        },
    })
    .done(response=>{
        console.log(response)
    })
    .fail(err=>{
        console.log(err)
    })
    .always(()=>{
        AllListTodo()
    })
}

/*====================Find todo By id======================*/
function getTodosById(id,event){
    event.preventDefault()
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        },
    })
    .done(response=>{
        $('#edit-title').val(response.title)
        $('#edit-due_date').val(response.due_date.slice(0,10))
        $('#edit-description').val(response.description)
        $('.edit-btn').data("id", id)
    })
    .fail(err=>{
        console.log(err, '=> error')
    })
}


/*====================Edit todo======================*/

$('.edit-btn').click(function(event){
    event.preventDefault()
    let todosId = $('.edit-btn').data('id')
    var title = $('#edit-title').val()
    var due_date = $('#edit-due_date').val()
    var description = $('#edit-description').val()
    $.ajax({
        method: 'PUT',
        url: `${baseUrl}/todos/${todosId}`,
        headers: {
            access_token: localStorage.access_token
        },
        data:{
            title,
            description,
            due_date,
            status:false,
        }
    })
    .done(response=>{
        console.log(response)
    })
    .fail(err=>{
        console.log(err)
    })
    .always(()=>{
        AllListTodo()
        $('#edit-title').val('')
        $('#edit-due_date').val('')
        $('#edit-description').val('')
    })
})