const baseUrl = 'http://localhost:3000'

$(document).ready(function () {
    if(localStorage.getItem('access_token')){
        todoPage()
    } else {
        registerPage()
    }
})

function hideAll(){
    $('.btn-register').hide()
    $('.btn-logout').hide()
    $('.btn-login').hide()
    $('#home').hide()
    $('#register').hide()
    $('#login').hide()
    $('#todo').hide()
    $('#add-modal').hide()
}

function registerPage(){
    hideAll()
    $('.btn-login').show()
    $('#home').show()
    $('#register').show()

    $('.btn-login').click(function() {
        loginPage()
    })

    // handle register
    $('#form-register').on('submit', function(event) {
        event.preventDefault()
        data = {
            email: $('#email').val(),
            username: $('#username').val(),
            password: $('#password').val()
        }
        $.ajax({
            method: 'POST',
            url: `${baseUrl}/register`,
            data
        })
        .done(res => {
            console.log(res, 'res register');
            loginPage()
        })
        .fail((xhr, status) => {
            console.log(xhr, status);
        })
        .always(() => {
            $('#email').val(''),
            $('#username').val(''),
            $('#password').val('')
        })
    })
}

function loginPage(){
    hideAll()
    $('.btn-register').show()
    $('#home').show()
    $('#login').show()

    $('.btn-register').click(function() {
        registerPage()
    })

    // handle login
    $('#form-login').on('submit', function(event) {
        event.preventDefault()
        data = {
            email: $('#email-login').val(),
            password: $('#password-login').val()
        }
        $.ajax({
            method: 'POST',
            url: `${baseUrl}/login`,
            data
        })
        .done(res => {
            console.log(res, 'login');
            localStorage.setItem('access_token', res.access_token)
            todoPage()
        })
        .fail(err => {
            console.log(err, 'err login');
        })
        .always(() => {
            $('#email-login').val(''),
            $('#password-login').val('')
        })
    })
}

function logout(){
    localStorage.clear()
    registerPage()
}

function todoPage(){
    hideAll()
    $('.btn-logout').show()
    $('#todo').show()

    $('.btn-logout').on('click', function() {
        logout()
    })

    $('#add-todo').on('click', function() {
        addTodo()
    })

    $.ajax({
        method: 'GET',
        url: `${baseUrl}/todos`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(res => {
        // console.log(res[1].title);
        $('#task-backlog').empty()
        res.forEach( (data, index) => {
            // console.log(data);
            if(data.status){
                $('#task-done').append(
                    `
                    <div id="1" class="card-body bg-white shadow-sm rounded mt-3 p-0  overflow-hidden">
                        <div class="d-flex justify-content-start">
                            <div class="p-1 bg-success"></div>
                            <div class="pb-3 position-relative w-100"
                                style="padding-top: 1.5rem;padding-right: 1.5rem;padding-left: 1rem;">
                                <svg class="close position-absolute text-info" id-parent="1"
                                    style="width: 1.25rem; height: 1.25rem; top: .7rem; right: .7rem;"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                <h5 class="card-title overflow-hidden" style="max-height: 3rem;">${data.title}</h5>
                                <p class="card-text overflow-hidden" style="max-height: 3rem;">${data.description}</p>
                                <div class="d-flex justify-content-between text-muted position-relative">
                                    <small class="text-muted">${data.due_date}</small>
                                    <small><a class="edit text-decoration-none text-info position-absolute"
                                            style="right: -.4rem;" id-parent="1" href="">edit</a></small>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                )
            } else {
                $('#task-backlog').append(
                    `
                    <div id="1" class="card-body bg-white shadow-sm rounded mt-3 p-0  overflow-hidden">
                        <div class="d-flex justify-content-start">
                            <div class="p-1 bg-info"></div>
                            <div class="pb-3 position-relative w-100"
                                style="padding-top: 1.5rem;padding-right: 1.5rem;padding-left: 1rem;">
                                <svg class="close position-absolute text-info" id-parent="1"
                                    style="width: 1.25rem; height: 1.25rem; top: .7rem; right: .7rem;"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                <h5 class="card-title overflow-hidden" style="max-height: 3rem;">${data.title}</h5>
                                <p class="card-text overflow-hidden" style="max-height: 3rem;">${data.description}</p>
                                <div class="d-flex justify-content-between text-muted position-relative">
                                    <small class="text-muted">${data.due_date}</small>
                                    <small><a class="edit text-decoration-none text-info position-absolute"
                                            style="right: -.4rem;" id-parent="1" href="">edit</a></small>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                )
            }
        })
    })
    .fail(err => {
        console.log(err);
    })
}

function addTodo(){
    $('#add-modal').show()
    $('#modal-cancel').on('click', function(){
        $('#add-modal').hide()
    })

    $('#form-add').on('submit', function(event) {
        event.preventDefault()
        const data = {
            title: $('#add-title').val(),
            description: $('#add-description').val(),
            due_date: $('#add-date').val(),
            status: $('input[name="status-task"]:checked').val()
        }
        $.ajax({
            method: 'POST',
            url: `${baseUrl}/todos`,
            headers: {
                access_token: localStorage.getItem('access_token')
            },
            data
        })
        .done(res => {
            console.log(res);
            todoPage()
        })
        .fail(err => {
            console.log(err);
        })
        .always(() => {
            $('#add-title').val(''),
            $('#add-description').val(''),
            $('#add-date').val('')
        })
    })
}

function putTodo(){

}





