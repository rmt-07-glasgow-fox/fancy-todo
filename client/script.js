var baseurl = 'http://localhost:3000'
$(document).ready( () => {
    auth()
} )

function auth() {
    if (localStorage.access_token) {
        $(".login").hide()
        $(".register").hide()
        $("#user").show()
        $(".main-content").show()
        $(".create").hide()
        $(".edit").hide()
        $('.show-covid-info').show()
        getData()
    } else {
        $(".loginPage").show()
        $(".registerPage").hide()
        $("#user").hide()
        $(".mainPage").hide()
        $('.show-covid-info').show()
    }
}

$(".registerBtn").on( "click", (even) => {
  even.preventDefault()
  $(".registerPage").fadeIn()
  $(".loginPage").hide()
} )

$(".loginBtnPage").on( "click", (even) => {
  even.preventDefault()
  $(".loginPage").fadeIn()
  $(".registerPage").hide()
} )

$("#sendLogin").on( "click", (even) => {
  even.preventDefault()
  var email = $('#emaillog').val()
  var password = $('#passwordlog').val()
  $.ajax({
      method: "POST",
      url: `${baseurl}/api/users/login`,
      data: {
          email,
          password
      }
  })
  .done( data => {
      localStorage.setItem('access_token', data.access_token)
      $('#userName').text(email)
      $("#user").show()
      $('.loginPage').hide()
      $('.registerPage').hide()
      $('.mainPage').fadeIn()
      getData()
  } )
  .fail( err => {
      console.log(err);
  } )
  .always( () => {
  } )
} )


$("#sendRegister").on( "click", (even) => {
  even.preventDefault()
  var email = $('#emailreg').val()
  var password = $('#passwordreg').val()
  $.ajax({
      method: "POST",
      url: `${baseurl}/api/users/register`,
      data: {
          email,
          password
      }
  })
  .done( data => {
      $(".loginPage").fadeIn()
      $(".registerPage").hide()
  } )
  .fail( err => {
      console.log(err, email);
  } )
  .always( () => {

  } )
} )

function getData() {
  $('.allActivities').empty()
  $.ajax({
      method: 'GET',
      url: `${baseurl}/api/todos`,//with id
      headers: {
          access_token: localStorage.access_token
      },
  })
  .done( data => {
      let todos 
      data.forEach( el => {
          todos += `
            <li class="list-group-item">
              <div class="card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${el.title}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">${new Date(el.due_date).toLocaleDateString()}</h6>
                  <p class="card-text">${el.description}</p>
                  <button class="btn btn-primary">Edit</button> 
                  <button class="btn btn-danger" onclick="deleteData(${el.id})"> Delete </button>
                </div>
              </div>
            </li>`
      } )
      $('.todoList').append( todos)
  } )
  .fail( err => {
      console.log(err);
  } )
  .always( () => {
  } )
}

function deleteData(id) {
  $.ajax({
      method: 'DELETE',
      url: `${baseurl}/api/todos/${id}`,//with id
      headers: {
          access_token: localStorage.access_token
      },
  })
  .done( data => {
      getData()
  } )
  .fail( err => {
      console.log(err);
  } )
  .always( () => {
  } )
}


$('#logoutBtn').on( "click", (even) => {
  even.preventDefault()
  localStorage.clear()
  $('.todoList').val('')
  $('#email').val('')
  $('#password').val('')
  auth()
} )



function onSuccess(googleUser) {
  console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
}
function onFailure(error) {
  console.log(error);
}
function renderButton() {
  gapi.signin2.render('my-signin2', {
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure':  onFailure
  });
}