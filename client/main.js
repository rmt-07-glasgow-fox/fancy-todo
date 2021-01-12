const baseURL = "http://localhost:5000"

$(document).ready(function () {
    
    checkAuth()
    //event listener masuk ke dalam document ready
    $("#login-button").click(function (event) {
        event.preventDefault()
        const email = $ ("#email-login").val()
        const password = $ ("#password-login").val()
        
    
        $.ajax({
            method: "POST", 
            url: `${baseURL}/users/login`,
            data: {
                email,
                password
            }
        })
        .done (result => {
            localStorage.setItem("access_token", result.access_token)
            checkAuth()
        })
        .fail (err => {
            console.log(err)
        })
        .always (function () {
            $ ("#email").val("")
            $ ("#password").val("")
        })
    })
    
    $("#logout-button").click(function () {
        localStorage.clear()
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        console.log('User signed out.');
        })
        checkAuth()
    })

    $("#back-to-login").click (function () {
        checkAuth()
    })

    $("#go-register").click (function (event) {

        event.preventDefault()

        $("#login").hide()
        $("#register").show()
        $("#todo").hide()
        $("#logout-button").hide()
    })

    $("#register-button").click(function (event) {
        event.preventDefault()
        const email = $ ("#email-register").val()
        const password = $ ("#password-register").val()
    
        $.ajax({
            method: "POST", 
            url: `${baseURL}/users/register`,
            data: {
                email,
                password
            }
        })
        .done (result => {
            // console.log(result.access_token)
            checkAuth()
        })
        .fail (err => {
            console.log(err)
        })
        .always (function () {
            $ ("#email").val("")
            $ ("#password").val("")
        })
    })

    $("#add-button").click( function (event) {
        event.preventDefault()
        const title = $ ("#add-title").val()
        const due_date = $ ("#add-due_date").val()
        const status = $ ("#add-status").val()
        const description = $ ("#add-description").val()

        $.ajax ({
            method: "POST",
            url: `${baseURL}/todos`,
            data: {
                title,
                due_date,
                status,
                description
            },
            headers: {
                access_token: localStorage.access_token
            }

        })
        .done (result => {
            console.log(result)
            checkAuth()
        })
        .fail (err => {
            console.log(err)
        })
        .always (function () {
            $ ("#add-title").val("")
            $ ("#add-due_date").val("")
            $ ("#add-status").val("")
            $ ("#add-description").val("")
        })

        console.log({ title, due_date, status, description })
    })
    
    $("#add-todo").click(function () {
        $("#add-form").show()
    })

    $("#hide-add-form").click(function () {
        $("#add-form").hide()
    })

})

function checkAuth () {
    if (localStorage.access_token) {
        $("#login").hide()
        $("#register").hide()
        $("#todo").show()
        getTodoList()
        getQuotes()
        $("#logout-button").show()
        $("#add-form").hide()
        $("#update-form").hide()
        
    } else {
        $("#login").show()
        $("#register").hide()
        $("#todo").hide()
        $("#logout-button").hide()
        $("#add-form").hide()
        $("#update-form").hide() 
    }
}

function onSignIn(googleUser) {

    // const profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    const id_token = googleUser.getAuthResponse().id_token;

    $.ajax ({
        method: "POST",
        url: `${baseURL}/users/googleUser`,
        data: { id_token }
    })
    .done (result => {
        localStorage.setItem("access_token", result.access_token)
        checkAuth()
        console.log(result.access_token);
    })
    .fail (err => {
        console.log(err)
    })
}

function changeStatus (id, status) {
    console.log(id, status)
    $.ajax ({
        method: "PATCH",
        url: `${baseURL}/todos/${id}`,
        data: {
            status
        },
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done (result => {
        getTodoList()
    })
    .fail (err => {
        console.log(err)
    })
}

// function btnShowHide (id) {
//     if ($(`#btn-${id}`)) {

//     }
//     $(".todo-button").hide()

//     $(".todo-list").click(function (event) {
//         event.preventDefault()
//         $("#todo-button").show()
// })
// }

function getTodoList () {
    $.ajax ({
        method: "GET",
        url: `${baseURL}/todos`,
        headers: {
            access_token: localStorage.access_token
        }
    })
    .then (result => {
        const todoList = result
        $("#todo-list").empty()
        todoList.forEach(element => {
            $("#todo-list").append(
                `<div class="card mb-2">
                <div class="card-header">
                  ${element.due_date}
                </div>
                <div class="row card-body">
                    <div class="col-2 d-flex justify-content-start m-2 border-end border-primary">
                    
                        <input type="checkbox" onclick="changeStatus(${element.id}, ${!element.status})" ${element.status? 'checked': ''} >
                        
                    </div>
                    <div class="col-9 d-flex justify-content-center m-2">
                        <div class="row">
                            <h5 class="card-title border-bottom border-info">${element.title}</h5>
                            <p class="card-text mt-2">${element.description}</p>
                        </div>
                    </div>
                    <div class="btn-group" role="group" aria-label="Basic mixed styles example" onclick="btnShowHide(${element.id})">
                        
                            <button href="/" type="button" class="btn btn-danger" onclick="updateTodoList(${+element.id})">Update</button>
                            <button type="button" class="btn btn-warning" onclick="deleteTodoList(${+element.id})">Delete</button>
                    
                        
                    </div>
                </div>
                </div>`
            )
            
        });
      
       
    })
    .fail (err => {
        console.log(err)
    })
}

function deleteTodoList(id) {
    $.ajax ({
        method: "DELETE",
        url: `${baseURL}/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done (result => {
        checkAuth()
    })
    .fail (err => {
        console.log(err)
    })
}

function updateTodoList (id) {

    $("#update-form").show()
    $.ajax ({
        method: "GET",
        url: `${baseURL}/todos/${id}`,
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done (result => {
        const updateTodo = result
        const updateDate = updateTodo.due_date.toLocaleString().split("T")[0]

        $("#update-form").empty()
        $("#update-form").append(
            `<label> <h5> Update Your Plan ? </h5> </label>
            <form>
                <div class="row g-2 ">
                    <div class="col-6">
                      <div class="form-floating">
                        <input type="text" class="form-control" id="update-title" placeholder="Todo Title">
                        <label for="title">${updateTodo.title}</label>
                      </div>
                    </div>
                    <div class="col-6">
                        <div class="form-floating">
                          <input type="date" class="form-control" id="update-due_date" placeholder="Due Date">
                          <label for="due_date">${updateDate}</label>
                        </div>
                    </div>
                </div>
                <div class="form-floating mt-2">
                    <textarea class="form-control" placeholder="Leave a description here" id="update-description" style="height: 100px"></textarea>
                    <label for="description">${updateTodo.description}</label>
                </div>
                <div class="mt-2">
                    <button type="submit" class="btn btn-secondary" id="update-button">Update</button>
                    <button type="reset" class="btn btn-warning" id="hide-update-form">Cancel</button>
                </div>
            </form>`
        )

        $("#hide-update-form").click(function () {
            $("#update-form").hide()
        })

        $("#update-button").click (function (event) {

            event.preventDefault()
            // updateData()
            const title = $("#update-title").val()
            const due_date = $("#update-due_date").val()
            const description = $("#update-description").val()
        
            console.log({ title, due_date, description })

            $.ajax ({
                method: "PUT",
                url: `${baseURL}/todos/${id}`,
                data: {
                    title,
                    due_date,
                    description
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .done (result => {
                checkAuth()
            })
            .fail (err => {
                console.log(err)
            })
        })
    })
    .fail (err => {
        console.log(err)
    })
}

function getQuotes () {
    $.ajax ({
        method: "GET",
        url: `${baseURL}/RandomQuote`,
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done (result => {
        $("#quotesBox").empty()
        $("#quotesBox").append(
            `
            <div class="card-header">
                <h3>Quotes Of The Day</h3>
            </div>
            <div class="card-body">
                <h5 class="text-justify m-3 justify-content-center"><p class="font-italic"> <i>"${result.quote}"</i></p></h5>
                <h6> -${result.author}</h6>
            </div>`
        )
    })
    .catch (err => {
        console.log(err)
    })
}


