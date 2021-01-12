const baseUrl = "http://localhost:3001"

$(document).ready(function(){
  // jQuery methods go here...
  console.log(`masuk document ready`);
  checkAuth()
});

// >>>>>>>>>>>> FUNCTION <<<<<<<<<<<<
function checkAuth() {
  if (localStorage.access_token) {
    $(`#todolist-page`).show()
    $(`#login-page`).hide()
    $(`#register-page`).hide()
    $(`#btn-logout`).show()

  } else {
    $(`#todolist-page`).hide()
    $(`#login-page`).show()
    $(`#register-page`).hide()
    $(`#btn-logout`).hide()
  }
}

function showFormRegister(){
  $(`#register-page`).show()
  $(`#login-page`).hide()
}

function showFormLogin(){
  $(`#register-page`).hide()
  $(`#login-page`).show()
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: `POST`,
    url: `${baseUrl}/user/loginGoogle`,
    data: { id_token }
  })
  .done( response => {
    localStorage.setItem(`access_token`,response.access_token)
    checkAuth()
  })
  .fail(err => {
    alert({message : err.msg});
  })
  .always(() => {
    $(`#search-login`).val('')
    $(`#password-login`).val('')
  })
}

$(`#btn-register`).click((event) => {
  event.preventDefault()
  var email = $(`#email-register`).val()
  var phoneNumber = $(`#phone-register`).val()
  var password = $(`#password-register`).val()

  $.ajax({
  method: 'POST',
  url: `${baseUrl}/user/register`,       
  data: {
    email,
    phoneNumber,
    password
    }
  })
  .done(response => {
    // console.log(response,`response`);   
    $(`#login-page`).show()
    $(`#register-page`).hide()
    Auth()
  })
  .fail(err => {
    console.log(err,`err`);
    // alert(err)
  })
  .always(() => {
    $(`#email-register`).val('')
    $(`#password-register`).val('')
    $(`#password-register`).val('')
  })
})

$(`#btn-login`).click((event) => {
  event.preventDefault()
  var search = $(`#search-login`).val()
  var password = $(`#password-login`).val()

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/user/login`,
    data: {
      search,
      password
    }
  })
  .done(response => {
  localStorage.setItem(`access_token`,response.access_token)
  // console.log(response);
    checkAuth()
  })
  .fail(err => {
    alert({message : err.msg});
  })
  .always(() => {
    $(`#search-login`).val('')
    $(`#password-login`).val('')
  })
})

$(`#link-register`).click((event) => {
  event.preventDefault()
  showFormRegister()
})

$(`#link-login`).click((event) => {
  event.preventDefault()
  showFormLogin()
})

$(`#btn-logout`).click(() => {
  localStorage.clear()
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  checkAuth()
})

