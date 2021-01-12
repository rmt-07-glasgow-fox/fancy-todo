const baseUrl = 'https://risuto-fancytodo-db.herokuapp.com';

$(document).ready(_ => {
  initContent();
});

const initContent = _ => {
  $('#landing-page').hide();
  $('#dashboard-page').hide();
  if (!localStorage.getItem('access_token')) {
    landingPage();
  } else {
    dashboardPage();
  };
};

const landingPage = _ => {
  $('#dashboard-page').hide();
  $('#register-form').hide();
  $('#landing-page').show();
  $('#login-form').show();
};

const dashboardPage = _ => {
  $('#dashboard-page').show();
  $('#add-task-expanded').hide();
  $('#register-form').hide();
  $('#landing-page').hide();
  $('#login-form').hide();

  getAniQuote();
  getUserInfo();
  getTodoList();
};

const toLoginForm = e => {
  e.preventDefault();
  $('#login-form').fadeIn();
  $('#register-form').hide();
};

const toRegisterForm = e => {
  e.preventDefault();
  $('#register-form').fadeIn();
  $('#login-form').hide();
};

const register = e => {
  e.preventDefault();

  const name = $('#name-register').val();
  const email = $('#email-register').val();
  const password = $('#password-register').val();

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/register`,
    data: { name, email, password }
  })
    .done(response => {
      $('#name-register').val('');
      $('#email-register').val('');
      $('#password-register').val('');

      $('#register-form').hide();
      $('#login-form').fadeIn();

      // ALERT: Your has been created, let's login!
      swal("Noice!", "Your account has been created!", "success");
    })
    .fail(err => {
      // ALERT: Error 
      swal("Whoopsy!", `${err.responseJSON.message}`, "error");
      console.log(err);
    });
};

const login = e => {
  e.preventDefault();
  const email = $('#email-login').val();
  const password = $('#password-login').val();

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/login`,
    data: { email, password }
  })
    .done(response => {
      $('#email-login').val('');
      $('#password-login').val('');

      localStorage.setItem('access_token', response.access_token);
      dashboardPage();
    })
    .fail(err => {
      // ALERT: Error
      swal("Whoopsy!", `${err.responseJSON.message}`, "error");
      console.log(err);
    })
};

const logout = e => {
  e.preventDefault();
  localStorage.clear();

  $('#dropdownMenuButton').empty();
  $('#user-name-email').empty();
  $('#edit-task-expanded').empty();
  $('#edit-task-expanded').hide();

  let auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('Session over');
  });

  landingPage();
};

const getUserInfo = _ => {
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/getuser`,
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(response => {
      $('#dropdownMenuButton').empty();
      $('#user-name-email').empty();

      $('#dropdownMenuButton').append(
        `
        <img src="${response.profpic}" class="profPic hov1" alt="logo" style="margin-left: 24px">
        `
      );
      $('#user-name-email').append(
        `
        <h6 class="dropdown-header txt2" style="font-size: 1em;">${response.name}</h6>
        <h6 class="dropdown-header txt1" style="font-size: .7rem; margin-top: -8px;">${response.email}</h6>
        `
      );
    });
};

const maximizeAddTask = _ => {
  $('#add-task-minimized').hide();
  $('#add-task-expanded').fadeIn();
};

const minimizeAddTask = _ => {
  $('#add-task-expanded').hide();
  $('#add-task-minimized').fadeIn();
};

const addTask = e => {
  e.preventDefault();
  const title = $('#title').val();
  const description = $('#description').val();
  const due_date = $('#due_date').val();

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/todos`,
    headers: { access_token: localStorage.access_token },
    data: { title, description, due_date }
  })
    .done(response => {
      $('#title').val('');
      $('#description').val('');
      $('#due_date').val('');

      getTodoList();
      minimizeAddTask();
    })
    .fail(err => {
      console.log(err);
      swal("Whoopsy!", `${err.responseJSON.message}`, "error");

    });
};

const getTodoList = _ => {
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos`,
    headers: { access_token: localStorage.access_token },
  })
    .done(response => {
      $('#todo-field').empty();
      response.forEach(e => {
        $('#todo-field').append(
          `
          <!-- card-todo -->
          <div id="card-todo">
            <div class="wrap-todo-card100" style="margin-top: 40px; padding-top: 12px; padding-bottom: 12px">
              <h6 class="todo-title" style="margin: 12px 24px; color: #1E1E1E; font-weight: 600;">${e.title}</h6>

              <p class="todo-description" style="margin: 12px 24px; color: #1E1E1E; font-weight: 400;">
                ${e.description}</p>

              <hr style="margin:0" />

              <p style="margin-left: 24px; margin-top: 12px; color:#1E1E1E; font-weight:600;" > Due ${e.due_date.split('T')[0]} </p>

              <div id="markAsDone">
                <form>
                  <input id="done-button${e.id}" style="margin: 12px 24px;" type="checkbox" onclick="markTask(${e.id}, ${!e.status})" ${e.status ? 'checked' : ''} >
                  <label style="margin-left:-18px ;font-weight: 600;">Done</label>
                </form>
                <span style="margin-left: 24px; font-size: 0.5rem;">
                  <i onclick="editTask(${e.id})" class="fas fa-pen-square fa-3x add-task-bot"></i>
                  <i onclick="deleteTask(${e.id})" class="fas fa-trash-alt fa-3x add-task-bot" style="margin-left: 16px;"></i>
                </span>
              </div>
            </div>
          </div>
          <!-- card-todo// -->
          `
        );
      });
    })
    .fail(err => console.log(err));
};

const editTask = id => {
  $('#add-task-minimized').hide();
  $('#add-task-expanded').hide();

  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos/${id}`,
    headers: { access_token: localStorage.access_token }
  })
    .done(response => {
      $('#edit-task-expanded').empty();
      $('#edit-task-expanded').append(
        `
      <div class="wrap-edit-task100" style="margin-top: 40px; margin-left: 40px; margin-right:40px;>
      <div id="todoForm-edit">
        <form onsubmit="editTaskSubmit(event, ${response.id})" class="form" style="padding-top: 16px; padding-bottom: 16px;">
          <input id="title-edit" class="edit-task" style="margin: 12px 32px;font-weight: 600;"
            type="text" value="${response.title}">

          <hr style="margin:0" />

          <input id="description-edit" class="edit-task text-box" style="margin-top: 12px; margin-right: 32px; margin-left: 32px" type="text"
            value="${response.description}">

          <input id="due_date-edit" class="edit-task" style="margin-left: 32px; margin-top:24px; width:160px;" type="date" value="${response.due_date.split('T')[0]}">

          <div id="edit-task-button" style="margin-top: 24px; margin-left: 28px; margin-bottom: 18px;">

            <span style="font-size: 0.5rem;">
              <i id="edit-task-cancel" onclick="editCancel()" class="fas fa-times-circle fa-3x add-task-cancel"></i>
              <button type="submit"  class="fa-3x add-task-submit" style="margin-left: 32px;">
                <i class="fa fa-check-circle"></i>
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
      `
      );

      $('#edit-task-expanded').fadeIn();
    })
    .fail(err => {
      console.log(err);

      // ALERT: Error
      swal("Whoopsy!", `${err.responseJSON.message}`, "error");
    });
};

const editTaskSubmit = (e, id) => {
  e.preventDefault();

  const title = $('#title-edit').val();
  const description = $('#description-edit').val();
  const due_date = $('#due_date-edit').val();

  $.ajax({
    method: 'PUT',
    url: `${baseUrl}/todos/${id}`,
    headers: { access_token: localStorage.access_token },
    data: { title, description, due_date }
  })
    .done(response => {
      $('#title-edit').val('');
      $('#description-edit').val('');
      $('#due_date-edit').val('');

      getTodoList();
      editCancel()
    })
    .fail(err => {
      console.log(err);

      // ALERT: Error
      swal("Whoopsy!", `${err.responseJSON.message}`, "error");

    });
};

const editCancel = _ => {
  $('#edit-task-expanded').hide();
  $('#add-task-minimized').fadeIn();
};

const markTask = (id, status) => {
  $.ajax({
    method: 'PATCH',
    url: `${baseUrl}/todos/${id}`,
    headers: { access_token: localStorage.access_token },
    data: { status }
  })
    .done(response => {
      getTodoList();
    })
    .fail(err => {
      console.log(err);

      // ALERT: Error
      swal("Whoopsy!", `${err.responseJSON.message}`, "error");

    });
};

const deleteTask = param => {
  $.ajax({
    method: 'DELETE',
    url: `${baseUrl}/todos/${param}`,
    headers: { access_token: localStorage.access_token }
  })
    .done(response => {
      console.log(response);
      getTodoList();
      swal("Success", `${response.message}`, "success");
    })
    .fail(err => {
      console.log(err);

      //ALERT: Error
      swal("Whoopsy!", `${err.responseJSON.message}`, "error");

    });
};

const getAniQuote = _ => {
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/animequote`,
    headers: { access_token: localStorage.access_token }
  })
    .done(response => {
      console.log(response);
      $('#aniQuote').empty();
      $('#aniQuote').append(
        `
        <div class="wrap-quote100" style="margin-top: 40px; margin-left: 40px; margin-right: 40px;">
          <form class="form" style="padding-top: 16px; padding-bottom: 16px;">
            <h6 class="add-task" style="margin:12px 32px; text-align: center; font-weight: 600;">
              "${response.quote}"
            </h6>
            <p class="txt1" style="text-align: center; margin-bottom: 8px;">${response.character} @ ${response.anime}</p>
          </form>
        </div>
        `
      )
    })
    .fail(err => {
      console.log(err);
    })
};

// GOOGLE AUTH

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/glogin`,
    data: { id_token }
  })
    .done(response => {
      localStorage.setItem('access_token', response.access_token);

      dashboardPage();
    })
    .fail((xhr, status) => {
      //ALERT: Error
      swal("Whoopsy!", `Sign in failed`, "error");

    });
};
