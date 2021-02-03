let baseUrl = "http://localhost:4000";

$(document).ready(() => {
  checkAuth();

  $("#register-btn").click((event) => {
    $("#register-form").show()
    $("#login-page").hide()
  })

  
});

const checkAuth = () => {
  if (localStorage.access_token) {
    $("#login-page").hide();
    getWeather();
    listTodo();
    $("#weather-fancy").show();
    $("#add-task-page").show();
    $("#btn-logout").show();
  } else {
    $("#login-page").show();
    $("#weather-fancy").hide();
    $("#add-task-page").hide();
    $("#btn-logout").hide();
    $("#list-todos").hide();
    $("#register-form").hide();
  }
};

$("#register-form").click((event) => {
  event.preventDefault();
  let email = $("#email").val();
  let password = $("#password").val();

  $.ajax({
    method: "POST",
    url: `${baseUrl}/users/register`,
    data: {
      email,
      password,
    },
  })
  .done((response) => {
    console.log(response)
  })
  .fail(err => {
    console.log(err)
  })
  .always(() => {
    console.log('always')
  })
});

$("#login-btn").click((event) => {
  event.preventDefault();
  let email = $("#email").val();
  let password = $("#password").val();
  $.ajax({
    method: "POST",
    url: `${baseUrl}/users/login`,
    data: {
      email,
      password,
    },
  })
    .done((response) => {
      localStorage.setItem("access_token", response.access_token);
      checkAuth();
    })
    .fail((err) => {
      console.log(err, "<<< ini error");
    })
    .always(() => {
      console.log("always");
      $("#email").val("");
      $("#password").val("");
    });
});

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: "POST",
    url: `${baseUrl}/users/logingoogle`,
    data: { id_token },
  })
    .done((response) => {
      localStorage.setItem("access_token", response.acess_token);
      checkAuth();
    })
    .fail((err) => {
      console.log(err);
    });
}

$("#btn-logout").click((event) => {
  localStorage.clear();
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(() => {
    console.log("User signed out..");
  });
  checkAuth();
});

const getWeather = () => {
  $.ajax({
    method: "GET",
    url: `${baseUrl}/weather`,
    headers: {
      access_token: localStorage.access_token,
    },
  })
    .done((response) => {
      const weather = response;
      $("weather-fancy").empty();
      $("#weather-fancy").append(
        `<div class="card" style="width: 18rem;">
        <div class="card-body">
        <div class="weather-icons text-center"><img src="${response.current.weather_icons}"></div>
        <h3 class="card-text text-center">${response.location.name}</h3>
        <div class="temperature text-center">${response.current.temperature}&deg;</div>
        <div class="weather-descriptions text-center">${response.current.weather_descriptions[0]}</div>
        </div>
      </div>`
      );
    })
    .fail((err) => {
      console.log(err, "<<< err");
    })
    .always(() => {
      console.log("always");
    });
};

const listTodo = () => {
  $.ajax({
    method: "GET",
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.access_token,
    },
  })
    .done((response) => {
      const todos = response;
      $("#get-todo").empty();
      todos.forEach((el, idx) => {
        $("#get-todo").append(
          `<tr>
            <td>${idx + 1}</td>
            <td>${el.title}</td>
            <td>${el.description}</td>
            <td>${el.status}</td>
            <td>${el.due_date}</td>
           </tr>`
        );
      });
    })
    .fail((err) => {
      console.log(err, "<<< err");
    })
    .always(() => {
      console.log("always");
    });
};

const getOneTodo = (id) => {
  $.ajax({
    method: "GET",
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.access_token,
    },
  })
    .done((response) => {
      const todos = response;
      todos.forEach((el) => {
        $("#edit-todo-btn").append(
          `<button class="btn btn-primary" onclick="getOneTodo(${el.UserId})">Edit Todo</button>`
        );
      });
    })
    .fail((err) => {
      console.log(err);
    })
    .always(() => {
      console.log("always");
    });
};
