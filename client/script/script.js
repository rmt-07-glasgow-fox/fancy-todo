// const { response } = require("express")
// const { resourceUsage } = require("process")
let todoCurrentId;

const baseurl = "http://localhost:4300"


// function showRegister() {
//     $('#login-form-display').hide()
//     $('#register-form-display').show()
//     $('#add-todo-display').hide()
//     $('#edit-todo-display').hide()
//     $('#home-page-display').hide()
// }

// function showLogin() {
//     $('#login-form-display').show()
//     $('#register-form-display').hide()
//     $('#add-todo-display').hide()
//     $('#edit-todo-display').hide()
//     $('#home-page-display').hide()

// }

// function showHomePage() {
//     $('#login-form-display').hide()
//     $('#register-form-display').hide()
//     $('#add-todo-display').hide()
//     $('#edit-todo-display').hide()
//     $('#home-page-display').show()
// }

// function showAddTodo() {
//     $('#login-form-display').hide()
//     $('#register-form-display').hide()
//     $('#add-todo-display').show()
//     $('#edit-todo-display').hide()
//     $('#home-page-display').hide()
// }

// function showEditTodo() {
//     $('#login-form-display').hide()
//     $('#register-form-display').hide()
//     $('#add-todo-display').hide()
//     $('#edit-todo-display').show()
//     $('#home-page-display').hide()
// }


// ------------------------main Web --------------------------//



function mainWebsite() { //ok
    $('#mainDashboard').hide() //ok
    $('#-nav-user-display').hide() //ok
    $('#homePage-web').show() //ok
}

$('#login-form-display').hide() //ok

function userLogin() { //ok
    fetchTodo() //ok 
    fetchNews() //ok
    fetchUserData() //ok
    $('#homePage-web').hide() //ok
    $('#mainDashboard').show() //ok
    $('#add-new-Todo').hide() //ok
    $('#nav-suer-display').show() //ok
    $('#halo-name').text(localStorage.email)
}

$('#button-logout').click(function() { //ok
    localStorage.removeItem('access_token')
    logOut() //ok
    mainWebsite() //ok
})

function loginClient(e) { //ok di html
    e.preventDefault()

    let emailClient = $('#email-form-login').val() //ok
    let passClient = $('#pass-form-login').val() //ok

    if(!emailClient || !passClient) {
        console.log(err)
    } else {
        $.ajax({
            method : 'GET',
            url : `${baseurl}/login`,
            data : {
                email : emailClient,
                password : passClient
            }
        })
        .done(response => {
            localStorage.setItem('access_token', response.access_token)
            localStorage.setItem('email' ,response.email)
        })
        .fail(err => {
            $('#error-login').remove(); //ok
            $("#show-error-login").append(` 
            <div class="alert alert-warning" id="error-login" role="alert">
            ${err.responseJSON.message}
            </div>
            `); //ok
        })
        .always(() => {

        })
    }    
}

function registerClient(e) { //ok di html
    e.preventDefault()

    let emailReg = $('#email-form-regist').val()
    let passReg = $('#pass-form-regist').val()
    let passVerif = $('#pass-verif-form-regist').val()

    if(!emailReg || !passReg || !passVerif) {
        console.log(err)
    } else {
        if(passReg != passVerif) {
            console.log(err)
        } else {
            $.ajax({
                method : 'POST',
                url = `${baseurl}/register`,
                data : {
                    email : emailReg,
                    password : passReg
                }
            })
            .done(response => {
                showLogin(e)
                console.log({
                    email : response.email
                })
            })
            .fail(err => {
                console.log(err)
            })
            .always(() => {

            })
        }
    }

}

// ------------------------- CRUD Todo ----------------------//

// list todo by user login
function fetchTodo() { //ok
    $.ajax({
        method : 'GET',
        url : `${baseurl}/todos`,
        headers : {
            access_token : localStorage.access_token
        }
    })
    .done(response => {
        $('#todoList').empty() //ok
        $.each(response, function (el, i) {
            let checkBoxtodo = `input type="checkbox" id="status-${e.id}" onclick="changeStatus(${e.id}, '${e.status}')" `

            if(el.status == true) {
                checkBoxtodo += `checked>`
            } else {
                checkBoxtodo += `>`
            }
        })

        let todoAppend = `
        <div class="input-group mb-3">
            <div class="input-group-prepend">
            <div class="input-group-text">
                ${checkBoxTodo}
            </div>
            </div>
            <div class="card" style="width: 40rem">
                <div class="card-body" id=todoCardBody_${el.id}>
                <div id=todoCardValue_${el.id}> 
                    <h5 class="card-title">${el.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${el.due_date.split('T')[0]}</h6>
                    <p class="card-text">${el.description}</p>
                    <a href="#" onclick='editTodoForm(${el.id})' class="card-link" id="edit Todo">Edit</a>
                    <a href="#" onclick='deleteTodo(${el.id})' class="card-link" id="delete Todo">Hapus</a>
                </div>
                </div>
            </div>
        </div>`

        $('#todoList').append(todoAppend)
    })
    .fail(err => {
        console.log(err)
    })
    .always(() => {

    })
}

//add todo

function addTodoForm() { //ok dari html
    $(`#add-new-todo`).show() //ok
}

function cancelAddTodo(e) { // ok dari html
    e.preventDefault()
    $(`#add-new-todo`).hide() //ok
}

function addNewTodo(e) { // ok dari html
    e.preventDefault()

    $.ajax({
        method : 'POST',
        url : `${baseurl}/todos`,
        header : {
            access_token : localStorage.access_token
        },
        data : {
            title : $('#add-title-todo').val(), //ok
            description : $('#add-desc-todo').val(), //ok
            status : false,
            due_date : $('#add-due-date-todo').val() //ok
        }
    })
    .done(response => {
        fetchTodo()
        $('#add-new-todo').hide() //ok 
    })
    .fail(err => {
        console.log(err)
    })
    .always(() => {
        $('#add-title-todo').val() //ok
        $('#add-desc-todo').val() //ok
        $('#add-due-date-todo').val() //ok
        todoCurrentId = null
    })
}


// edit Todo

function editTodoForm(todoById) {  //ok -> fetch todo
    let todoCurrentId = todoById

    $.ajax({
        method : 'GET',
        url : `${baseurl}/todos/${todoCurrentId}`,
        header : {
            access_token : localStorage.access_token
        }

    })
    .done(response => {
        $(`#todoCardValue_${todoCurrentId}`).hide(); //ok

        let cardBody = `
        <form onsubmit="editTodo(event)" id="formEdit${todoCurrentId}">
        <div class="row">
            <div class="col">
            <input type="text" class="form-control title" placeholder="Title" id="titleEdit" value="${response.title}">
            </div>
            <div class="col">
            <input type="date" class="form-control due_date" placeholder="due date" id="dueDateEdit" value="${response.due_date.split('T')[0]}">
            </div>
        </div>
        <div class="form-group">
            <textarea class="form-control description" id="descriptionEdit" rows="3" placeholder="Description Here....">${response.description}</textarea>
            </div>
            <button type="submit" class="btn btn-primary">Edit</button>
            <button onclick="cancleEdit(e)" class="btn btn-danger">Cancel</button>
        </form>
        `

        $(`#todoCardBody_${todoCurrentId}`).append(cardBody);
    })
    .fail(err => {
        console.log(err)
    })
    .always(() => {

    })
}

function cancelEdit(e) { //ok
    e.preventDefault()

    $(`#todoCardValue_${todoCurrentId}`).show() //ok
    $(`#formEdit${todoCurrentId}`).remove()
}


function editTodo(e) {
    e.preventDefault()
    var title = $('#titleEdit').val();
    var due_date = $('#dueDateEdit').val();
    var description = $('#descriptionEdit').val();
    $.ajax({
        method: "PUT",
        url: serverURL + "/todos/" + todoCurrentId,
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            title, due_date, description
        }
    }).done(() => {
        console.log('Selesai Edit')
        fetchTodo()
        $(`#formEdit`).hide();
        $(`#todoCardValue_${todoCurrentId}`).show(); //ok
    }).fail(err => {
        console.log(err, 'ERROR')
    }).always(() => {
        $('#titleEdit').val('');
        $('#dueDateEdit').val('');
        $('#descriptionEdit').val('')
    })
}

// -------------------- Edit status -----------------------//

function changeStatus(id, status) { //ok

    let statusId = id
    let newStatus

    if (status == false) {
        newStatus = true
    } else {
        newStatus = false
    }
    // console.log (newStatus)
    
    $.ajax({
        method: "PATCH",
        url: `${baseurl}/todos/${statusId}`,
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            status: newStatus
        }
    })
    .done(result => {
        // userLogin() //ok
    })
    .fail(err => {
        console.log(err)
    })
    .always(() => {

    })

    fetchTodo()
}

// --------------- Delete Todo -----------------------------//

function deleteTodo(id) { //ok
    $.ajax({
        method : 'DELETE',
        url : `${baseurl}/todos/${id}`,
        header : {
            access_token : localStorage.access_token
        }
    })
    fetchTodo() //ok
}

// ----------------- google Login ------------------------//

function onSignIn(googleUser) { //ok

    var {id_token} = googleUser.getAuthResponse();
    console.log (id_token)

    $.ajax({
        method: "POST",
        url: `${baseurl}/googleLogin`,
        headers: {
            google_access_token: id_token
        }
    }).done(response => {
        console.log (response)
        localStorage.setItem('access_token', response.access_token)
        userLogedIn()
        console.log(response)
    }).fail (err => {
        console.log(err)
    })
}

// -------------------sign out --------------------------//

function LogOut() { //ok
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

// ---------------------- 3rd API -------------------------//

function fetchNews () { //ok perlu diperbaiki
    $.ajax({
        method: "GET",
        url: `${baseurl}/news`,
        headers: {
            access_token: localStorage.access_token
        }
    }).done (result => {
        // console.log (result)
        $('#news-widget-get').empty();

        let dataNews = `
        <div class="weather-card card" data-toggle="tooltip" data-placement="top" title="Untuk mengubah lokasi buka pengaturan user"> <span class="weather-icon icon"><img class="img-fluid" src="${result.current.weather_icons[0]}" /></span>
            <div class="weather-title title">
                <p>${result.location.name}</p>
            </div>
            <div class="weather-temp">${result.current.temperature}<sup>&deg;</sup></div>
            <div class="weather-row row">
                <div class="weather-col-4 col-4">
                    <div class="weather-header header">General</div>
                    <div class="weather-value value">${result.current.weather_descriptions[0]}</div>
                </div>
                <div class="weather-col-4 col-4">
                    <div class="weather-header header">Cloud</div>
                    <div class="weather-value value">${result.current.cloudcover}</div>
                </div>
                <div class="weather-col-4 col-4">
                    <div class="weather-header header">Pressure</div>
                    <div class="weather-value value">${result.current.pressure}</div>
                </div>
            </div>
        </div>
        `
        $('#news').append(); //belom disi
    }).fail (err => {
        console.log (err)
    }).always (() => {
        console.log ('ajax 3rd API get')
    })
}

// adding feature edit user


$(document).ready(function() {
    if(localStorage.access_token) {
        userLogin() //ok
    } else {
        mainWebsite() //ok
    }
})

function showLogin(e) {  //ok di html
    e.preventDefault()
    $('#register-form-display').hide() //ok
    $('#login-form-display').show() //ok
}

function showRegister(e) { //ok di html
    e.preventDefault()
    $('#register-form-display').show() //ok
    $('#login-form-display').hide() //ok
}
