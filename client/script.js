$(document).ready(function () {
  // jQuery methods go here...
  checkAuth();

  $("#link-to-register").click(function (event) {
    event.preventDefault();
    $("#email-login").val("");
    $("#password-login").val("");
    $(".login-errors").empty();
    registerPage();
  });

  $("#login-btn").click(function (event) {
    event.preventDefault();

    let email = $("#email-login").val();
    let password = $("#password-login").val();
    // console.log(email, password);

    $.ajax({
      url: "https://server-fancy-todo-jan.herokuapp.com/login",
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
        $(".login-errors").empty();
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
      url: "https://server-fancy-todo-jan.herokuapp.com/register",
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
        $(".register-errors").empty();
        checkAuth();
      })
      .fail((err) => {
        console.log(err, "== err");
        let errMsgScript = "";
        err.responseJSON.forEach((msg) => {
          errMsgScript += `<p style="color: red;">${msg}</p>`;
        });
        $(".register-errors").html(errMsgScript);
      });
  });

  $("#register-cancel-btn").click((event) => {
    event.preventDefault();
    $("#username-register").val("");
    $("#fullName-register").val("");
    $("#email-register").val("");
    $("#password-register").val("");
    $(".register-errors").empty();
    checkAuth();
  });

  $("#add-todo-btn").click((event) => {
    event.preventDefault();
    // console.log('add todo dipencet');
    $("#modal-add-todo").show();
    checkAuth();
  });

  $("#modal-add-todo-save").click((event) => {
    event.preventDefault();
    const title = $("#title-add-todo").val();
    const description = $("#description-add-todo").val();
    const status = false;
    const due_date = new Date($("#date-add-todo").val());

    // console.log(title, description, status, due_date);

    $.ajax({
      url: "https://server-fancy-todo-jan.herokuapp.com/todos",
      method: "POST",
      data: {
        title,
        description,
        status,
        due_date,
      },
      headers: {
        access_token: localStorage.access_token,
      },
    })
      .done((response) => {
        // console.log(response);
        $("#modal-add-todo").hide();

        $("#title-add-todo").val("");
        $("#description-add-todo").val("");
        $("#date-add-todo").val("");
        $(".add-todo-errors").empty();
        checkAuth();
      })
      .fail((xhr) => {
        // console.log(xhr);
        let errMsgScript = "";
        xhr.responseJSON.forEach((msg) => {
          errMsgScript += `<p style="color: red;">${msg}</p>`;
        });
        $(".add-todo-errors").html(errMsgScript);
      });
    // console.log('add todo save dipencet');
  });

  $(".modal-close").click((event) => {
    event.preventDefault();
    $(".modal-todo").hide();
    $(".todo-errors").empty();
    checkAuth();
  });

  $(document).on("click", ".delete-btn", function () {
    const idTodo = $(this).attr("id-delete-btn");
    // console.log(idTodo, "delete btn dipencet");

    $.ajax({
      url: `https://server-fancy-todo-jan.herokuapp.com/todos/${idTodo}`,
      method: "DELETE",
      headers: {
        access_token: localStorage.access_token,
      },
    })
      .done((response) => {
        console.log(response);
        checkAuth();
      })
      .fail((xhr) => {
        console.log(xhr);
      });
  });

  $(document).on("click", ".status-btn", function () {
    const idTodo = $(this).attr("id-status-btn");
    // console.log($(this).text());
    let updateStatus;
    if ($(this).text() === "✓") {
      updateStatus = false;
    } else {
      updateStatus = true;
    }
    // console.log(idTodo, "delete btn dipencet");

    $.ajax({
      url: `https://server-fancy-todo-jan.herokuapp.com/todos/${idTodo}`,
      method: "PATCH",
      data: {
        status: updateStatus,
      },
      headers: {
        access_token: localStorage.access_token,
      },
    })
      .done((response) => {
        // console.log(response);
        checkAuth();
      })
      .fail((xhr) => {
        console.log(xhr);
      });
  });

  $(document).on("click", ".edit-btn", function () {
    const idTodo = $(this).attr("id-edit-btn");
    // console.log(idTodo);

    $.ajax({
      url: `https://server-fancy-todo-jan.herokuapp.com/todos/${idTodo}`,
      method: "GET",
      headers: {
        access_token: localStorage.access_token,
      },
    })
      .done((response) => {
        // console.log(response);
        let todoDate = new Date(response.due_date);
        const dd = String(todoDate.getDate()).padStart(2, "0");
        const mm = String(todoDate.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = todoDate.getFullYear();

        todoDate = yyyy + "-" + mm + "-" + dd;

        $("#title-edit-todo").val(response.title);
        $("#description-edit-todo").val(response.description);
        $("#date-edit-todo").val(todoDate);
        $("#modal-edit-todo-save").attr("idTodo", `${idTodo}`);
        $("#modal-edit-todo-save").attr("statusTodo", `${response.status}`);
        // console.log($("#modal-edit-todo-save").attr("idTodo"));
        // console.log($("#modal-edit-todo-save").attr("statusTodo"));
      })
      .fail((xhr) => {
        console.log(xhr);
      });

    $("#modal-edit-todo").show();
  });

  $("#modal-edit-todo-save").click((event) => {
    event.preventDefault();
    const title = $("#title-edit-todo").val();
    const description = $("#description-edit-todo").val();
    const due_date = new Date($("#date-edit-todo").val());
    const idTodo = $("#modal-edit-todo-save").attr("idTodo");
    const status = $("#modal-edit-todo-save").attr("statusTodo");

    // console.log(title, description, status, due_date, idTodo);

    $.ajax({
      url: `https://server-fancy-todo-jan.herokuapp.com/todos/${idTodo}`,
      method: "PUT",
      data: {
        title,
        description,
        status,
        due_date,
      },
      headers: {
        access_token: localStorage.access_token,
      },
    })
      .done((response) => {
        // console.log(response);
        $("#modal-edit-todo").hide();
        $("#title-edit-todo").val("");
        $("#description-edit-todo").val("");
        $("#date-edit-todo").val("");
        $(".edit-todo-errors").empty();
        checkAuth();
      })
      .fail((xhr) => {
        console.log(xhr);
        let errMsgScript = "";
        xhr.responseJSON.forEach((msg) => {
          errMsgScript += `<p style="color: red;">${msg}</p>`;
        });
        $(".edit-todo-errors").html(errMsgScript);
      });
    // console.log("edit todo save dipencet");
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
    url: "https://server-fancy-todo-jan.herokuapp.com/",
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
  $("footer").hide();
  $("#no-todo").hide();

  $.ajax({
    url: "https://server-fancy-todo-jan.herokuapp.com/",
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
  $("footer").show();
  $("#logout-btn").show();
  $("#no-todo").hide();
  // console.log("reload");

  $.ajax({
    url: "https://server-fancy-todo-jan.herokuapp.com/todos",
    method: "GET",
    headers: {
      access_token: localStorage.access_token,
    },
  })
    .done((response) => {
      $("#todo-list").empty();
      // console.log(response);
      // console.log(response.todoList.length);
      
      if(response.todoList.length === 0){
        $("#no-todo").show();
      }
      response.todoList.forEach((todo) => {
        // console.log(todo);
        let statusTodo;
        let dueDate = new Intl.DateTimeFormat("id-ID", {
          dateStyle: "full",
        }).format(new Date(todo.due_date));
        if (todo.status) {
          statusTodo = "✓";
          $("#todo-list").append(`
        <div class="col">
                <div class="card shadow-sm">
                  <div class="card-body">
                    <h6 class="card-text">${todo.title}</h6>
                    <p class="card-text">${todo.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-success status-btn" id-status-btn="${todo.id}">${statusTodo}</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary edit-btn" id-edit-btn="${todo.id}">Edit</button>
                        <button type="button" class="btn btn-sm btn-outline-danger delete-btn" id-delete-btn="${todo.id}">Delete</button>
                        </div>
                      <small class="text-muted">${dueDate}</small>
                    </div>
                  </div>
                </div>
              </div>`);
        } else {
          statusTodo = "✕";
          $("#todo-list").append(`
        <div class="col">
                <div class="card shadow-sm">
                  <div class="card-body">
                    <h6 class="card-text">${todo.title}</h6>
                    <p class="card-text">${todo.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-danger status-btn" id-status-btn="${todo.id}">${statusTodo}</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary edit-btn" id-edit-btn="${todo.id}">Edit</button>
                        <button type="button" class="btn btn-sm btn-outline-danger delete-btn" id-delete-btn="${todo.id}">Delete</button>
                        </div>
                      <small class="text-muted">${dueDate}</small>
                    </div>
                  </div>
                </div>
              </div>`);
        }
      });

      getChuckQuote();
      getNews();
    })
    .fail((err) => {
      console.log(err);
    });
}

function getChuckQuote() {
  $.ajax({
    url: "https://server-fancy-todo-jan.herokuapp.com/quote",
    method: "GET",
    headers: {
      access_token: localStorage.access_token,
    },
  })
    .done((response) => {
      $("#inspirational-quote").html(`${response.quote}`);
      // console.log(response);
    })
    .fail((xhr) => {
      console.log(xhr);
    });
}

function getNews() {
  $.ajax({
    url: "https://server-fancy-todo-jan.herokuapp.com/news",
    method: "GET",
    headers: {
      access_token: localStorage.access_token,
    },
  })
    .done((response) => {
      // console.log(response);
      $("#accordionNews").empty();
      response.forEach((news, idx) => {
        $("#accordionNews").append(`<div class="accordion-item">
      <h2 class="accordion-header text-start" id="heading${idx}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${idx}" aria-expanded="true" aria-controls="collapse${idx}">
          ${news.title}
          </button>
          </h2>
          <div id="collapse${idx}" class="accordion-collapse collapse" aria-labelledby="heading${idx}" data-bs-parent="#accordionNews">
          <div class="accordion-body">
          <p class="text-start">${news.description}</p>
          <p class="text-start">Source: <a href="${news.url}" target="_blank">${news.source.name}</a></p>
        </div>
      </div>
    </div>`);
      });
    })
    .fail((xhr) => {
      console.log(xhr);
    });
}

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: "POST",
    url: "https://server-fancy-todo-jan.herokuapp.com/loginGoogle",
    data: {
      id_token,
    },
  })
    .done((response) => {
      $("#email-login").val("");
      $("#password-login").val("");
      $(".login-errors").empty();
      if (!localStorage.access_token) {
        localStorage.access_token = response.access_token;
        checkAuth();
      }
      // kenapa pagenya jadi reload 2x kalau pakai google login?
    })
    .fail((xhr, status) => {
      console.log(xhr);
    });
}
