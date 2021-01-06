var baseUrl = 'http://localhost:3000'
$(document).ready(function() {
  console.log('<><><><><><><> Reload Page <><><><><><><>');

  $('#login-page').show();
  $('#register-page').hide();

  $('#registerHere-btn').click(function(event){
    event.preventDefault()
    $('#login-page').hide();
    $('#register-page').show();
  })
  
  $('#loginHere-btn').click(function(event){
    event.preventDefault()
    $('#login-page').show();
    $('#register-page').hide();
  })

  $('#login-btn').click(function(event){
    event.preventDefault()
  
    const email = $('#email').val()
    const password =$('#password').val()
  
    $.ajax({
      method:'POST',
      url: `${baseUrl}/login`,
      data: { email, password }
    })
      .done(response => {
        console.log(response, 'RESPONSE CLIENT!!!!');
        // save token to localStorage
        localStorage.setItem('access_token', response.access_token)
      })
      .fail(err => {
        console.log(err, 'ERROR CLIENT');
        console.log(err.responseJSON);
      })
      .always(() => {
        console.log('ALWAYS');
      })
  
  })

  $('#register-btn').click(function(event) {
    event.preventDefault()
    const email = $('#emailRegister').val()
    const password = $('#passwordRegister').val()

    $.ajax({
      method: 'POST',
      url: `${baseUrl}/register`,
      data: { email, password }
    })
      .done(response => {
        console.log(response);
      })
      .fail(err => {
        console.log(err);
      })
      .always(() => {
        console.log('ALWAYS');
      })
  })
})



