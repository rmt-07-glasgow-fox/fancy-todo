const baseUrl = "http://localhost:4000"

$(document).ready(function(){

    // jQuery methods go here...
    $("#login-page").hide()
    $("#register-page").show()
    $("#todolist-page").hide()

});

  $("#btn-register").click(function(event){
      event.preventDefault()
      var email = $("#email-register").val()
      var password = $("#password-register").val()
    //   console.log(email, password, `>>>>> masuk sini`);

     $.ajax({
      method: 'POST',
      url: `${baseUrl}/todos/register`,
      data: {
        email,
        password
      }
    })
    
    .done(response => {
      console.log(response,"response");
    //   localStorage.setItem("access_token",response.access_token)
    //   checkAuth()
    })
    .fail(err => {
      console.log(err,`err`);
    })
    .always(() => {
      $(`#input-email`).val('')
      $(`#input-password`).val('')
    })

})
