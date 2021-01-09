const baseUrl = 'http://localhost:3000';
let todoList;
let topNews;

$(document).ready(() => {
  console.log('page reloaded');
  checkAuth();
});

// ----------- PAGE LOADER FUNCTIONS --------------

const showRegisterPage = () => {
  $('#register-error').text('')
  $('#registration-page').show();
  $('#login-page').hide();
  $('#todo-list').hide();
  $('#add-todo').hide();
  $('#logout-btn').hide();
  $('#register-btn').hide()
  $('#add-todo-btn').hide()
  $('#todo-redirect-btn').show()
  $('#add-todo-card').hide()
  $('#edit-todo-card').hide()
}

const showLoginPage = () => {
  $('#error-login').text('')
  $('#email').val('');
  $('#password').val('');
  $('#registration-page').hide();
  $('#login-page').show();
  $('#todo-list').hide();
  $('#add-todo').hide();
  $('#logout-btn').hide();
  $('#register-btn').show()
  $('#add-todo-btn').hide()
  $('#todo-redirect-btn').show()
  $('#add-todo-card').hide()
  $('#edit-todo-card').hide()
}

const showTodoList = () => {
  $('#registration-page').hide();
  $('#login-page').hide();
  getTodoList();
  $('#todo-list').show();
  $('#add-todo').hide();
  $('#logout-btn').show();
  $('#register-btn').hide()
  $('#add-todo-btn').show()
  $('#todo-redirect-btn').show()
  $('#add-todo-card').hide()
  $('#edit-todo-card').hide()
}

const showAddTodoForm = () => {
  $('#registration-page').hide();
  $('#login-page').hide();
  $('#todo-list').hide();
  $('#add-todo-card').show();
  $('#logout-btn').show();
  $('#register-btn').hide()
  $('#add-todo-btn').hide()
  $('#todo-redirect-btn').show()
  $('#add-todo-card').show()
  $('#edit-todo-card').hide()
}

const showEditForm = () => {
  $('#registration-page').hide();
  $('#login-page').hide();
  $('#todo-list').hide();
  $('#add-todo-card').hide();
  $('#logout-btn').show();
  $('#register-btn').hide()
  $('#add-todo-btn').hide()
  $('#todo-redirect-btn').show()
  $('#add-todo-card').hide()
  $('#edit-todo-card').show()
}

const checkAuth = () => {
  if (localStorage.access_token) {
    showTodoList()
  } else {
    showLoginPage()
  }
};

//  --------------- EVENTS -----------------

// LOGIN BUTTON (ON LOGIN PAGE)

$('#login-btn').click((event) => {
  event.preventDefault();
  const email = $('#email').val();
  const password = $('#password').val();

  $.ajax({
    method: 'POST',
    url: `${baseUrl}/login`,
    data: { email, password },
  })
    .done((response) => {
      localStorage.access_token = response.access_token;
      $('#email').val('')
      $('password').val('')
      checkAuth();
    })
    .fail(xhr => {
      const err = xhr.responseJSON
      if (!err.message) {
        $('#error-login').text(err.join('<br>'))
      } else {
        $('#error-login').text(err.message)
      }
    })
    .always(() => {
      console.log('always');
      $('#email').val('');
      $('#password').val('');
    });
});

// LOGIN GOOGLE

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  
  $.ajax({
    method: 'POST',
    url: `${baseUrl}/loginGoogle`,
    data: {id_token}
  })
    .done(response => {
      localStorage.access_token = response.access_token;
      showTodoList()
    })
    .fail(err => {
      console.log(err)
      showLoginPage()
    })
}

//  LOG OUT BUTTON (ON TODOS PAGE)

$('#logout-btn').click(() => {
  localStorage.clear();
  const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  checkAuth();
});

// CANCEL REGISTER REDIRECT TO LOGIN
$('#login-redirect-btn').click(event => {
  event.preventDefault()
  showLoginPage()
})

// TODO LIST BUTTON 
$('#todo-redirect-btn').click(() => {
  checkAuth()
})

// REGISTER BUTTON (ON LOGIN PAGE)

$('#register-btn').click(() => {
  showRegisterPage()
})
$('cancel-register.btn').click(() =>{
  showLoginPage()
})

// CANCEL ADD BUTTON
$('#cancel-add-btn').click(event => {
  event.preventDefault()
  showTodoList()
})
$('#cancel-edit-btn').click(event => {
  event.preventDefault()
  showTodoList()
})

// REGISTER BUTTON (ON REGISTER PAGE)

$('#registerUser-btn').click((event) => {
  console.log('masuk register click event')
  event.preventDefault()
  const name = $('#register-name').val()
  const email = $('#register-email').val()
  const password = $('#register-password').val()
  console.log(name, email, password)

  $.ajax({
    method: "POST",
    url: `${baseUrl}/register`,
    data: { name, email, password }
  })
    .done((response) => {
      console.log(response)
      showLoginPage()
    })
    .fail(xhr => {
      const err = xhr.responseJSON
      if (!err.message) {
        $('#register-error').text(err)
      } else {
        $('#register-error').text(err.message)
      }
      console.log(err)
    })
    .always(() => {
      $('register-name').val('')
      $('register-email').val('')
      $('register-password').val('')
    });
})


// GET TODOS

const getTodoList = () => {
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos`,
    headers: {
      access_key: localStorage.access_token,
    },
  })
    .done((response) => {
      todoList = response.todoList
      $(`#sub-container-todolist`).empty()
     
      todoList.forEach(e => {
        let date = e.due_date.split('T')[0]
        if (e.status === true) {
          $(`#sub-container-todolist`).append(`
        <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${e.title}</h5>
          <p class="card-text">${e.description}</p>
          <p class="card-due-date">${date}</p>
          <div class="buttons">
          <button type="submit" class="btn btn-info" id="update-status" onclick="todoDone(${e.id}, false)" value="${e.status}">UNDONE</button>
          <button type="submit" class="btn btn-warning" id="delete-todo" onclick="deleteToDo(${e.id})">DELETE</button>
          <button type="submit" class="btn btn-success" id="update-todo" onclick="updateToDo(${e.id})">EDIT</button>
          </div>
        </div>
       </div>
        `)
        } else {
          $(`#sub-container-todolist`).append(`
        <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${e.title}</h5>
          <p class="card-text">${e.description}</p>
          <p class="card-due-date">${date}</p>
          <div class="buttons">
          <button type="submit" class="btn btn-info" id="update-status" onclick="todoDone(${e.id}, true)" value="${e.status}">DONE</button>
          <button type="submit" class="btn btn-warning" id="delete-todo" onclick="deleteToDo(${e.id})">DELETE</button>
          <button type="submit" class="btn btn-success" id="update-todo" onclick="updateToDo(${e.id})">EDIT</button>
          </div>
        </div>
       </div>
        `)
        }
      })

      topNews = response.topNews
      $('#sub-container-news').empty()

      topNews.forEach(e => {
        $('#sub-container-news').append(`
        <div class="card" style="width: 18rem;">
        <a class="news-link" href="${e.url}">
        <div class="card-body">
          <img class="news-image" src="${e.urlToImage}">
          <h5 class="news-title card-title">${e.title}</h5>
          <h6 class="news-source card-subtitle mb-2 text-muted">${e.source}</h6>
          <p class="card-text">${e.description}</p>
        </div>
        </a>
       </div>
        `)
      })
    })
    .fail((err) => {
      console.log(err, 'ini err');
      const errmessage = err.responseJSON.message
      alert(errmessage)
    })
    .always(() => {
      console.log('always');
    });
};

// ADD TODO
$('#add-todo-btn').click(() => {
  showAddTodoForm()
})

$('#add-new-todo-btn').click((event) => {
  event.preventDefault()
  $.ajax({
    method: 'POST',
    url: `${baseUrl}/todos`,
    headers: {
      access_key: localStorage.access_token
    },
    data: {
      title: $('#add-title').val(),
      description: $('#add-description').val(),
      due_date: $('#add-due-date').val()
    }
  })
    .done(response => {
      showTodoList()
    })
    .fail(xhr => {
      const err = xhr.responseJSON
      if (!err.message) {
        $('#add-todo-error').text(err)
      } else {
        $('#add-todo-error').text(err.message)
      }
      console.log(err)
    })
    .always(() => {
      $('#add-title').val('')
      $('#add-description').val('')
      $('#add-due-date').val('')
    })

})

// UPDATE TODO
const updateToDo = id => {
  $.ajax({
    method: 'GET',
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_key: localStorage.access_token
    }
  })
  .done(response => {
    const {title, description, status, due_date} = response
    const dateOnly = due_date.split('T')[0]
    
    $('#edit-title').val(title)
    $('#edit-description').val(description)
    $('#edit-status').val(status)
    $('#edit-due-date').val(dateOnly)
    $('#edit-new-todo-btn').data('id', id)
    showEditForm()
  })
  .fail(err => {
    const errmessage = err.responseJSON.message
    alert(errmessage)
  })
}

$('#edit-new-todo-btn').click(event => {
  event.preventDefault()
  let idTodo = $('#edit-new-todo-btn').data('id')

  $.ajax({
    method: 'PUT',
    url: `${baseUrl}/todos/${idTodo}`,
    headers: {
      access_key: localStorage.access_token
    },
    data: {
      title: $('#edit-title').val(),
      description: $('#edit-description').val(),
      status: $('#edit-status').val(),
      due_date: $('#edit-due-date').val()
    }
  })
    .done(response => {
        console.log(response)
        showTodoList()
    })
    .fail(err => {
      if (!err.message) {
        $('#edit-todo-error').text(err.join('<br>'))
      } else {
        $('#edit-todo-error').text(err.message)
      }
    })
})

const todoDone = (id, status) => {
  $.ajax({
    method: 'PATCH',
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_key: localStorage.access_token
    },
    data : {status}
  })
  .done(response => {
    console.log(response)
    showTodoList()
  })
  .fail(err => {
    const errmessage = err.responseJSON.message
    alert(errmessage)
  })
}

const deleteToDo = id => {
  $.ajax({
    method: 'DELETE',
    url: `${baseUrl}/todos/${id}`,
    headers: {
      access_key: localStorage.access_token
    }
  })
  .done(response => {
    console.log(response)
    showTodoList()
  })
  .fail(err => {
    const errmessage = err.responseJSON.message
    alert(errmessage)
  })
}

