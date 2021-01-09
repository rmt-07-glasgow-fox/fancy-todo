const baseURL = 'http://localhost:1200'

$(document).ready(() => {
    //$('.login-form').hide()
    console.log('page di reload')

    checkAuth()
    addTodo()
})

/* ------------------------------- HELPERS FUNCTION --------------------------------- */

// fungsi cek auth
function checkAuth() {
    if (localStorage.access_token) {
        $('.register-form').hide()
        $('.login-form').hide()
        getTodoList()
        $('.signout-btn').show()
        $('.add-todo-btn').show()
        $('#add-todo').hide()
        $('.todo-list-full').show()
        $('.edit-todo').hide()
    } else {
        $('.register-form').show()
        $('.login-form').hide()
        $('.signout-btn').hide()
        $('.add-todo-btn').hide()
        $('#add-todo').hide()
        $('.todo-list-full').hide()
        $('.edit-todo').hide()
    }
}

// fungsi format status
function formatStatus(status) {
    if (status === 'done') {
        return 'complete'
    } else {
        return 'on progress'
    }
}

// fungsi nampilin quotes
function randomQuote(id) {
    $.ajax({
        method: 'GET',
        url: `${baseURL}/randomQuote`,
        headers: { access_key: localStorage.access_token, id }
    })
        .done(response => {
            //$('.todo-list').append(`<span class="popuptext" id="myPopup">${response}</span>`)
            $('#myModal').empty()

            $('#myModal').append(`<div class="modal-content">
            <span class="close" id="close">&times;</span>
            <p>${response.data}</p>
            </div>`)

            console.log(response)
        })
        .fail(err => {
            console.log(err)
        })
}

// fungsi pop up fakta angka
function factNumber(id) {

    $.ajax({
        method: 'GET',
        url: `${baseURL}/numberFact`,
        headers: { access_key: localStorage.access_token, id }
    })
        .done(response => {
            // console.log('fakta angkaaa')
            // console.log(response.data, '----- ini fact number')
            $('#myModal').empty()

            $('#myModal').append(`<div class="modal-content">
            <span class="close" id="close">&times;</span>
            <p>${response.data}</p>
            </div>`)

            console.log(response.data)
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => {
            console.log('always')
        })
}

/* ------------------------------- AUTHENTICATION : REGISTER, LOGIN AND LOGOUT --------------------------------- */

// klik have account untuk load login/sign in form
$('.have-account-btn').click((event) => {
    event.preventDefault()

    $('.register-form').hide()
    $('.login-form').show()
    $('.signout-btn').hide()
    $('.todo-list').hide()
})

// klik tombol sign up untuk dilanjutkan load login/sign in form
$('.signup-btn').click((event) => {
    event.preventDefault()

    $('.register-form').hide()
    $('.login-form').show()
    $('.signout-btn').hide()
    $('.todo-list').hide()

    // mengirim data dari register ke server untuk didaftarkan di database
    const email = $('.register-email').val()
    const password = $('.register-password').val()

    $.ajax({
        method: 'POST',
        url: `${baseURL}/register`,
        data: { email, password }
    })
        .done(response => {
            console.log(response, '---- response')
        })
        .fail(err => {
            console.log(err, '---- error')
        })
        .always(() => {
            console.log('always')
            $('.register-email').val('')
            $('.register-password').val('')
        })

})

// mendapatkan data login
$('.signin-btn').click((event) => {
    event.preventDefault()

    const email = $('.login-email').val()
    const password = $('.login-password').val()

    // ajax untuk mendapatkan access token
    $.ajax({
        method: 'POST',
        url: `${baseURL}/login`,
        data: { email, password }
    })
        .done(response => {
            localStorage.setItem('access_token', response.access_token)
            checkAuth()
        })
        .fail(err => {
            console.log(err, '---- error')
        })
        .always(() => {
            console.log('always')
            $('.login-email').val('')
            $('.login-password').val('')
        })

})

// login via google
function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token

    $.ajax({
        method: 'POST',
        url: `${baseURL}/loginGoogle`,
        data: { id_token }
    })
        .done(response => {
            console.log(response)
        })
        .fail(err => [
            console.log(err)
        ])
        .always(() => {
            console.log('always')
        })
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

// logout dengan menghapus access token dari storage
$('.signout-btn').click(() => {
    console.log('logout')

    localStorage.clear()
    checkAuth()
})

/* ------------------------------- CRUD DATA : TODO LIST --------------------------------- */

// menampilkan todo list
function getTodoList() {
    $('.todo-list-full').show()

    $.ajax({
        method: 'GET',
        url: `${baseURL}/todos`,
        headers: { access_key: localStorage.access_token }
    })
        .done(response => {
            // manipulasi DOM
            $('.todo-list').empty()

            for (let i = 0; i < response.length; i++) {
                const id = response[i].id
                const title = response[i].title
                const desc = response[i].description
                const date = response[i].due_date.split('T')[0]
                const status = response[i].status

                if (status === 'undone') {
                    $('.todo-list').append(
                        `<p>#${id}</p>
                        <p>${title}</p>
                        <p>${desc}</p>
                        <p>${date}</p>
                        <p>${formatStatus(status)}</p>
                        <button type="submit" class="edit-todo-btn" onclick="getOneTodo(${id})">Edit</button>
                        <button type="submit" class="update-status-todo" id="btn-status"onclick="changeStatus(${id})">Complete</button>
                        <button type="submit" class="delete-todo" onclick="deleteTodo(${id})">Delete</button>
                        `
                    )
                } else {
                    $('.todo-list').append(
                        `<p>${title}</p>
                        <p>${desc}</p>
                        <p>${date}</p>
                        <p>${formatStatus(status)}</p>
                        <button type="submit" class="edit-todo-btn" onclick="getOneTodo(${id})">Edit</button>
                        <button type="submit" class="delete-todo" onclick="deleteTodo(${id})">Delete</button>
                        `
                    )
                }

            }


        })
        .fail(err => {
            console.log(err, '---- error')
        })
        .always(() => {
            console.log('always')
        })
}

// menampilkan form add todo saat klik tombol add todo
$('.add-todo-btn').click((event) => {
    event.preventDefault()

    $('.register-form').hide()
    $('.login-form').hide()
    getTodoList()
    $('.signout-btn').show()
    $('#add-todo').show()
    $('.todo-list').show()
})

// add todo dengan klik tombol add setelah isi form add todo
function addTodo() {
    $('.add-todo-confirm').click((event) => {
        event.preventDefault()

        // mengambil data dari form dan create pada server di database
        let id = null
        const title = $('.add-title').val()
        const due_date = $('.add-date').val()
        const description = $('.add-description').val()

        $.ajax({
            method: 'POST',
            url: `${baseURL}/todos`,
            headers: { access_key: localStorage.access_token },
            data: { title, due_date, description }
        })
            .done(response => {
                console.log(response, '--- response saat create')

                id = response.id
                console.log('fakta angka setelah add di bawah ini:')
                factNumber(id)

                checkAuth()
            })
            .fail(err => {
                console.log(err, '----- err saat create')
            })
            .always(() => {
                console.log('always')

                $('.add-title').val('')
                $('.add-date').val('')
                $('.add-description').val('')
            })
    })
}

// fungsi mendapatkan 1 todo untuk populate form
function getOneTodo(id) {
    $('.register-form').hide()
    $('.login-form').hide()
    getTodoList()
    $('.signout-btn').show()
    $('#add-todo').hide()
    $('.todo-list-full').hide()
    $('.edit-todo').show()

    $.ajax({
        method: 'GET',
        url: `${baseURL}/todos/${id}`,
        headers: { access_key: localStorage.access_token }
    })
        .done(response => {
            console.log(response, '--- response saat edit')
            // manipulasi DOM

            $('.edit-title').val(response.title)
            $('.edit-date').val(response.due_date.split('T')[0])
            $('.edit-description').val(response.description)

            editTodo(+response.id)
        })
        .fail(err => {
            console.log(err, '----- err saat edit')
        })
        .always(() => {
            console.log('always')
        })
}

// edit todo list dengan klik tombol edit
function editTodo(id) {
    $('.edit-todo-confirm').click((event) => {
        event.preventDefault()

        const title = $('.edit-title').val()
        const due_date = $('.edit-date').val()
        const description = $('.edit-description').val()

        $.ajax({
            method: 'PUT',
            url: `${baseURL}/todos/${id}`,
            headers: { access_key: localStorage.access_token },
            data: { title, due_date, description }
        })
            .done(response => {
                checkAuth()
                console.log(response, '----- ini setelah edit')
            })
            .fail(err => {
                console.log(err)
            })
            .always(() => {
                console.log('always')
            })
    })
}

// mengubah status yg belom selesai
function changeStatus(id) {
    $.ajax({
        method: 'PATCH',
        url: `${baseURL}/todos/${id}`,
        headers: { access_key: localStorage.access_token }
    })
        .done(response => {
            randomQuote(id)

            checkAuth()
            console.log(response, '----- ini setelah update status')
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => {
            console.log('always')
        })
}

// delete todo
function deleteTodo(id) {
    $.ajax({
        method: 'DELETE',
        url: `${baseURL}/todos/${id}`,
        headers: { access_key: localStorage.access_token }
    })
        .done(response => {
            console.log(response)
            checkAuth()
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => {
            console.log('always')
        })
}

// handle tombol cancel
$('.cancel-btn').click((event) => {
    event.preventDefault()

    checkAuth()
})