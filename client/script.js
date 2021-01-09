// https://fancytodo-unitedfox.web.app/#
const baseUrl = 'http://localhost:3000';
let todoList = [];

function checkAuth() {
  if (localStorage.access_token) {

    $('#login-page').hide();
    getTodoList();
    $('#register-page').hide();
    $('#todo-list').show();
    $('#logout-btn').show();
    $('#updateTodo').hide();
    $('#createTodo').show();



  } else {

    $('#login-page').show();
    $('#register-page').hide();
    $('#todo-list').hide();
    $('#logout-btn').hide();
    $('#updateTodo').hide();
    $('#createTodo').hide();


  }
}

function getTodoList() {
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos`,
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(response => {
      // console.log(response);
      // DOM Manipulate
      todoList = response.map(todo => {
        return {
          id: todo.id,
          UserId: todo.UserId,
          title: todo.title,
          description: todo.description,
          status: todo.status,
          due_date: new Date(todo.due_date).toISOString().split('T')[0]
        }
      });
      $('#todo-list').empty();
      todoList.forEach(todo => {
        $('#todo-list').append(
          `<div class="card"  id="todo-${todo.id}">
            <div class="card-header">
              ${todo.due_date}
            </div>
          <div class="card-body">
            <h5 class="card-title">${todo.title}</h5>
            <p class="card-text">${todo.description}</p>
            
            <div class="form-check" style="float: right;">
            <input class="form-check-input" type="checkbox" value="" ${(todo.status) ? 'checked' : ''} id="status">
            <label class="form-check-label" for="status">
              Todo done
            </label>
          </div>
            
            <a href="#" class="btn btn-primary" onclick="getOneTodo(${todo.id})">Update</a>    
            <a href="#" class="btn btn-primary" onclick="getOneTodo(${todo.id})">Update</a> 
            <a class="btn btn-danger" onclick="getOneTodoDelete(${todo.id})">Delete</a> 
            
        </div>
      </div>`
        )

      });

    })
    .fail(err => {
      console.log(err);
    })
    .always(() => {
      console.log('ALWAYS getTodoList');
    })

}

function getOneTodo(id) {
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(response => {
      $("#updateStatus").checked = false;  

      $('#updateTitle').val(response.title);
      $('#updateDueDate').val(new Date(response.due_date).toISOString().split('T')[0]);
      $('#updateDescription').val(response.description);
      $('#update-btn').data('id', id);
      $('#delete-btn').data('id', id);

      if (!response.status) {
        $("#updateStatus").prop( "checked", false );
      } else {
        $("#updateStatus").prop( "checked", true );
      }
      $('#updateTodo').show();
      $(`#todo-${id}`).hide()
      $(`#createTodo`).hide()
    })
    .fail(err => {
      console.log(err);
    })
    .always(() => {
      console.log('ALWAYS One Todo');
    })
}

function getOneTodoDelete(id) {
  $.ajax({
    method: 'DELETE',
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_token: localStorage.access_token
    }
  })
    .done(response => {
      // $(`#todo-${id}`).hide()
      getTodoList();
      console.log(response, 'DELETE SUCCESS');
    })
    .fail(err => {
      console.log(err);
    })
    .always(() => {
      console.log('ALWAYS One Todo');
    })
}

$(document).ready(function () {
  console.log('<><><><><><><> Reload Page <><><><><><><>');
  checkAuth();

  $('#registerHere-btn').click(function (event) {
    event.preventDefault()
    $('#login-page').hide();
    $('#register-page').show();
    $('#todo-list').hide();

  })

  $('#loginHere-btn').click(function (event) {
    event.preventDefault()
    $('#login-page').show();
    $('#register-page').hide();
    $('#todo-list').hide();
  })

  $('#logout-btn').click(function () {
    localStorage.clear();
    checkAuth();
  })


  $('#login-btn').click(function (event) {
    event.preventDefault()

    const email = $('#email').val()
    const password = $('#password').val()

    $.ajax({
      method: 'POST',
      url: `${baseUrl}/login`,
      data: { email, password }
    })
      .done(response => {
        console.log(response, 'RESPONSE CLIENT!!!!');
        // save token to localStorage
        // localStorage.setItem('access_token', response.access_token)
        localStorage.access_token = response.access_token;
        checkAuth();
      })
      .fail(err => {
        console.log(err, 'ERROR CLIENT');
        console.log(err.responseJSON);
      })
      .always(() => {
        console.log('ALWAYS');
        $('#email').val('');
        $('#password').val('');
      })

  })

  $('#register-btn').click(function (event) {
    event.preventDefault()
    const email = $('#emailRegister').val()
    const password = $('#passwordRegister').val()

    $.ajax({
      method: 'POST',
      url: `${baseUrl}/register`,
      data: { email, password }
    })
      .done(response => {
        console.log(response);
        checkAuth();
      })
      .fail(err => {
        console.log(err);
      })
      .always(() => {
        console.log('ALWAYS');
        $('#emailRegister').val('');
        $('#passwordRegister').val('');
      })
  })


  $('#create-btn').click(function (event) {
    event.preventDefault()
    const due_date = $('#createDueDate').val();
    const title = $('#createTitle').val();
    const description = $('#createDescription').val();

    $.ajax({
      method: 'POST',
      url: `${baseUrl}/todos`,
      data: { due_date, title, description, status },
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
      })
      .always(() => {
        console.log('ALWAYS Create');
        $('#createDueDate').val('');
        $('#createTitle').val('');
        $('#createDescription').val('');
      })
    
  })

  $('#update-btn').click(function (event) {
    event.preventDefault();
    const todoId = $('#update-btn').data('id');
    const due_date = $('#updateDueDate').val();
    const title = $('#updateTitle').val();
    const description = $('#updateDescription').val();
    const status = $('#updateStatus').is(":checked");

    $.ajax({
      method: 'PUT',
      url: `${baseUrl}/todos/${todoId}`,
      headers: {
        access_token: localStorage.access_token
      },
      data: {
        due_date,
        title,
        description,
        status
      }
    })
      .done(response => {
        console.log(response);
        getTodoList();
        $(`#createTodo`).show();
        $('#updateTodo').hide();
        $('#updateDueDate').val('');
        $('#updateTitle').val('');
        $('#updateDescription').val('');
      })
      .fail(err => {
        console.log(err, 'ERR');
      })
      .always(() => {
        console.log('ALWAYS setelah update');
      })
  })

  
  // $('#delete-btn').click(function (event) {
  //   event.preventDefault();
  //   const todoId = $('#delete-btn').data('id');
  //   const due_date = $('#createDueDate').val();
  //   const title = $('#createTitle').val();
  //   const description = $('#createDescription').val();
  //   console.log(todoId, 'DELETE===========');
  //   // $.ajax({
  //   //   method: 'POST',
  //   //   url: `${baseUrl}/todos`,
  //   //   data: { due_date, title, description, status },
  //   //   headers: {
  //   //     access_token: localStorage.access_token
  //   //   }
  //   // })
  //   //   .done(response => {
  //   //     console.log(response);
  //   //     getTodoList();
  //   //   })
  //   //   .fail(err => {
  //   //     console.log(err);
  //   //   })
  //   //   .always(() => {
  //   //     console.log('ALWAYS Create');
  //   //     $('#createDueDate').val('');
  //   //     $('#createTitle').val('');
  //   //     $('#createDescription').val('');
  //   //   })
    
  // })


  $('#cancelUpdate-btn').click(function () {
    $('#updateDueDate').val('');
    $('#updateTitle').val('');
    $('#updateDescription').val('');
    $("#updateStatus").removeAttr("checked");
    checkAuth()
    getTodoList();
  })

})



