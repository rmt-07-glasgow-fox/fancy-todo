const baseUrl = 'http://localhost:3000';

$(document).ready( () => {  
  if(localStorage.access_token) {
    $("#sign-out-btn").show();
    $("#alertSignIn").hide();
    afterLogin(localStorage.email, JSON.parse(localStorage.quote));
  } 
  else {
    // jika belum sign in
    $("#sign-up-div").hide();
    $("#todo-div").hide();
    $("#sign-out-btn").hide();
    $("#alertSignIn").hide();
  }
});

// jika sign up link di klik, tampilkan sign up form, hide sign in form
$( "#sign-up-link" ).click((event) => {
  event.preventDefault();
  $("#sign-in-div").hide();
  $("#sign-up-div").fadeIn('slow');
});

// jika sign in link di klik, tampilkan sign in form, hide sign up form
$( "#sign-in-link" ).click((event) => {
  event.preventDefault();
  $("#sign-in-div").fadeIn('slow');
  $("#sign-up-div").hide();
  $("#InputEmail").val('');
  $("#InputPassword").val('');   
  $("#alertSignIn").hide();
});

/* ============ Handle Login Button =============*/

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
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('email', response.email);
      localStorage.setItem('quote', JSON.stringify(response.quote));
      const quote = response.quote;
      afterLogin(email, quote);
    })
    .fail(err => {
      const errMessage = err.responseJSON.message;
      if(errMessage === 'Invalid email / password') $("#alertSignIn").fadeIn('slow');
    });
  } 
});

/* ============ Handle Logout Button =============*/

$( "#sign-out-btn" ).click((event) => {
  localStorage.clear(); 
  $("#InputEmail").val('');
  $("#InputPassword").val('');   
  $("#todo-div").hide();
  $("#sign-out-btn").hide();
  $("#alertSignIn").hide();
  $("#sign-in-div").show();
  $("#todo-list > tbody").empty();
});

/* ================================================*/

function afterLogin(email, quote) {
  const idx = email.split('').indexOf('@');
  const name = email.split('').splice(0, idx).join('');
  $("#sign-in-div").hide();
  $("#sign-up-div").hide();
  $("#sign-out-btn").show();
  $("#todo-div").fadeIn('slow');
  $("#greetings").text(`Hello ${name}`);
  $("#randomQuote").text(`${quote.content}`);
  $(".blockquote-footer").text(`${quote.author}`);  
  
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/todos",
    headers: {
      "access_token": localStorage.access_token
    }
  })
  .done(response => {
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
      </tr>
     `
   });
   $("#todo-list > tbody").append(data);
  })
  .fail(err => {
    const errMessage = err.responseJSON.message;
    console.log(errMessage);
  });

}



