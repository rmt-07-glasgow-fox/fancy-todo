var baseurl = 'http://localhost:3000'
$(document).ready( () => {
    auth()
    getData()
} )

function showPage(selector, selector2) {
    $('.welcome').hide()
    $('.home').hide()
    $('.create').hide()
    $('.edit').hide()
    $(".login").hide()
    $(".register").hide()
    $("#user").hide()
    $('#email').val('')
    $('#password').val('')
    $('#emailReg').val('')
    $('#passwordReg').val('')
    $(selector).fadeIn()
    $(selector2).show()
}
function auth() {
    if (localStorage.access_token) {
        showPage('.home', '#user')
    } else {
        showPage('.login', '.welcome')
    }
}
function resetAuth() {
    $('.regFail').remove()
    $('.regSuccess').remove()
    $('#loginFail').text('')
}

$("#toRegister").on( "click", (even) => {
    even.preventDefault()
    resetAuth()
    showPage('.register', '.welcome')
} )
$("#toLogin").on( "click", (even) => {
    even.preventDefault()
    resetAuth()
    showPage('.login', '.welcome')
} )

$('#logout').on( 'click', (even) => {
    even.preventDefault()
    localStorage.clear()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    resetAuth()
    auth()
} )
$("#login").on( "click", (even) => {
    even.preventDefault()
    $('#loginFail').text('')
    var email = $('#email').val()
    var password = $('#password').val()
    $.ajax({
        method: "POST",
        url: `${baseurl}/login`,
        data: {
            email,
            password
        }
    })
    .done( data => {
        localStorage.setItem('access_token', data.access_token)
        getData()
        auth()
    } )
    .fail( xhr => {
        var { message } = xhr.responseJSON
        $('#loginFail').text(message)
    } )
    .always( () => {
    } )
} )
$("#register").on( "click", (even) => {
    even.preventDefault()
    $('.regFail').remove()
    $('.regSuccess').remove()
    var email = $('#emailReg').val()
    var password = $('#passwordReg').val()
    $.ajax({
        method: "POST",
        url: `${baseurl}/register`,
        data: {
            email,
            password
        }
    })
    .done( data => {
        $("#regSuccess").text('Register Succesed')
        showPage('.register', '.welcome')
    } )
    .fail( xhr => {
        xhr.responseJSON.map( el => {
            $(".registerResult").append(`<p class="text-center text-danger regFail">${el.message}</p>`)
        });
    } )
    .always( () => {
    } )
} )


$("#toCreate").on("click", (even) => {
    even.preventDefault()
    $(".create").fadeIn()
    $(".home").hide()
} )
$('#buat').on( 'click', (even) => {
    create()
} )

$('#save').on( 'click', (even) => {
    even.preventDefault()
    var title = $('#titleEdit').val()
    var description = $('#descriptionEdit').val()
    var status = $('#statusEdit').val()
    var due_date = $('#batasWaktuEdit').val()
    var id = $('#UserId').val()
    $.ajax({
        method: 'PUT',
        url: `${baseurl}/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            title,
            description,
            status,
            due_date
        }
    })
    .done( data => {
        $(".edit").hide()
        $(".home").fadeIn()
        getData()
    } )
    .fail( err => {
        console.log(err);
    } )
    .always( () => {
    } )
} )

function create() {
    var title = $('#title').val()
    var description = $('#description').val()
    var status = $('#status').val()
    var due_date = $('#batasWaktu').val()
    $.ajax({
        method: 'POST',
        url: `${baseurl}/todos`,
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            title,
            description,
            status,
            due_date
        }
    })
    .done( data => {
        $(".create").hide()
        $(".home").fadeIn()
        getData()
    } )
    .fail( err => {
        console.log(err);
    } )
    .always( () => {
        console.log(due_date);
    } )
}

function getData() {
    getJokes()
    $('.allActivities').empty()

    $.ajax({
        method: 'GET',
        url: `${baseurl}/todos`,
        headers: {
            access_token: localStorage.access_token
        },

    })
    .done( data => {
        let dataActivities 
        data.forEach( el => {
            dataActivities += `<tr><td>${el.title}</td><td>${el.description}</td><td>${el.status}</td><td>${el.due_date}</td> <td> <button class="btn btn-primary" onclick="getEdit(${el.id})"> Edit </button>  <button class="btn btn-primary" onclick="deleteData(${el.id})"> Delete </button> </td></tr>`
        } )
        $('.allActivities').append(dataActivities)
    } )
    .fail( err => {
        console.log(err);
    } )
    .always( () => {
    } )
}

function getEdit(id) {
    $(".create").hide()
    $(".home").hide()
    $('.edit').fadeIn()
    $.ajax({
        method: 'GET',
        url: `${baseurl}/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done( data => {
        console.log(data);
        $('#titleEdit').val(`${data.title}`)
        $('#descriptionEdit').val(`${data.description}`)
        $('#statusEdit').val(`${data.status}`)
        $(`${data.status}`).attr('selected')
        $('#batasWaktuEdit').val(`${data.due_date.slice(0, -1)}`)
        $('#UserId').val(`${id}`)
    } )
    .fail( err => {
        console.log(err);
    } )
    .always( () => {
    } )
}

function deleteData(id) {
    $.ajax({
        method: 'DELETE',
        url: `${baseurl}/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        },

    })
    .done( data => {
        getData()
    } )
    .fail( err => {
        console.log(err);
    } )
    .always( () => {
    } )
}

function getJokes() {
    $('#joke').empty()
    $.ajax({
        method: 'GET',
        url: `${baseurl}/`,
        headers: {
            access_token: localStorage.access_token
        },
    })
    .done( data => {
        let joke = `<p>${data.setup}</p><p>${data.punchline}</p>`
        $('#joke').append(joke)
    } )
    .fail( err => {
        console.log(err);
    } )
    .always( () => {
    } )
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: "POST",
        url: "https://fdr-fancy-todos-server.herokuapp.com",
        data: { id_token }
    })
    .done( data => {
        localStorage.setItem('access_token', data.access_token)
        getData()
    } )
    .fail( (xhr, status) => {

    } )
    .always( () => {
        auth()
    } )
  }