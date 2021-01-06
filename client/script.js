$(document).ready(function () {
  // jQuery methods go here...
  checkAuth();

  $("#link-to-register").click(function (event) {
    event.preventDefault();
    registerPage();
  });

  $("#login-btn").click(function (event) {
    event.preventDefault();

    let email = $("#email-login").val();
    let password = $("#password-login").val();
    // console.log(email, password);

    $.ajax({
      url: "http://localhost:3000/login",
      method: "POST",
      data: {
        email,
        password,
      },
    })
      .done((response) => {
        localStorage.access_token = response.access_token;
        $("#email-login").val("");
        $("#password-login").val("");
        checkAuth();
      })
      .fail((err) => {
        // console.log(err.responseJSON.message, "<=== err");
        $(".login-errors")
          .html(`<p style="color: red;">${err.responseJSON.message}</p>
      `);
      });
  });

  $("#logout-btn").click((event) => {
    event.preventDefault();
    localStorage.clear();
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log("User signed out.");
    });
    checkAuth();
  });

  $("#register-btn").click(function (event) {
    event.preventDefault();

    let username = $("#username-register").val();
    let fullName = $("#fullName-register").val();
    let email = $("#email-register").val();
    let password = $("#password-register").val();
    // console.log(username, fullName, email, password);

    $.ajax({
      url: "http://localhost:3000/register",
      method: "POST",
      data: {
        username,
        fullName,
        email,
        password,
      },
    })
      .done((response) => {
        // console.log(response, "== response");
        $("#username-register").val("");
        $("#fullName-register").val("");
        $("#email-register").val("");
        $("#password-register").val("");
        checkAuth();
      })
      .fail((err) => {
        // console.log(err, "== err");
        let errMsgScript = "";
        err.responseJSON.forEach((msg) => {
          errMsgScript += `<p style="color: red;">${msg}</p>`;
        });
        $(".register-errors").html(errMsgScript);
      });
  });
});

function checkAuth() {
  if (!localStorage.access_token) {
    loginPage();
  } else {
    todoMainPage();
  }
}

function registerPage() {
  $(".home").show();
  $(".login-form").hide();
  $(".register-form").show();
  $(".todo-list").hide();
  $("#logout-btn").hide();
  $(".main-page").hide();

  $.ajax({
    url: "http://localhost:3000/",
    method: "GET",
  })
    .done((response) => {
      $(".quote-landing").text(response.joke);
    })
    .fail((err) => {
      console.log(err);
    });
}

function loginPage() {
  $(".home").show();
  $(".login-form").show();
  $(".register-form").hide();
  $(".todo-list").hide();
  $(".main-page").hide();
  $("#logout-btn").hide();

  $.ajax({
    url: "http://localhost:3000/",
    method: "GET",
  })
    .done((response) => {
      $(".quote-landing").text(response.joke);
    })
    .fail((err) => {
      console.log(err);
    });
}

function todoMainPage() {
  $(".home").hide();
  $(".login-form").hide();
  $(".register-form").hide();
  $(".todo-list").show();
  $(".main-page").show();
  $("#logout-btn").show();
  // console.log("reload");

  $.ajax({
    url: "http://localhost:3000/todos",
    method: "GET",
    headers: {
      access_token: localStorage.access_token,
    },
  })
    .done((response) => {
      console.log(response, "ini main page");
      $("#weather-city").text(response.openWeather.city);
      $("#weather-temp").text(response.openWeather.main.temp + "°");
      $("#inspirational-quote").text(response.joke);
    })
    .fail((err) => {
      console.log(err);
    });
}

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/loginGoogle",
    data: {
      id_token,
    },
  })
    .done((response) => {
      localStorage.access_token = response.access_token;
      checkAuth();
      // kenapa pagenya jadi reload 2x kalau pakai google login?
    })
    .fail((xhr, status) => {
      console.log(xhr);
    });
}
