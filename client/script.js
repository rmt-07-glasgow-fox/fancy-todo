const baseUrl = "http://localhost:3000"

$(document).ready(function(){
  $('#login-form').show()
})

$('#login-btn').click(function(event){
  event.preventDefault()
  
  const email = $('#email').val()
  const password = $('#password').val()
  const user_name = email.split('@')[0]

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/login`,
    data : {
      email,
      password
    }
  })
  .done(response => {
    console.log(response);
    localStorage.access_token = response.accessToken
    localStorage.user_name = user_name
  })
  .fail(err => console.log(err))
  .always(()=> {
    $('#email').val("")
    $('#password').val("")
  })
})

$('#register-btn').click(function(event){
  event.preventDefault()
  
  const email = $('#email-register').val()
  const password = $('#password-register').val()

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/register`,
    data : {
      email,
      password
    }
  })
  .done(response => {
    $('#login-form').show()
    $('#register-form').hide()
  })
  .fail(err => console.log(err))
  .always(()=> {
    $('#email-register').val("")
    $('#password-register').val("")
  })
})

$('#create-account').click(function(event){
  event.preventDefault()
  $('#login-form').hide()
  $('#register-form').show()
})

$('#login-account').click(function(event){
  event.preventDefault()
  $('#login-form').show()
  $('#register-form').hide()
})