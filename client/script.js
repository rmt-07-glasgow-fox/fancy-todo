let baseUrl = "http://localhost:3000"


function checkAuth(){

      if(localStorage.access_token){
            $("#loggedin").show()
            $(".login-page").hide()
            $(".card-todo").show()
            $("#logout-btn").show()
            $("#nologin").hide()
            

      } else {
            $("#nologin").show()
            $("#loggedin").hide()
            $(".card-todo").hide() 
            $(".login-page").show()
            $("#logout-btn").hide()
            
      }
}

function contentInit() {
      $("#loggedin").hide()
      $(".card-todo").hide()
      $(".register-page").hide()
      $(".add-page").hide()
}

$(document).ready(function(){
      contentInit()
      getTodos()
      checkAuth()
      

      $(".register-link").click(function() {
            $(".login-page").hide()
            $(".register-page").show()

      })

      $(".login-link").click(function(){
            $(".login-page").show()
            $(".register-page").hide()
      })

      $("#register-submit").click(function(){
            $(".login-page").show()
      })

      $("#logout-btn").click(function(){
            localStorage.clear()
            checkAuth()
            
      })

      $(".add-btn").click(function(){
            $(".add-page").show()
            $(".card-todo").hide()
      })
    
      //log in
      $("#login-submit").click(function(event){
            event.preventDefault()
            let email = $("#email-login").val()
            let password = $("#password-login").val()
            console.log(email, password, "<<<");
      
            $.ajax({
                  method: 'POST',
                  url: `${baseUrl}/login`,
                  data: { email, password }
            })
            .done(response => {
                  console.log(response);
                  localStorage.setItem("access_token", response.access_token)
                  checkAuth()
                  getTodos()
            })
            .fail(err => {
                  console.log(err, 'err');
            })
            .always(() => {
                  console.log('always');
                  $("#password-login").val('')
            })
      })

      //create todo
      $("#add-submit").click(function(event){
            event.preventDefault()

            let title = $("#title").val()
            let description = $("#description").val()
            let due_date = $("#due_date").val()
            console.log(title);

            $.ajax({
                  method: "POST",
                  url: `${baseUrl}/todos`,
                  headers: { access_token: localStorage.access_token },
                  data: { title, description, due_date }

            }).done(response => {
                  $(".add-page").hide()
                  checkAuth()
            }).fail(err => {
                  console.log(err);
            }).always(()=> {
                  console.log("always");
            })
      })

      $("#add-submit").click(function(event){
            event.preventDefault()

            let title = $("#title").val()
            let description = $("#description").val()
            let due_date = $("#due_date").val()
            console.log(title);

            $.ajax({
                  method: "POST",
                  url: `${baseUrl}/todos`,
                  headers: { access_token: localStorage.access_token },
                  data: { title, description, due_date }

            }).done(response => {
                  $(".add-page").hide()
                  checkAuth()
            }).fail(err => {
                  console.log(err);
            }).always(()=> {
                  console.log("always");
            })
      })

})



function onSignIn(googleUser) {
      let id_token = googleUser.getAuthResponse().id_token;

      $.ajax({
            method: "POST",
            url: `${baseUrl}/googleLogin`,
            data: {
                  id_token
            }
      })
      .done(response => {
            localStorage.setItem("access_token", response.access_token)
            checkAuth()
            getTodos()
      })
      .fail(err => {
            console.log(err);
      })
    }

function signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
      checkAuth()
}

function getTodos() {
      $.ajax({
            method: "GET",
            url: `${baseUrl}/todos`,
            headers: { access_token: localStorage.access_token }
      })
      .done(response => {
            let todoList = response
            $("#todo").empty()
           
            todoList.forEach(element => {
                $("#todo").append(`
            <div class="card border-primary mb-3" style="max-width: 20rem; margin-top: 10px; margin-bottom: 10px;">
                <div class="card-header d-flex w-100 justify-content-between">
                  <input type="checkbox" style="margin: 5px;" name="status" value="true" onclick=updateStatus()>
                  <h5>Todo</h5>
                  <small>${element.due_date}</small>
                </div>
                <div class="card-header ">
                  <h4 class="card-title" id="title" name="title" >${element.title}</h4>
                  <p class="card-text" id="description" name="description" >${element.description}</p>
                  
                </div>
                  <div  class="card-header " style="border-top: brown;">
                    <button type="button" class="btn btn-primary btn-sm" onclick="updateTodo(${element.id})">Update</button>
                    <button type="button" class="btn btn-primary btn-sm" onclick="updateTodo(${element.id})">Delete</button>
                  </div>
                </div>
            </div>`)  
                  
            });
      })
      .fail(err => {
            console.log(err);
      })
      .always(() => {
            console.log('always');
      })


      
}



