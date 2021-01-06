
$(document).ready(function(){
    // $("#form-login").on("submit", function(e){
    //     e.preventDefault();
    //     login()
    // });
    loginPage()
});

function loginPage () {
    $("#login").hide();
    $("#homePage").show();
}

function login(){
    const email = $("#email").val()
    const password = $("#password").val()
    $.ajax({
        url: 'http://localhost:3000/users/login',
        method: 'POST',
        timeout: 1000,
        data: {
            email,
            password
        } 
    })
    .done(response => {
        console.log(response)
        localStorage.setItem('access_token',response.access_token)
    })
    .fail((xhr,textstatus) => {
        console.log(xhr,textstatus)
    })
    .always(_ => {
        $("#email").val("")
        $("#password").val("")
    })
}