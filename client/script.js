$(document).ready(() => {
    console.log('reload')
    let baseURL = 'http://localhost:3000'

    if (localStorage.access_token) {
        showMainPage()
    } else {
        showLoginPage()
    }

    function showMainPage() {
        $('#register-page').hide()
        $('#login-page').hide()
        $('#logout').show()
    }

    function showLoginPage() {
        $('#register-page').hide()
        $('#login-page').show()
        $('#logout').hide()
    }

    function showRegisterPage() {
        $('#register-page').show()
        $('#login-page').hide()
    }

    function getTodoList(){
        
    }

    $('#logout').click((e) => {
        console.log('logout')
        e.preventDefault()

        localStorage.clear()
        showLoginPage()
    })

    $('#toRegisterPage').click((e) => {
        console.log('toRegisterPage')
        e.preventDefault()

        showRegisterPage()
    })

    $('#toLoginPage').click((e) => {
        console.log('toLoginPage')
        e.preventDefault()

        showLoginPage()
    })

    $('#login').click((e) => {
        console.log('login')
        e.preventDefault()

        let email = $('#emailLogin').val()
        let password = $('#passwordLogin').val()
        console.log(email, password)

        // ajax
        $.ajax({
            method: 'POST',
            url: `${baseURL}/login`,
            data: { email, password }
        })
            .done(response => {
                // console.log('>>> response', response)

                if (response.access_token) {
                    localStorage.setItem('access_token', response.access_token)
                    showMainPage()
                } else {
                    console.log(response.message)
                }
            })

            .fail(err => {
                console.log(err.responseJSON.message)
            })

            .always(() => {
                $('#emailLogin').val('')
                $('#passwordLogin').val('')
            })
    })

    $('#register').click((e) => {
        console.log('register')
        e.preventDefault()

        let email = $('#emailRegister').val()
        let password = $('#passwordRegister').val()
        console.log(email, password)

        $.ajax({
            method: 'POST',
            url: `${baseURL}/register`,
            data: { email, password }
        })
            .done(response => {
                console.log('berhasil : ', response)
                showLoginPage()
            })

            .fail(err => {
                console.log(err.responseJSON.message)
            })

            .always(() => {
                $('#emailRegister').val('')
                $('#passwordRegister').val('')
            })
    })
})