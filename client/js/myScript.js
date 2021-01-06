const baseUrl = 'http://localhost:3000'
let tableTodo, save_method, method;

$(document).ready(function() {
    if (localStorage.access_token) {
        dashboardPage()
    } else {
        loginPage()
    }
    $("#registerPassword, #registerRepeatPassword").keyup(checkPasswordMatch);

    $('#btnCreate').click(function() {
        $('#modal-todos').modal();
        $('#modal-todos form')[0].reset();
        $('.modal-title').text('Add new todos');
        save_method = "add";
    });

    $('#modal-todos form').on('submit', (e) => {
        if (!e.isDefaultPrevented()) {
            var id = $('#id_todos').val();
            if (save_method == "add") {
                url = `${baseUrl}/todos`;
                method = 'POST';
            } else {
                url = `${baseUrl}/todos/${id}`;
                method = 'PUT';
            }
            $.ajax({
                url,
                method,
                data: $('#modal-todos form').serialize(),
                dataType: 'JSON',
                headers: {
                    authorization: localStorage.access_token
                },
                success: (data) => {
                    if (save_method == "add") {
                        toastr.success('Data Berhasil di Simpan!', 'Success Alert', { timeOut: 4000 });
                    } else {
                        toastr.success('Data Berhasil di update!', 'Success Alert', { timeOut: 4000 });
                    }
                    $('#modal-todos').modal('hide');
                    tableTodo.ajax.reload(null, false);
                },
                error: (err) => {
                    if (err.responseJSON.message === 'jwt expired') {
                        toastr.info(`${err.responseJSON.message}`, 'session expired');
                        $('#modal-todos').modal('hide');
                        logout()
                    } else {
                        err.responseJSON.message.forEach(el => toastr.warning(el, 'Warning Alert'))
                    }
                }
            });
            return false;
        }
    });
});

const tableTodosFetch = () => {
    tableTodo = $('#tableTodo').DataTable({
        destroy: true,
        searchable: true,
        processing: true,
        async: false,
        order: [],
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
            error: (err) => {
                if (err.responseJSON.message === 'jwt expired') {
                    toastr.info(`${err.responseJSON.message}`, 'session expired');
                    logout()
                }
            }
        },
        columns: [
            { data: 'id', name: 'id', visible: false, searchable: false },
            { data: "title" },
            { data: "description" },
            {
                data: "due_date",
                render: function(data) {
                    return formatDate(data)
                }
            },
            {
                data: 'status',
                render: function(data) {
                    if (data === true) {
                        return 'Done'
                    } else {
                        return 'On Going'
                    }
                }
            },
            {
                data: 'action',
                name: 'action',
                orderable: false,
                searchable: false,
                render: function(data, type, row) {
                    return `<div class="input-group-btn"><button class="btn btn-warning" id="bedit"><i class="fa fa-pencil-alt"></i></button><button class="btn btn-danger" style="margin-left:5px" id="bdestroy"><i class="fa fa-trash"></i></button> <button class="btn btn-info" style="margin-left:5px" id="bIsDone"> ${(row['status'] === true) ? 'make on going' : 'make done'}</button>  </div>`
                }
            },
        ],
    });

}

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
}

$('#tableTodo tbody').on('click', '#bIsDone', function() {
    var id = tableTodo.row($(this).parents('tr')).data().id;
    var status = tableTodo.row($(this).parents('tr')).data().status;

    console.log(id);

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
            if (err.responseJSON.message === 'jwt expired') {
                toastr.info(`${err.responseJSON.message}`, 'session expired');
                logout()
            }
            toastr.error(err.message, 'Error Alert')
        }
    });
});

$('#tableTodo tbody').on('click', '#bedit', function() {
    const data = tableTodo.row($(this).parents('tr')).data();
    let date = new Date(data.due_date)
    let dateConvert = date.toISOString().split('T')[0]
    save_method = "edit";
    $('#modal-todos form')[0].reset();
    $('#modal-todos').modal('show');
    $('.modal-title').text('Edit data todo');
    $('#id_todos').val(data.id);
    $('#title').val(data.title);
    $('#description').val(data.description);
    $('#due_date').val(dateConvert);
})

$('#tableTodo tbody').on('click', '#bdestroy', function() {
    const id = tableTodo.row($(this).parents('tr')).data().id;
    const title = tableTodo.row($(this).parents('tr')).data().title;

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
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
                    if (err.responseJSON.message === 'jwt expired') {
                        toastr.info(`${err.responseJSON.message}`, 'session expired');
                        logout()
                    }
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
            localStorage.setItem('access_token', data.access_token)
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