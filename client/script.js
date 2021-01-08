let baseUrl = 'http://localhost:3000'

$(document).ready(() => {
  // console.log('coba di reload')

  $("#login-page").show();
  $("#add-task-page").hide();
  $("#weather-page").hide();
});

$("#login-btn").click((event) => {
  event.prevenDefault();
  let email = $("#email").val();
  let password = $("#password").val();
  // console.log(email, password, '<<< data login');
  $.ajax({
    method: 'POST',
    url: `${baseUrl}/login`,
    data: {
      email,
      password
    }
  })
  .done(response => {
    console.log(response, '<< ini responnya')
  })
  .fail(err => {
    console.log(err, '<<< ini error')
  })
  .always(() => {
    console.log('always')
  })
});

