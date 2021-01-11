let serverUrl = 'http://localhost:3000'
$(document).ready(function(){
  checkAuth()
})

function checkAuth(){
  if(localStorage.access_token){
    $('#login-page').hide()
    $('#navbarNav').show()
    $('#all-todo-list').show()
    getTodoList()
   } else {
    $('#login-page').show()
    $('#navbarNav').hide()
    $('#all-todo-list').hide()
   }
}

function getTodoList(){
  $.ajax({
    method: 'GET',
    url: `${serverUrl}/todos`,
    headers: {
      access_token : localStorage.access_token
    }
  })
  .done(response => {
    console.log(response)
    let todoList = response

    todoList.forEach(element => {
      
    });
  })
  .fail(err => {
    console.log(err)
  })
}
function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token //tidak disimpan ke local storage
  console.log(id_token)
  $.ajax({
    method: 'POST',
    url: `${serverUrl}/login-google`,
    data: { id_token }
  })
  .done(response => {
    let token = response.access_token
    localStorage.setItem('access_token', token)
    checkAuth()
  })
  .fail(err => {
    console.log(err)
  })
}

$("#login-button").click(function(event){
  event.preventDefault()
  let email = $("#input-email").val()
  let password = $("#input-password").val()
  console.log(email, password)

  $.ajax({
    method: 'POST',
    url: `${serverUrl}/login`,
    data: {
      email,
      password
    }
  })
  .done(user => {
    let token = user.access_token
    localStorage.setItem('access_token', token)
    checkAuth()
  })
  .fail(err => {
    console.log(err)
  })
  .always(() => {
    $('#input-email').val('')
    $('#input-password').val('')
  })
})

$("#logout-button").click((event) => {
  localStorage.removeItem('access_token')
  let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  checkAuth()
})