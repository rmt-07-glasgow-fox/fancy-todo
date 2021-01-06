const baseUrl = 'http://localhost:3000'

$('#registerForm').hide();

$(document).ready(function() {
  $('#toRegister').click(function(event){
    event.preventDefault();
    $('#loginForm').hide();
    $('#registerForm').fadeIn();
  });

  $('#toLogin').click(function(event){
    event.preventDefault();
    $('#registerForm').hide();
    $('#loginForm').fadeIn();
  });

  $('#defaultCheck1').click(function(){
    $(this).is(':checked') ? $('#passwordLogin').attr('type', 'text') : $('#passwordLogin').attr('type', 'password');
  });

  if(localStorage.access_token){
    // TODO : hide landing page
    // TODO : show todo page
  } else {
    // TODO : show landing page
    // TODO : hide todo page
  }
});


$('#loginBtn').click(function(event) {
  event.preventDefault();
  let email = $('#emailLogin').val();
  let password = $('#passwordLogin').val();
  
  $.ajax({
    method: 'POST',
    url: `${baseUrl}/login`,
    data: {
      email,
      password
    }
  })
  .done(response => {
    console.log(response);
    localStorage.setItem('access_token',response.access_token);
    //TODO: hide landing page
    //TODO: show todo page
  })
  .fail(err => {
    console.log(err)
  })
  .always(() => {

  })
});