/** GOOGLE BUTTON SET */
function onFailure(error) {
    console.log(error);
}
function renderButton() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSignIn,
        'onfailure': onFailure
    });
    gapi.signin2.render('my-signin3', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSignIn,
        'onfailure': onFailure
    });
}

function showEdit(show) {
    if (show) {
        $('#addTodo').hide()
        $('#editTodo').removeClass('d-none')    
    } else {
        $('#addTodo').show()
        $('#editTodo').addClass('d-none')
        $('#todoId').val('')
        $('#todoTitle').val('')
        $('#todoDescription').val('')
        $('#todoDueDate').val('')
    }
}

function cekAuth() {
    if (localStorage.access_token) {
      $('#formHolder').hide()
      $('#todoHolder').show()
      readTodo()
      getHolidays()
  } else {
      $('#formHolder').show()
      $('#todoHolder').hide()
  }
}


