

$(document).ready(function(){
      $(".register").hide()

      $(".register-btn").click(function() {
            $(".login").hide()
            $(".register").show()

      })

      $(".login-btn").click(function(){
            $(".login").show()
            $(".register").hide()
      })

      $("#register-submit").click(function(){
            $(".login").show()
      })
})

$("#login-btn").click(function(event){
      event.preventDefault()
      let email = $("#email-login").val()
      let password = $("#password-login").val()
     console.log(email, password, "ssss");
})