const baseUrl = 'http://localhost:3000'
let tableTodo;

$(document).ready(function() {
    if (localStorage.access_token) {
        dashboardPage()
        tableTodo = $('#tableTodo').DataTable({
            searchable: true,
            processing: true,
            language: {
                "processing": '<div class="spinner-border text-info m-2" role="status"><span class="sr-only"></span></div></br><div>Tunggu Sebentar yaa...</div>',
                "paginate": {
                    "previous": "<i class='uil uil-angle-left'>",
                    "next": "<i class='uil uil-angle-right'>"
                }
            },
            "drawCallback": function() {
                $('.dataTables_paginate > .pagination').addClass('pagination-rounded');
            },
            ajax: {
                method: 'GET',
                url: `${baseUrl}/todos`,
                headers: {
                    authorization: localStorage.access_token
                },
            },
            columns: [
                { "data": "id" },
                { "data": "title" },
                { "data": "description" },
                { "data": "status" }
            ]
        });
        console.log(tableTodo);
    } else {
        loginPage()
    }
    $("#registerPassword, #registerRepeatPassword").keyup(checkPasswordMatch);
});

const dashboardPage = () => {
    $('#dashboardPage').show();
    $('#dasboardContent').show();
    $('#todoContent').hide();
    $('#loginPage').hide();
    $('#registerPage').hide();
    document.body.className = document.body.className.replace("no-javascript", "");
}

const registerPage = () => {
    $('#registerFirstName').val('')
    $('#registerLastName').val('')
    $('#registerEmail').val('')
    $('#registerPassword').val('')
    $('#registerRepeatPassword').val('')
    $("#checkPasswordMatch").html("");
    $('#dashboardPage').hide();
    $('#loginPage').hide();
    $('#registerPage').slideDown();
    $(document.body).addClass('bg-gradient-primary');
}

const loginPage = () => {
    if (localStorage.access_token) {
        dashboardPage()
    } else {
        $('#loginEmail').val('')
        $('#loginPassword').val('')
        $('#dashboardPage').hide();
        $('#loginPage').slideDown();
        $('#registerPage').hide();
        $(document.body).addClass('bg-gradient-primary');
    }
}

const todoPage = () => {
    if (localStorage.access_token) {
        $('#todoContent').show();
        $('#dasboardContent').hide();
        tableTodo.ajax.reload(null, false);
    } else {
        $('#loginEmail').val('')
        $('#loginPassword').val('')
        $('#dashboardPage').hide();
        $('#loginPage').slideDown();
        $('#registerPage').hide();
        $(document.body).addClass('bg-gradient-primary');
    }
}

const logout = () => {
    localStorage.clear()
    $('#logoutModal').modal('hide')
    loginPage()

}

const checkPasswordMatch = () => {
    let password = $("#registerPassword").val();
    let confirmPassword = $("#registerRepeatPassword").val();

    if (password != confirmPassword) {
        $("#btnRegister").prop('disabled', true);
        $("#checkPasswordMatch").html("Passwords do not match!");
    } else if (password === "" && confirmPassword === "") {
        $("#btnRegister").prop('disabled', true);
        $("#checkPasswordMatch").html("");
    } else {
        $("#btnRegister").prop('disabled', false);
        $("#checkPasswordMatch").html("Passwords match.");
    }
}

$('#btnLogin').click((event) => {
    event.preventDefault()
    let email = $('#loginEmail').val()
    let password = $('#loginPassword').val()

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/login`,
        data: {
            email,
            password
        },
        success: (data) => {
            localStorage.setItem('access_token', data.token)
            dashboardPage()
        },
        error: (err) => {
            toastr.warning(err.responseJSON.message, 'Warning Alert')
        }
    })
})

$('#btnRegister').click((event) => {
    event.preventDefault()
    let firstName = $('#registerFirstName').val()
    let lastName = $('#registerLastName').val()
    let email = $('#registerEmail').val()
    let password = $('#registerPassword').val()

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/register`,
        data: {
            firstName,
            lastName,
            email,
            password
        },
        success: (data) => {
            console.log(data);
            loginPage()
        },
        error: (err) => {
            err.responseJSON.message.forEach(el => toastr.warning(el, 'Warning Alert'))
        }
    })
})

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}