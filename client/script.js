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
});

const loginPage = () => {
  if (localStorage.getItem('accessToken')) {
    dahsboardPage();
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
    dahsboardPage();
  } else {
    $(document).attr('title', 'Register | Fancy Todo');
    $('#register').show();
    $('#login').hide();
  }
};

const dahsboardPage = () => {
  if (!localStorage.getItem('accessToken')) {
    loginPage();
  } else {
    $(document).attr('title', 'Dashboard | Fancy Todo');
    $('#auth').hide();
    $('#navbar').show();
    $('#dashboard').show();
    $('#todoForm').hide();
    listTodo();
    month();
  }
};

showTodoForm = () => {
  $('#todoForm').show();
};

hideTodoForm = () => {
  $('#todoForm').hide();
};

addTodo = (e) => {
  e.preventDefault();

  const title = $('#titleTodo').val();
  const due_date = $('#dateTodo').val();
  const description = $('#descriptionTodo').val();
  const status = false;

  $.ajax({
    url: url + '/todos',
    method: 'POST',
    data: {
      title: title,
      due_date: due_date,
      description: description,
      status: status,
    },
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  })
    .done((response) => {
      const template = alertTemplate('success', 'Your Todo has been added');
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
                }" onclick="changeStatus(${data.id}, ${!data.status})" ${
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
                    <a href="#" onclick="editTodoForm(${
                      data.id
                    })" class="card-link" id="editTodo"><i class="fa fa-edit" aria-hidden="true"></i> Edit</a>
                    <a href="#" data-todoid="${
                      data.id
                    }" data-toggle="modal" data-target="#modalConfirmDelete" class="card-link text-red" id="deleteTodo"><i class="fa fa-trash" aria-hidden="true"></i> Hapus</a>
                </div>
              </div>
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
      dahsboardPage();
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

const logout = () => {
  localStorage.clear();

  loginPage();
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
    .fail((err) => {
      console.log(err);
    });
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
};

setInterval(clock, 1000);
