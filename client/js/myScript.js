const baseUrl = 'http://localhost:3000'
let tableTodo;

$(document).ready(function() {
    if (localStorage.access_token) {
        dashboardPage()
    } else {
        loginPage()
    }
    $("#registerPassword, #registerRepeatPassword").keyup(checkPasswordMatch);

    $('#btnCreate').click(function() {
        $('#mcreate').modal();
    });
});


const tableTodosFetch = () => {
    tableTodo = $('#tableTodo').DataTable({
        destroy: true,
        searchable: true,
        processing: true,
        async: false,
        language: {
            "processing": '<div class="spinner-border text-info m-2" role="status"><span class="sr-only"></span></div></br><div>Tunggu Sebentar yaa...</div>',
        },
        "drawCallback": function() {
            $('.dataTables_paginate > .pagination').addClass('pagination-rounded');
        },
        ajax: {
            method: 'GET',
            url: `${baseUrl}/todos`,
            headers: {
                authorization: localStorage.getItem('access_token')
            },
            error: function(err) {
                toastr.info(`${err.responseJSON.message}`, 'session expired');
                logout()
            }
        },
        columns: [
            { data: 'id', name: 'id', visible: false, searchable: false },
            {
                data: "status",
                render: (data) => {
                    let is_checked = data === true ? "checked" : "";
                    let message = data === true ? "done" : "onProgress";
                    return `<div class="custom-control custom-checkbox small "> <input type="checkbox" ${is_checked} class="custom-control-input" id="customCheck" > <label class="custom-control-label" for="customCheck" > <h6> ${message} </h6> </label> </div >`;
                }
            },
            { data: "title" },
            { data: "description" },
            { data: 'action', name: 'action', orderable: false, searchable: false, defaultContent: '<div class="input-group-btn"><button class="btn btn-warning" id="bedit"><i class="fa fa-pencil-alt"></i></button><button class="btn btn-danger" style="margin-left:5px" id="bdestroy"><i class="fa fa-trash"></i></button> </div>' },
        ],
    });

}

$('#tableTodo tbody').on('click', '#customCheck', function() {
    var id = tableTodo.row($(this).parents('tr')).data().id;
    var status = tableTodo.row($(this).parents('tr')).data().status;

    $.ajax({
        type: "PATCH",
        url: `${baseUrl}/todos/${id}`,
        data: { status: !status },
        headers: {
            authorization: localStorage.access_token
        },
        success: (data) => {
            toastr.success(data.message, 'Success Alert')
            tableTodo.ajax.reload()
        },
        error: (err) => {
            toastr.error(err.message, 'Error Alert')
        }
    });
});

$('#tableTodo tbody').on('click', '#bdestroy', function() {
    const id = tableTodo.row($(this).parents('tr')).data().id;
    Swal.fire({
        title: "Apakah anda yakin?",
        text: "data yang terhapus tidak bisa dikembalikan!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "DELETE",
                url: `${baseUrl}/todos/${id}`,
                headers: {
                    authorization: localStorage.access_token
                },
                success: (data) => {
                    Swal.fire("Done!", "Data Berhasil di hapus!", "success");
                    toastr.success(data.message, 'Success Alert')
                    tableTodo.ajax.reload()
                },
                error: (err) => {
                    Swal.fire("Error deleting!", "Please try again", "error");
                    toastr.error(err.message, 'Error Alert')
                }
            });
        }
    })
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
        tableTodosFetch()
    } else {
        $('#loginEmail').val('')
        $('#loginPassword').val('')
        $('#dashboardPage').hide();
        $('#loginPage').slideDown();
        $('#registerPage').hide();
        $(document.body).addClass('bg-gradient-primary');
    }
}

const refreshTableTodo = () => {
    tableTodo.ajax.reload(null, false);
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