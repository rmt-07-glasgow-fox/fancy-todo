const baseUrl = 'http://localhost:3000';

function initContent() {
  $('#landing-page').hide();
  $('#dashboard-page').hide()
  $('#login-form').hide();
  $('#register-form').hide();
};

function beforeLogin() {
  $('#dashboard-page').hide();
  $('#landing-page').show();
};

function afterLogin() {
  $('#login-form').hide();
  $('#register-form').hide();
  $('#landing-page').hide();
  $('#dashboard-page').show();
  $('#add-task-minimized').show();
  $('#add-task-expanded').hide();
  $('#edit-task-expanded').hide();
};

function loginForm() {
  $('#login-form').show();
  $('#register-form').hide();
};

function registerForm() {
  $('#register-form').show();
  $('#login-form').hide();
};

function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/getuser`,
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(response => {
      // console.log(response); // For Debugging
      $('#dropdownMenuButton').empty();
      $('#user-name-email').empty();
      $('#dropdownMenuButton').append(
        `
        <img src="/images/img_profPic.png" class="profPic m-l-24 hov1" alt="logo">
        `
      )
      $('#user-name-email').append(`
      <h6 class="dropdown-header txt2" style="font-size: 1em;">${response.name}</h6>
      <h6 class="dropdown-header txt1" style="font-size: .7rem; margin-top: -8px;">${response.email}</h6>
  `)
    });
};

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: 'POST',
    url: `${baseUrl}/glogin`,
    data: { id_token }
  })
    .done(response => {
      // console.log(response.access_token) // For Debugging
      localStorage.setItem('access_token', response.access_token);

      afterLogin();
    })
    .fail((xhr, status) => {
    });
};

function deleteTask(param) {
  $.ajax({
    method: 'DELETE',
    url: `${baseUrl}/todos/${param}`,
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(response => {
      console.log(response);
      getTodoList();
    })
    .fail(err => {
      console.log(err);
    });
};

function editCancel(e) {
  // e.preventDefault();
  $('#edit-task-expanded').hide();
  $('#add-task-minimized').fadeIn();
}

// $('#edit-task-cancel').click(function (e) {
//   e.preventDefault();

// });

function marking(id, status) {

  console.log(id, status)
  $.ajax({
    method: 'PATCH',
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.access_token
    },
    data: { status }
  })
    .done(response => {
      getTodoList();
    })
    .fail(err => {
      console.log(err);
    })
};

function getTodoList() {
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(response => {
      console.log(response);
      $('#todo-field').empty();
      for (let i = 0; i < response.length; i++) {
        $('#todo-field').append(
          `
          <!-- card-todo -->
          <div id="card-todo">
            <div class="wrap-todo-card100 m-t-40 p-t-12 p-b-12">
              <h6 class="m-t-12 m-r-24 m-b-12 m-l-24 todo-title" style="color: #1E1E1E; font-weight: 600;">${response[i].title}</h6>

              <p class="m-t-12 m-r-24 m-b-12 m-l-24 todo-description" style="color: #1E1E1E; font-weight: 400;">
                ${response[i].description}</p>

              <hr style="margin:0" />

              <p class="m-l-24 m-t-12" style="color:#1E1E1E; font-weight:600;" > Due ${response[i].due_date.split('T')[0]} </p>

              <div id="markAsDone">
                <form>
                  <input id="done-button" class="m-t-12 m-r-24 m-b-12 m-l-24" type="checkbox" onclick="marking(${response[i].id}, ${!response[i].status})" ${response[i].status ? 'checked' : ''} >
                  <label style="margin-left:-18px ;font-weight: 600;">Done</label>
                </form>
                <span class="m-l-24" style="font-size: 0.5rem;">
                  <i onclick="editTask(${response[i].id})" class="fas fa-pen-square fa-3x add-task-bot"></i>
                  <i onclick="deleteTask(${response[i].id})" class="fas fa-trash-alt fa-3x m-l-16 add-task-bot"></i>

                </span>
              </div>
            </div>
          </div>
          <!-- card-todo// -->
      `
        );

        //   if (response[i].status === true) {
        //     $('#todo-field').append(
        //       `
        //     <!-- card-todo -->
        //     <div id="card-todo">
        //       <div class="wrap-todo-card100 m-t-40 p-t-12 p-b-12">
        //         <h6 class="m-t-12 m-r-24 m-b-12 m-l-24 todo-title" style="color: #1E1E1E; font-weight: 600;">${response[i].title}</h6>

        //         <p class="m-t-12 m-r-24 m-b-12 m-l-24 todo-description" style="color: #1E1E1E; font-weight: 400;">
        //           ${response[i].description}</p>

        //         <hr style="margin:0" />

        //         <p class="m-l-24 m-t-12" style="color:#1E1E1E; font-weight:600;" > Due ${response[i].due_date.split('T')[0]} </p>

        //         <div id="marking">
        //           <form>
        //             <input id="done-button" class="m-t-12 m-r-24 m-b-12 m-l-24" type="checkbox" checked >
        //             <label style="margin-left:-18px ;font-weight: 600;">Done</label>
        //           </form>
        //           <span class="m-l-24" style="font-size: 0.5rem;">
        //             <i onclick="editTask(${response[i].id})" class="fas fa-pen-square fa-3x add-task-bot"></i>
        //             <i onclick="deleteTask(${response[i].id})" class="fas fa-trash-alt fa-3x m-l-16 add-task-bot"></i>

        //           </span>
        //         </div>
        //       </div>
        //     </div>
        //     <!-- card-todo// -->
        // `
        //     );
        //   } else {
        //     $('#todo-field').append(
        //       `
        //     <!-- card-todo -->
        //     <div id="card-todo">
        //       <div class="wrap-todo-card100 m-t-40 p-t-12 p-b-12">
        //         <h6 class="m-t-12 m-r-24 m-b-12 m-l-24 todo-title" style="color: #1E1E1E; font-weight: 600;">${response[i].title}</h6>

        //         <p class="m-t-12 m-r-24 m-b-12 m-l-24 todo-description" style="color: #1E1E1E; font-weight: 400;">
        //           ${response[i].description}</p>

        //         <hr style="margin:0" />

        //         <p class="m-l-24 m-t-12" style="color:#1E1E1E; font-weight:600;" > Due ${response[i].due_date.split('T')[0]} </p>

        //         <div id="marking">
        //           <form>
        //             <input id="done-button" class="m-t-12 m-r-24 m-b-12 m-l-24" type="checkbox" >
        //             <label style="margin-left:-18px ;font-weight: 600;">Done</label>
        //           </form>
        //           <span class="m-l-24" style="font-size: 0.5rem;">
        //             <i onclick="editTask(${response[i].id})" class="fas fa-pen-square fa-3x add-task-bot"></i>
        //             <i onclick="deleteTask(${response[i].id})" class="fas fa-trash-alt fa-3x m-l-16 add-task-bot"></i>

        //           </span>
        //         </div>
        //       </div>
        //     </div>
        //     <!-- card-todo// -->
        // `
        //     );
        //   }
      };
    })
    .fail(err => {
      console.log(err);
    });
};


function editSuccess(param) {
  $('#todoForm-edit').submit(function (e) {


    e.preventDefault();
    const title = $('#title-edit').val()
    const description = $('#description-edit').val()
    const due_date = $('#due_date-edit').val()

    console.log(title, description, due_date);

    $.ajax({
      method: 'PUT',
      url: `${baseUrl}/todos/${param}`,
      headers: {
        access_token: localStorage.access_token
      },
      data: { title, description, due_date }
    })
      .done(response => {
        getTodoList();
      })
      .fail(err => {
        console.log(err);
      })
  })

  $('#edit-task-expanded').hide();
  $('#add-task-minimized').fadeIn();
}

function editTask(param) {
  $('#add-task-minimized').hide();
  $('#add-task-expanded').hide();
  $('#edit-task-expanded').fadeIn();

  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos/${param}`,
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(response => {
      console.log(response);

      $('#edit-task-expanded').empty();

      $('#edit-task-expanded').append(
        `
      <div class="wrap-edit-task100 m-t-40 m-l-40 m-r-40">
      <div id="todoForm-edit">
        <form class="form p-t-16 p-b-16">
          <input id="title-edit" class="edit-task m-t-12 m-l-32 m-r-32 m-b-12" style="font-weight: 600;"
            type="text" value="${response.title}">

          <hr style="margin:0" />

          <input id="description-edit" class="edit-task text-box m-t-12 m-r-32 m-l-32" type="text"
            value="${response.description}">

          <input id="due_date-edit" class="edit-task m-l-32 m-t-24" style="width:160px;" type="date" value="${response.due_date.split('T')[0]}">

          <div id="edit-task-button" class="m-l-28 m-t-24 m-b-18">

            <span style="font-size: 0.5rem;">
              <i id="edit-task-cancel" onclick="editCancel()" class="fas fa-times-circle fa-3x add-task-cancel"></i>
              <button type="submit" onclick="editSuccess(${response.id})"  class="fa-3x m-l-32 add-task-submit">
                <i class="fa fa-check-circle"></i>
              </button>
            </span>
            <!-- <input id="add-task-submit" class="btn btn-dark btn-add-task text-up" style="font-size: 100% ;letter-spacing: 2px;font-weight: 600;" type="submit" value="Submit"> -->
          </div>
        </form>
      </div>
    </div>
      `
      );

    })
    .fail(err => {
      console.log(err);
    });
};

$(document).ready(function () {
  initContent();




  $('#to-login').click(function (e) {
    e.preventDefault();
    loginForm();
  });

  $('#to-register').click(function (e) {
    e.preventDefault();
    registerForm();
  });

  if (!localStorage.getItem('access_token')) {
    beforeLogin();
    loginForm();
  } else {
    afterLogin();
    getUserInfo();
    getTodoList();
  };

  $('#login-form').submit(function (e) {
    e.preventDefault();
    const email = $('#email-login').val();
    const password = $('#password-login').val();

    // console.log(email, password); // For Debugging

    // TO DO: CONNECT TO AJAX

    $.ajax({
      method: 'POST',
      url: `${baseUrl}/login`,
      data: { email, password }
    })
      .done(response => {
        $('#email-login').val('');
        $('#password-login').val('');
        console.log(response.access_token);

        localStorage.setItem('access_token', response.access_token);
        afterLogin();
      })
      .fail(err => {
        console.log(err);
      });
  });

  $('#register-form').submit(function (e) {
    e.preventDefault();
    const name = $('#name-register').val();
    const email = $('#email-register').val();
    const password = $('#password-register').val();

    // console.log(name, email, password); // For Debugging

    // TO DO: CONNECT TO AJAX

    $.ajax({
      method: 'POST',
      url: `${baseUrl}/register`,
      data: { name, email, password }
    })
      .done(response => {
        $('#name-register').val('');
        $('#email-register').val('');
        $('#password-register').val('');

        // Alert

        loginForm();
      })
      .fail(err => {
        console.log(err);
      });
  });

  $("#logout-btn").click(function (e) {
    e.preventDefault();
    localStorage.clear();
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('Session over');
    });
    beforeLogin();
    loginForm();
  });

  $('#add-task-minimized').click(function (e) {
    e.preventDefault();
    $('#add-task-minimized').hide();
    $('#add-task-expanded').fadeIn();
  });

  $('#add-task-cancel').click(function (e) {
    e.preventDefault();
    $('#add-task-expanded').hide();
    $('#add-task-minimized').fadeIn();
  });



  $('#todoForm').submit(function (e) {
    e.preventDefault()
    const title = $('#title').val();
    const description = $('#description').val();
    const due_date = $('#due_date').val();

    console.log(title, description, due_date); // For Debugging

    // TO DO: CONNECT TO AJAX

    $.ajax({
      method: 'POST',
      url: `${baseUrl}/todos`,
      data: { title, description, status: false, due_date },
      headers: {
        access_token: localStorage.access_token
      }
    })
      .done(response => {
        $('#title').val('');
        $('#description').val('');
        $('#due_date').val('');
        getTodoList();
        $('#add-task-expanded').fadeOut();
        $('#add-task-minimized').fadeIn();
      })
      .fail(err => {
        console.log(err);
      });
  });
});