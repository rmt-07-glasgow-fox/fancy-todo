const baseURL = 'http://localhost:1200'

$(document).ready(() => {
    //$('.login-form').hide()
    console.log('page di reload')

    checkAuth()
    addTodo()
})

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

// logout dengan menghapus access token dari storage
$('.signout-btn').click(() => {
    console.log('logout')
    localStorage.clear()
    checkAuth()
})

/* ------------------------------- CRUD DATA : TODO LIST --------------------------------- */

// menampilkan todo list
function getTodoList() {
    $.ajax({
        method: 'GET',
        url: `${baseURL}/todos`,
        headers: { access_key: localStorage.access_token }
    })
        .done(response => {
            // manipulasi DOM
            $('.todo-list').empty()
            //$('.edit-todo').empty()

            for (let i = 0; i < response.length; i++) {
                const id = response[i].id
                const title = response[i].title
                const desc = response[i].description
                const date = response[i].due_date.split('T')[0]

                $('.todo-list').append(
                    `<p>${title}</p>
                    <p>${desc}</p>
                    <p>${date}</p>
                    <button type="submit" class="edit-todo-btn" onclick="getOneTodo(${id})">Edit</button>
                    <button type="submit" class="delete-todo">Delete</button><div class="edit-todo">
                    <form>
                        <div class="form-group">
                            <input type="text" class="edit-title" placeholder="Title">
                            <br><br>
                        </div>
                        <div class="form-group">
                            <input type="date" class="edit-date">
                            <br><br>
                        </div>
                        <div class="form-group">
                            <input type="text" class="edit-description" placeholder="Describe here...">
                            <br><br>
                        </div>
                        <button type="submit" class="edit-todo-confirm">Edit</button>
                        <button type="submit" class="cancel-add">Cancel</button>
                    </form>
                </div><br><br>`
                )

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
        const title = $('.todo-title').val()
        const due_date = $('.todo-date').val()
        const description = $('.todo-description').val()

        $.ajax({
            method: 'POST',
            url: `${baseURL}/todos`,
            headers: { access_key: localStorage.access_token, title, due_date, description }
        })
            .done(response => {
                console.log(response, '--- response saat create')
                checkAuth()
            })
            .fail(err => {
                console.log(err, '----- err saat create')
            })
            .always(() => {
                console.log('always')
            })
    })
}

// fungsi mendapatkan 1 todo untuk populate form
function getOneTodo(id) {
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
            //checkAuth()
        })
        .fail(err => {
            console.log(err, '----- err saat edit')
        })
        .always(() => {
            console.log('always')
        })
}

// edit todo list dengan klik tombol edit
// $('.edit-todo').click((event) => {
//     event.preventDefault()
// })