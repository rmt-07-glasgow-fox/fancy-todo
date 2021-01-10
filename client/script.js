const baseUrl = 'http://localhost:3000';

$(document).ready( () => {    
  if(localStorage.access_token) { //jika sudah sign in
    $("#sign-out-btn").show();
    $("#alertSignIn").hide();
    afterLogin();
  } 
  else {
    // jika belum sign in
    beforeLogin();
  }
});

const getQuote = () => {
  $.ajax({
    method: "GET",
    url: `${baseUrl}/quote`,
    headers: { "access_token": localStorage.access_token }
  })
  .done(response => {   
    const quote = response;
    $("#randomQuote").text(`${quote.content}`);
    $(".blockquote-footer").text(`${quote.author}`); 
  })
  .fail(err => {
    const errMessage = err.responseJSON.message;
    console.log(errMessage);
  });
}

const beforeLogin = () => {
  $("#sign-up-div").hide();
  $("#todo-div").hide();
  $("#sign-out-btn").hide();
  $("#alertServerSignIn").hide();  
  hideLoginAlerts();
}

const afterLogin = () => {
  const idx = localStorage.email.split('').indexOf('@');
  const name = localStorage.email.split('').splice(0, idx).join('');
  getQuote();     
  $("#sign-in-div").hide();
  $("#sign-up-div").hide();
  $("#add-todo-form").hide();
  $("#edit-todo-form").hide();  
  $("#alertAddTodo").hide();
  $("#sign-out-btn").show();
  $("#todo-div").fadeIn('slow');
  $("#greetings").text(`${getGreetingMsg()} ${name}`);    
  $.ajax({
    method: "GET",
    url: `${baseUrl}/todos`,
    headers: { "access_token": localStorage.access_token }
  })
  .done(response => {   
   appendTodo(response);   
  })
  .fail(err => {
    const errMessage = err.responseJSON.message;
    console.log(errMessage);
  });
}

const afterLogout = () => {
  beforeLogin();
  clearLoginForm();
  $("#todo-list > tbody").empty();
  $("#sign-in-div").show();  
}

const hideLoginAlerts = () => {
  $("#alertSignIn").hide();
  $("#alertSignUp").hide();
}

const clearLoginForm = () => {
  $("#InputEmail").val('');
  $("#InputPassword").val('');  
  $("#SignUpEmail").val('');
  $("#SignUpPassword").val('');   
}

const afterSuccessAddTodo = () => {
  $("#todo-list > tbody").empty();
  $("#add-todo-form").hide();
  $("#title").val('');
  $("#description").val('');  
  $("#due_date").val('');  
  $("#alertAddTodo").empty();  
}

const setItem = (response) => {
  localStorage.setItem('access_token', response.access_token);
  localStorage.setItem('email', response.email);
}

// jika sign up link di klik, tampilkan sign up form, hide sign in form
$( "#sign-up-link" ).click((event) => {
  event.preventDefault();
  $("#sign-in-div").hide();
  $("#sign-up-div").fadeIn('slow');
});

// jika sign in link di klik, tampilkan sign in form, hide sign up form
$( "#sign-in-link" ).click((event) => {
  event.preventDefault();
  $("#sign-up-div").hide();
  $("#sign-in-div").fadeIn('slow');
  hideLoginAlerts();
  clearLoginForm();     
});

/* ============ Handle Sign In Button =============*/

$( "#sign-in-btn" ).click((event) => {  
  const email = $( "#InputEmail" ).val();
  const password = $( "#InputPassword" ).val();  
  // jika email / password kosong, terkena validasi required html
  if (email && password) {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: `${baseUrl}/login`,
      data: { email, password }
    })
    .done(response => {
      setItem(response);      
      afterLogin();
    })
    .fail(err => {     
      if(!err.responseJSON) { //jika tidak connect ke server
        $("#alertServerSignIn").empty();
        $("#alertServerSignIn").append(`<p>Internal server error...</p>`);
        $("#alertServerSignIn").show();
      } 
      else {
        const errMessage = err.responseJSON.message;
        if(errMessage === 'Invalid email / password') {
          $("#alertSignIn").fadeIn('slow');
        }
      }
    });
  } 
});


/* ============ Handle Sign Up Button =============*/

$("#sign-up-btn").click((event) => {
  const email = $("#SignUpEmail").val();
  const password = $("#SignUpPassword").val();
  if(email && password) {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: `${baseUrl}/register`,
      data: { email, password }
    })
    .done(response => {
      $.ajax({
        method: "POST",
        url: `${baseUrl}/login`,
        data: { email, password }
      })
      .done(response => {
        setItem(response);     
        const quote = response.quote;
        afterLogin();
      })
      .fail(err => {
        const errMessage = err.responseJSON.message;
        if(errMessage === 'Invalid email / password') $("#alertSignIn").fadeIn('slow');
      });
    })
    .fail(err => {
      const errMessages = err.responseJSON.map(e => `<p>${e.message}</p>`);
      $("#alertSignUp").empty();
      $("#alertSignUp").append(errMessages);
      $("#alertSignUp").fadeIn('slow');
    })
  }
})

/* ============ Handle Logout Button =============*/

$( "#sign-out-btn" ).click((event) => {
  localStorage.clear(); 
  afterLogout();
  $("#alertServerSignIn").hide();
  const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
  });
});

// show add todo form
$( "#add-todo-btn" ).click((event) => {
  event.preventDefault();
  $("#add-todo-form").show();
});

// hide add todo form
$( "#hide-todo-form-btn" ).click((event) => {
  event.preventDefault();
  $("#add-todo-form").hide();  
});

/* ============ Handle Add Todo Button =============*/
$( "#add-new-todo-btn" ).click((event) => {
  event.preventDefault();
  const title = $("#title").val();
  const description = $("#description").val();  
  const due_date = $("#due_date").val();  
  $.ajax({
    method: "POST",
    url: `${baseUrl}/todos`,
    headers: { "access_token": localStorage.access_token },
    data: { title, description,  due_date}
  })
  .done(response => {
   $("#todo-list > tbody").empty();
   $("#add-todo-form").hide();
   $("#title").val('');
   $("#description").val('');  
   $("#due_date").val('');  
   $("#alertAddTodo").empty();   
   afterLogin();
  })
  .fail(err => {
    const errMessage = err.responseJSON.map(e => `<p>${e.message}</p>`);
    $("#alertAddTodo").empty();    
    $("#alertAddTodo").append(errMessage);
    if(errMessage) $("#alertAddTodo").fadeIn('slow');
  });
  
});

/* ============ Update todo =============*/
const updateTodo = (todoId) => {
  $.ajax({
    method: "GET",
    url: `${baseUrl}/todos/${todoId}`,
    headers: { "access_token": localStorage.access_token },
  })
  .done(response => {
    showEditForm(response);
  })
  .fail(err => {
    console.log(err);
  })
}

/* ============ Delete todo =============*/
const deleteTodo = (todoId) => {
  $.ajax({
    method: "Delete",
    url: `${baseUrl}/todos/${todoId}`,
    headers: { "access_token": localStorage.access_token }
  })
  .done(response => {
    $("#todo-list > tbody").empty();
    afterLogin();
  })
  .fail(err => {
    console.log(err);
  })
}

// Show Edit form
const showEditForm = (todo) => {
  $("#edit-todo-form").show();  
  $("#alertEditTodo").hide();

  let due_date = new Date(todo.due_date);
  $("#titlePopulate").val(todo.title);
  $("#descriptionPopulate").val(todo.description);  
  $("#due_datePopulate").val(due_date.toISOString().substr(0, 10));

  $("#hide-edit-todo-form-btn").click((event) => {
    event.preventDefault();
    $("#edit-todo-form").hide();
    $('#update-todo-btn').unbind('click');
  });

  $("#update-todo-btn").click((event) => {
    event.preventDefault();
    saveTodo(todo);
  }) 

}

//save setelah edit
const saveTodo = (todo) => {
  const title = $("#titlePopulate").val();
  const description = $("#descriptionPopulate").val();  
  const due_date = $("#due_datePopulate").val();
  $.ajax({
    method: "PUT",
    url: `${baseUrl}/todos/${todo.id}`,
    headers: { "access_token": localStorage.access_token },
    data: {title, description, due_date} 
  })
  .done(response => {
    console.log(response);
    $("#todo-list > tbody").empty();
    $('#update-todo-btn').unbind('click');
    afterLogin();
  })
  .fail(err => {
    const errMessages = err.responseJSON.map(e => `<p>${e.message}</p>`);
    console.log(errMessages);
    $("#alertEditTodo").empty();
    $("#alertEditTodo").append(errMessages);
    $("#alertEditTodo").show();
  })
}

//change status todo
const markAsDone = (todoId, status) => {
  console.log(status);
  status = status === 'finished' ? 'unfinished' : 'finished';
  $.ajax({
    method: "PATCH",
    url: `${baseUrl}/todos/${todoId}`,
    headers: { 'access_token': localStorage.access_token },
    data: { status }
  })
  .done(response => {
    $("#todo-list > tbody").empty();
    afterLogin();
  })
  .fail(err => {
    console.log(err);
  })
}

const getGreetingMsg = () => {
  let msg;
  let date = new Date();
  let time = date.getHours();
  if (time < 12) {
    msg = 'Good Morning!'
  }
  else if (time < 17) {
    msg = 'Good Afternoon!'
  }
  else {
    msg = 'Good Evening!'
  }
  return msg;
}

/* ============= Google Sign In */
function onSignIn(googleUser) {
  const idToken = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: "POST",
    url: `${baseUrl}/loginGoogle`,
    data: { idToken }
  })
  .done(response => {
    console.log(response.access_token), '<<<<<<<r';
    const email = response.email;
    const quote = response.quote;
    setItem(response); 
    afterLogin();
    
  })
  .fail((xhr, status) => {
    console.log('masukk');
    $("#alertServerSignIn").empty();
    $("#alertServerSignIn").append(`<p>Internal server error...</p>`);
    $("#alertServerSignIn").show();
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
  });
  })
}

// append todo ke table setelah get data
const appendTodo = (response) => {
  let num = 0;
  let data;
  response.forEach(todo => {
    const date = new Date(todo.due_date).toLocaleDateString('id-ID');
    num += 1;
    data += `
    <tr>
       <th scope="row">${num}</th>
       <td>${todo.title}</td>
       <td>${todo.description}</td>
       <td>${date}</td>
       <td>${todo.status}</td>
       <td>
         <a class="btn btn-outline-primary" href="javascript:void(0);" onclick="updateTodo(${todo.id})">
           <i class="fas fa-edit"></i>
         </a>
         <a class="btn btn-outline-danger" href="javascript:void(0);" onclick="deleteTodo(${todo.id})">
           <i class="far fa-trash-alt"></i>
         </a>
         <a class="btn btn-outline-success" href="javascript:void(0);" onclick="markAsDone(${todo.id}, '${todo.status}')">
         <i class="far fa-check-circle"></i>
         </a>     
       </td>
     </tr> `
  });
  $("#todo-list > tbody").append(data);
}








