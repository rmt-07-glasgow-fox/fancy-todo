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
  }
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
      <strong>Error!</strong> ${message}.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  `;
    return template;
  }
};
