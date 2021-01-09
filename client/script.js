let baseUrl = "http://localhost:3000"


function checkAuth(){

      if(localStorage.access_token){
            $("#loggedin").show()
            $(".login-page").hide()
            $(".card-todo").show()
            $("#logout-btn").show()
            $("#nologin").hide()
            $(".register-page").hide()
            

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
      $(".update-page").hide()
}

$(document).ready(function(){
      contentInit()
      
      checkAuth()
      
      $("#home").click(function(){
            checkAuth()
            $(".add-page").hide()
            $(".update-page").hide()   
      })

      $("#fancy-todo").click(function(){
            checkAuth()
            $(".add-page").hide()
            $(".update-page").hide()   
      })

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

      //register
      $("#register-submit").click(function(event){
            event.preventDefault()
            let email = $("#email-register").val()
            let password = $("#password-register").val()
            console.log(email, password, "<<<");
      
            $.ajax({
                  method: 'POST',
                  url: `${baseUrl}/register`,
                  data: { email, password }
            })
            .done(response => {
                  checkAuth()
                  getTodos()
                  alert("berhasil terdaftar")
            })
            .fail(err => {
                  alert(err.responseJSON.message)
            })
            .always(() => {
                  console.log('always');
                  $("#email-register").val('')
                  $("#password-register").val('')
            })
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
                  alert(err.responseJSON.message)
            })
            .always(() => {
                  console.log('always');
                  $("#password-login").val('')
            })
      })

      //create todos
      $("#add-submit").click(function(event){
            event.preventDefault()

            let title = $("#title-create").val()
            let description = $("#description-create").val()
            let due_date = ($("#due_date").val())

            $.ajax({
                  method: "POST",
                  url: `${baseUrl}/todos`,
                  headers: { access_token: localStorage.access_token },
                  data: { title, description, due_date }

            }).done(response => {
                  $(".add-page").hide()
                  checkAuth()
                  getTodos()
            }).fail(err => {
                  alert(err.responseJSON)
            }).always(()=> {
                  console.log("always");
            })
      })


      //update todos
      $("#update-submit").click(function(event){
            event.preventDefault()
            let title = $("#title-update").val()
            let description = $("#description-update").val()
            let due_date = $("#due_date-update").val()

            let id = $("#update-btn").data("id")
            console.log(id);
            $.ajax({
                  method: "PUT",
                  url: `${baseUrl}/todos/${id}`,
                  headers: { access_token: localStorage.access_token },
                  data: { title, description, due_date }

            }).done(response => {
                  $(".update-page").hide()
                  checkAuth()
                  getTodos()

            }).fail(err => {
                  alert(err.responseJSON)
                  // console.log(err);
            })
      })

})

//google log in
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
            alert(err.responseJSON.message)
      })
    }

// google sign out
function signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
      checkAuth()
}

//read todo
function getTodos() {
      $.ajax({
            method: "GET",
            url: `${baseUrl}/todos`,
            headers: { access_token: localStorage.access_token }
      })
      .done(response => {
            let todoList = response
            $("#todo").empty()
            const options ={weekday: "short", year: "numeric", month: "short", day: "numeric"}
            todoList.forEach(element => {
                  let date = new Date(element.due_date).toLocaleDateString("en-EN", options)
                $("#todo").append(`
            <div class="column-card card border-primary mb-3" style="max-width: 20rem; margin-top: 10px; margin-bottom: 10px;">
                <div class="card-header d-flex w-100 justify-content-between">
                  <input type="checkbox" style="margin: 5px;" id="update-status" name="status" onclick=updateStatus(${element.id})>
                  <h5>Todo</h5>
                  <small>${date}</small>
                </div>
                <div class="card-header ">
                  <h4 class="card-title" id="title" name="title" >${element.title}</h4>
                  <p class="card-text" id="description" name="description" >${element.description}</p>
                  
                </div>
                  <div  class="card-header " style="border-top: brown;">
                    <button type="button" class="btn btn-primary btn-sm" id="update-btn" onclick="getTodo(${element.id})">Update</button>
                    <button type="button" class="btn btn-primary btn-sm" id="delete-btn" onclick="deleteTodo(${element.id})">Delete</button>
                  </div>
                </div>
            </div>`)  
                  
            });
      })
      .fail(err => {
            alert(err.responseJSON.message)
      })
      .always(() => {
            console.log('always');
      })
      
}

//read one todo
function getTodo(id){
      
      $.ajax({
            method: "GET",
            url: `${baseUrl}/todos/${id}`,
            headers: { access_token: localStorage.access_token }
            
      }).done(response => {
            $("#title-update").val(response.title)
            $("#description-update").val(response.description)
            $("#due_date-update").val(response.due_date)

            $(".update-page").show()
            $(".card-todo").hide()

            $("#update-btn").data("id", id)


            
      }).fail(err => {
            alert(err.responseJSON.message)
      })


}

//delete Todo
function deleteTodo(id){
            
      $.ajax({
            method: "DELETE",
            url: `${baseUrl}/todos/${id}`,
            headers: { access_token: localStorage.access_token },

      }).done(response => {
            alert("berhasil dihapus")
            checkAuth()
            getTodos()
      }).fail(err => {
            console.log(err);
            alert(err.responseJSON.message)
      })
}

//update status
function updateStatus(id){
      let status;
      if($("input:checked").val()){
            status = true
      } else {
            status = false
      }
  
      console.log(status);
      $.ajax({
            method: "PATCH",
            url: `${baseUrl}/todos/${id}`,
            headers: { access_token: localStorage.access_token },
            data: { status }
      })
      .done(response => {

      })
      .fail(err => {
            alert(err.responseJSON.message)
            checkAuth()
            getTodos()
      })
}


