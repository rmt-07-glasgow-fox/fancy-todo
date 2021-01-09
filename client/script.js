const url = 'http://localhost:3000';

$(document).ready(() => {
  loginPage();

  quote();

  $('#passwordInput a').on('click', function (event) {
    event.preventDefault();
    if ($('#passwordInput input').attr('type') == 'text') {
      $('#passwordInput input').attr('type', 'password');
      $('#passwordInput i').addClass('fa-eye-slash');
      $('#passwordInput i').removeClass('fa-eye');
    } else if ($('#passwordInput input').attr('type') == 'password') {
      $('#passwordInput input').attr('type', 'text');
      $('#passwordInput i').removeClass('fa-eye-slash');
      $('#passwordInput i').addClass('fa-eye');
    }
  });

  $('#modalConfirmDelete').on('show.bs.modal', function (event) {
    const deleteid = $(event.relatedTarget).data('todoid');
    $('#btn-delete').click(function () {
      deleteTodo(deleteid);
      $('#modalConfirmDelete').modal('hide');
    });
  });

  $('#modalConfirmDeleteProject').on('show.bs.modal', function (event) {
    const projectid = $(event.relatedTarget).data('projectid');
    $('#btn-delete-project').click(function () {
      deleteProject(projectid);
      $('#modalConfirmDeleteProject').modal('hide');
    });
  });
});

const loginPage = () => {
  if (localStorage.getItem('accessToken')) {
    dashboardPage();
  } else {
    $(document).attr('title', 'Login | Fancy Todo');
    $('#auth').show();
    $('#navbar').hide();
    $('#register').hide();
    $('#login').show();
    $('#dashboard').hide();
  }
};

const registerPage = () => {
  if (localStorage.getItem('accessToken')) {
    dashboardPage();
  } else {
    $(document).attr('title', 'Register | Fancy Todo');
    $('#register').show();
    $('#login').hide();
  }
};

const dashboardPage = () => {
  if (!localStorage.getItem('accessToken')) {
    loginPage();
  } else {
    $('#auth').hide();
    $('#navbar').show();
    $('#dashboard').show();
    todosPage();
  }
};

const todosPage = () => {
  if (!localStorage.getItem('accessToken')) {
    loginPage();
  } else {
    $(document).attr('title', 'Dashboard | Todos');
    showTodo();
  }
};

const projectsPage = () => {
  if (!localStorage.getItem('accessToken')) {
    loginPage();
  } else {
    $(document).attr('title', 'Dashboard | Projects');
    showProjects();
  }
};

showTodo = () => {
  $('#todos').show();
  $('#todoForm').hide();
  $('#hello').text('Hi, ' + localStorage.getItem('fullName'));
  $('#navbarDropdown').text(localStorage.getItem('fullName'));
  listTodo();
  listHolidays();
  $('#editFormTodo').hide();
  month();
  $('#projects').hide();
};

showProjects = () => {
  $('#todos').hide();
  $('#projects').show();
  hideProjectContent();
  hideProjectForm();
  hideProjectTodoForm();
  listProject();
};

const showTodoForm = () => {
  $('#todoForm').show();
};

const hideTodoForm = () => {
  $('#todoForm').hide();
};

showProjectContent = (id) => {
  $('#projectContent').show();
  $('#pProjectIdTodo').val(id);
  listProjectTodo(id);
};

hideProjectContent = () => {
  $('#projectContent').hide();
};

const showProjectForm = () => {
  $('#projectForm').show();
};

const hideProjectForm = () => {
  $('#projectForm').hide();
};

const showProjectTodoForm = () => {
  $('#projectTodoForm').show();
};

const hideProjectTodoForm = () => {
  $('#projectTodoForm').hide();
};

const showEditTodo = (id) => {
  $.ajax({
    url: url + `/todos/${id}`,
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  })
    .done((response) => {
      $(`#todoCardBody-${id}`).hide();
      $(`#editFormTodo-${id}`).empty();

      $(`
      <form onsubmit="editTodo(event, ${id})">
        <div class="row m-2">
          <div class="col">
            <input type="text" class="form-control title" placeholder="Title" id="titleEdit" value="${
              response.title
            }">
          </div>
          <div class="col">
            <input type="date" class="form-control due_date" placeholder="due date" id="dueDateEdit" value="${moment(
              response.due_date
            ).format('YYYY-MM-DD')}">
          </div>
        </div>
        <div class="form-group mr-4 ml-4">
          <textarea class="form-control description" id="descriptionEdit" rows="3" placeholder="Description Here....">${
            response.description
          }</textarea>
        </div>
        <div class="float-right mr-4 mb-1">
              <button type="submit" class="btn btn-primary" style="width: 100px">Edit</button>
              <button type="button" onclick="hideEditTodo(${id})" class="btn btn-danger" style="width: 100px">Cancel</button>
            
        <div>
      </form>
      `).appendTo(`#editFormTodo-${id}`);
    })
    .fail((err) => {
      err.responseJSON.map((e) => {
        const template = alertTemplate('error', e.message);
        $(template).appendTo('#alert');
      });
    })
    .always(() => {});
};

const hideEditTodo = (id) => {
  $(`#editFormTodo-${id}`).empty();
  $(`#todoCardBody-${id}`).show();
};

const addTodo = (e, idProject) => {
  e.preventDefault();

  let title, due_date, description, status, ProjectId;

  if (idProject === 0) {
    title = $('#titleTodo').val();
    due_date = $('#dateTodo').val();
    description = $('#descriptionTodo').val();
    status = false;
  } else {
    title = $('#pTitleTodo').val();
    due_date = $('#pDateTodo').val();
    description = $('#pDescriptionTodo').val();
    status = false;
    ProjectId = $('#pProjectIdTodo').val();
  }

  $.ajax({
    url: url + '/todos',
    method: 'POST',
    data: {
      title: title,
      due_date: due_date,
      description: description,
      status: status,
      ProjectId: ProjectId,
    },
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  })
    .done((response) => {
      const template = alertTemplate('success', 'Your Todo has been added');
      $(template).appendTo('#alert');
      if (idProject === 0) {
        listTodo();
      } else {
        listProjectTodo(ProjectId);
      }
    })
    .fail((err) => {
      err.responseJSON.map((e) => {
        const template = alertTemplate('error', e.message);
        $(template).appendTo('#alert');
      });
    })
    .always(() => {
      $('#titleTodo').val('');
      $('#dateTodo').val('');
      $('#descriptionTodo').val('');
      hideTodoForm();
    });
};

const listTodo = () => {
  $.ajax({
    url: url + '/todos',
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  })
    .done((response) => {
      $('#todoList').empty();
      response.map((data) => {
        $(`
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <div class="input-group-text">
                <input type="checkbox" id="status-${
                  data.id
                }" onclick="changeStatusTodo(${data.id}, ${!data.status})" ${
          data.status ? 'checked' : ''
        }>
            </div>
          </div>
          <div class="card" style="width: 40rem">
            <div class="card-body" id="todoCardBody-${data.id}">
              <div id="todoCardValue-${data.id}">
                  <h5 class="card-title">${data.title}</h5>
                  <h6 class="card-subtitle mb-2 text-muted"><i class="fa fa-calendar" aria-hidden="true"></i> ${moment(
                    data.due_date
                  ).format('DD MMMM YYYY')}</h6>
                  <p class="card-text">${data.description}</p>
                  <a href="#" onclick="showEditTodo(${
                    data.id
                  })" class="card-link" id="editTodo"><i class="fa fa-edit" aria-hidden="true"></i> Edit</a>
                  <a href="#" data-todoid="${
                    data.id
                  }" data-toggle="modal" data-target="#modalConfirmDelete" class="card-link text-red" id="deleteTodo"><i class="fa fa-trash" aria-hidden="true"></i> Hapus</a>
              </div>
            </div>
            <div id="editFormTodo-${data.id}"></div>
          </div>
        </div>
        `).appendTo('#todoList');
      });
    })
    .fail((err) => {
      err.responseJSON.map((e) => {
        const template = alertTemplate('error', e.message);
        $(template).appendTo('#alert');
      });
    })
    .always(() => {});
};

const listProjectTodo = (id) => {
  $.ajax({
    url: url + '/todos/project/' + id,
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  })
    .done((response) => {
      $('#projectTodoList').empty();
      response.map((data) => {
        $(`
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <div class="input-group-text">
                <input type="checkbox" id="status-${
                  data.id
                }" onclick="changeStatusTodo(${data.id}, ${!data.status})" ${
          data.status ? 'checked' : ''
        }>
            </div>
          </div>
          <div class="card" style="width: 40rem">
            <div class="card-body" id="todoCardBody-${data.id}">
              <div id="todoCardValue-${data.id}">
                  <h5 class="card-title">${data.title}</h5>
                  <h6 class="card-subtitle mb-2 text-muted"><i class="fa fa-calendar" aria-hidden="true"></i> ${moment(
                    data.due_date
                  ).format('DD MMMM YYYY')}</h6>
                  <p class="card-text">${data.description}</p>
                  
              </div>
            </div>
            <div id="editFormTodo-${data.id}"></div>
          </div>
        </div>
        `).appendTo('#projectTodoList');
      });
    })
    .fail((err) => {
      err.responseJSON.map((e) => {
        const template = alertTemplate('error', e.message);
        $(template).appendTo('#alert');
      });
    })
    .always(() => {});
};

const editTodo = (e, id) => {
  e.preventDefault();

  const title = $('#titleEdit').val();
  const due_date = $('#dueDateEdit').val();
  const description = $('#descriptionEdit').val();

  $.ajax({
    url: url + `/todos/${id}`,
    method: 'PUT',
    data: {
      title: title,
      due_date: due_date,
      description: description,
    },
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  })
    .done((response) => {
      const template = alertTemplate('success', 'Your Todo has been updated');
      $(template).appendTo('#alert');
      listTodo();
    })
    .fail((err) => {
      err.responseJSON.map((e) => {
        const template = alertTemplate('error', e.message);
        $(template).appendTo('#alert');
      });
    })
    .always(() => {
      $('#titleEdit').val('');
      $('#dueDateEdit').val('');
      $('#descriptionEdit').val('');
      hideEditTodo(id);
    });
};

const changeStatusTodo = (id, value) => {
  $.ajax({
    url: url + `/todos/${id}`,
    method: 'PATCH',
    data: {
      status: value,
    },
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  })
    .done((response) => {
      const template = alertTemplate(
        'success',
        'Your status Todo has been updated'
      );
      $(template).appendTo('#alert');
      listTodo();
    })
    .fail((err) => {
      err.responseJSON.map((e) => {
        const template = alertTemplate('error', e.message);
        $(template).appendTo('#alert');
      });
    })
    .always(() => {});
};

const deleteTodo = (id) => {
  $.ajax({
    method: 'DELETE',
    url: url + `/todos/${id}`,
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  })
    .done((response) => {
      const template = alertTemplate('success', 'Your Todo has been deleted');
      $(template).appendTo('#alert');
      listTodo();
    })
    .fail((err) => {
      err.responseJSON.map((e) => {
        const template = alertTemplate('error', e.message);
        $(template).appendTo('#alert');
      });
    });
};

const addProject = (e) => {
  e.preventDefault();

  const name = $('#nameProject').val();
  const status = false;

  $.ajax({
    url: url + '/projects',
    method: 'POST',
    data: {
      name: name,
      status: status,
    },
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  })
    .done((response) => {
      const template = alertTemplate('success', 'Project has been created');
      $(template).appendTo('#alert');
      listProject();
    })
    .fail((err) => {
      err.responseJSON.map((e) => {
        const template = alertTemplate('error', e.message);
        $(template).appendTo('#alert');
      });
    })
    .always(() => {
      $('#nameProject').val('');
      hideProjectForm();
    });
};

const listProject = () => {
  $.ajax({
    url: url + '/projectusers/projects',
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  })
    .done((response) => {
      $('#projectList').empty();
      response.map((data, index) => {
        $(`
        <tr>
          <th scope='row'>${index + 1}</th>
          <td>${data.Project.name}</td>
          <td>
            <button
            class="btn btn-primary"
            onclick="showProjectContent(${data.id})"
            >
              <i class="fa fa-eye"></i>
            </button>
            ${
              data.UserId === data.Project.CreatorId
                ? `<button
            class="btn btn-danger"
            data-projectid="${data.ProjectId}" data-toggle="modal" data-target="#modalConfirmDeleteProject"
            >
              <i class="fa fa-trash"></i>
            </button>`
                : ''
            }
          </td>
        </tr>
        `).appendTo('#projectList');
      });
    })
    .fail((err) => {
      err.responseJSON.map((e) => {
        const template = alertTemplate('error', e.message);
        $(template).appendTo('#alert');
      });
    })
    .always(() => {});
};

const deleteProject = (id) => {
  $.ajax({
    method: 'DELETE',
    url: url + `/projects/${id}`,
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  })
    .done((response) => {
      const template = alertTemplate(
        'success',
        'Your Project has been deleted'
      );
      $(template).appendTo('#alert');
      listProject();
    })
    .fail((err) => {
      const template = alertTemplate('error', err.message);
      $(template).appendTo('#alert');
    });
};

const register = (e) => {
  e.preventDefault();
  const firstName = $('#firstNameRegister').val();
  const lastName = $('#lastNameRegister').val();
  const email = $('#emailRegister').val();
  const password = $('#passwordRegister').val();

  $.ajax({
    url: url + '/users/register',
    method: 'POST',
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    },
  })
    .done((response) => {
      const template = alertTemplate(
        'success',
        'Your account has been successfully created, you can login now'
      );
      $(template).appendTo('#alert');
    })
    .fail((err) => {
      err.responseJSON.map((e) => {
        const template = alertTemplate('error', e.message);
        $(template).appendTo('#alert');
      });
    })
    .always(() => {
      $('#emailLogin').val('');
      $('#passwordLogin').val('');
    });
};

const login = (e) => {
  e.preventDefault();
  const email = $('#emailLogin').val();
  const password = $('#passwordLogin').val();

  $.ajax({
    url: url + '/users/login',
    method: 'POST',
    data: {
      email: email,
      password: password,
    },
  })
    .done((response) => {
      const token = response.accessToken;
      localStorage.setItem('accessToken', token);
      localStorage.setItem(
        'fullName',
        `${response.firstName} ${response.lastName}`
      );
      dashboardPage();
    })
    .fail((err) => {
      const template = alertTemplate('error', err.responseJSON.error);
      $(template).appendTo('#alert');
    })
    .always(() => {
      $('#emailLogin').val('');
      $('#passwordLogin').val('');
    });
};

function onSignIn(googleUser) {
  const idToken = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: 'POST',
    url: `${url}/users/google`,
    data: { idToken },
  })
    .done((response) => {
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem(
        'fullName',
        `${response.firstName} ${response.lastName}`
      );
      dashboardPage();
    })
    .fail((xhr, status, error) => {
      const template = alertTemplate('error', status);
      $(template).appendTo('#alert');
    });
}

const logout = () => {
  localStorage.clear();

  logoutGoogle();
  loginPage();
};

const logoutGoogle = () => {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {});
};

const quote = () => {
  $.ajax({
    method: 'GET',
    url: url + '/quotes/qod',
  })
    .done((data) => {
      $('#quote').text(`"${data.content}"`);
      $('#author').text(`- ${data.author}`);
    })
    .fail((err) => {});
};

const listHolidays = () => {
  $.ajax({
    url: url + '/holidays/month',
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  })
    .done((response) => {
      $('#calendarList').empty();
      response.map((data) => {
        $(`
        <tr>
          <th scope='row'>${data.date.datetime.day}</th>
          <td>${data.name}</td>
        </tr>
        `).appendTo('#calendarList');
      });
    })
    .fail((err) => {
      err.responseJSON.map((e) => {
        const template = alertTemplate('error', e.message);
        $(template).appendTo('#alert');
      });
    })
    .always(() => {});
};

const alertTemplate = (type, message) => {
  if (type === 'error') {
    const template = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Error!</strong> ${message}.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  `;
    return template;
  } else if (type === 'success') {
    const template = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      <strong>Success!</strong> ${message}.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  `;
    return template;
  }
};

const month = () => {
  $('#holidaysMonth').text(`List holidays in ${moment().format('MMMM')}:`);
};

const clock = () => {
  $('#clock').html(moment().format('DD MMMM YYYY, HH:mm:ss'));
  $('#clock1').html(moment().format('DD MMMM YYYY, HH:mm:ss'));
};

setInterval(clock, 1000);
