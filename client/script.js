const server = 'http://localhost:3000'

const authCheck = () => {
    if(localStorage.access_token){
        $('#register-page').hide()
        $('#login-page').hide()

    }
}

$('#register-btn').click(function(event){
    event.preventDefault()
    let email = $('#email-reg').val()
    let name = $('#name-reg').val()
    let password = $('#password-reg').val()

    $.ajax({
        method: 'POST',
        url: `${server}/register`,
        data: {
            email,
            name,
            password
        }
    })
    .done(response => {
        console.log(response, 'this is response')
    })
    .fail(err => {
        console.log(err, '>>>>>>> this is error')
    })
    .always(() => {
        $('#email-reg').val()
        $('#name-reg').val()
        $('#password-reg').val()
    })
})

const login = (email, password) => {
    $.ajax({
        method: 'POST',
        url: `${server}/login`,
        data : {
            email,
            password
        }
    })
    .done(response => {
        localStorage.setItem("access_token", response.access_token)
    })
    .fail(err => {

    })
    .always(() => {

    })
}



$(document).ready(function(){
    console.log('Greetings My lords')
    authCheck()
});


