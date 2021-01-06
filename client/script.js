var baseUrl = "http://localhost:3000"

//after function
function checkAuth() {
  if (localStorage.access_token) {
    $("#appDesc").hide()
    $("#logout").show()
    $("#login").hide()
    $("#register").hide()
    $("#createArea").show()
    $("#addForm").hide()
    $("#showTodo").show()
    $("#covidApiArea").show()
  } else {
    $("#appDesc").show()
    $("#logout").hide()
    $("#login").hide()
    $("#register").show()
    $("#createArea").hide()
    $("#addForm").hide()
    $("#showTodo").hide()
    $("#covidApiArea").hide()
  }
}


//register
$("#createNewUser").click((event)=> {
  event.preventDefault()
  var email = $("#emailRegister").val()
  var password = $("#passwordRegister").val()
  console.log(email, password);

  $.ajax({
    method: "POST",
    url: `${baseUrl}/register`,
    data: {
      email,
      password
    }
  })
  .done(response => {
    console.log(response, "ini res");
    login(email, password)
  })
  .fail(err => {
    console.log(err, "ini err");
  })
  .always(() => {
    $("#emailRegister").val("")
    $("#passwordRegister").val("")
  })
})
$("#toLogin").click((event)=> {
  event.preventDefault()
  $("#register").hide()
  $("#login").show()
})

//login
function login(email, password) {
  $.ajax({
    method: "POST",
    url: `${baseUrl}/login`,
    data: {
      email,
      password
    }
  })
  .done(response => {
    console.log(response, "ini res");
    localStorage.setItem("access_token", response.access_token)
    checkAuth()
  })
  .fail(err => {
    console.log(err, "ini err");
  })
  .always(() => {
    $("#emailLogin").val("")
    $("#passwordLogin").val("")
  })
}

$("#loginUser").click((event)=> {
  event.preventDefault()
  var email = $("#emailLogin").val()
  var password = $("#passwordLogin").val()
  console.log(email, password);
  login(email, password)
})
$("#toRegister").click((event)=> {
  event.preventDefault()
  $("#login").hide()
  $("#register").show()
})

//logout
$("#logout").click((event) => {
  event.preventDefault()
  localStorage.clear()
  checkAuth()
})


//create area
$("")


//========================Document Ready===============================================
$(document).ready(()=> {
  console.log("page reloaded");
  checkAuth()

})