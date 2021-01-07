const baseUrl = 'http://localhost:3000';
let todoList;
let headlineNews;

// fungsi ini berjalan setelah berhasil login
const getTodoList = () => {
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos`,
    headers: {
      access_key: localStorage.access_token,
    },
  })
    .done((response) => {
      console.log(response, 'ini response');
      console.log(response.todoList);
      console.log(response.topNews);
      // manipulasi dom

      todoList = response.todoList.map;
    })
    .fail((err) => {
      console.log(err, 'ini err');
    })
    .always(() => {
      console.log('always');
    });
};

const checkAuth = () => {
  if (localStorage.access_token) {
    $('#registration-page').hide();
    $('#login-page').hide();
    getTodoList();
    $('#todo-list').show();
    $('#todo-update').hide();
    $('#add-todo').hide();
    $('#logout-btn').show();
  } else {
    $('#registration-page').hide();
    $('#login-page').show();
    $('#todo-list').hide();
    $('#todo-update').hide();
    $('#add-todo').hide();
    $('#logout-btn').hide();
  }
};

$(document).ready(() => {
  console.log('page reloaded');
  checkAuth();
});

$('#login-btn').click((event) => {
  event.preventDefault();
  const email = $('#email').val();
  const password = $('#password').val();

  console.log(email, password);

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/login`,
    data: {
      email,
      password,
    },
  })
    .done((response) => {
      localStorage.access_token = response.access_token;
      checkAuth();
    })
    .fail((err) => {
      console.log(err);
    })
    .always(() => {
      console.log('always');
      $('#email').val('');
      $('#password').val('');
    });
});

$('#logout-btn').click(() => {
  localStorage.clear();
  checkAuth();
});
