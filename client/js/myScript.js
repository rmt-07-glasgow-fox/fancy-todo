const baseUrl = 'http://localhost:3000'
let tableTodo, save_method, method;

$(document).ready(function() {
    if (localStorage.access_token) {
        $('span#fullname').html(localStorage.fullname)
        dashboardPage()
    } else {
        loginPage()
    }
    $("#registerPassword, #registerRepeatPassword").keyup(checkPasswordMatch);

    $('#btnCreate').click(function() {
        $('#modal-todos').modal();
        $('#modal-todos form')[0].reset();
        $('.modal-title').text('Add new todos');
        $('#movieId').empty();
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

const select2Movie = () => {
    $('select#movieId').select2({
        allowClear: true,
        dropdownParent: $("#modal-todos"),
        placeholder: 'Select Movie',
        minimumInputLength: 1,
        ajax: {
            url: `${baseUrl}/todos/movies/popular`,
            dataType: 'json',
            headers: {
                authorization: localStorage.access_token
            },
            data: function(params) {
                return {
                    search: $.trim(params.term),
                    page: params.page || 1
                };
            },
            processResults: function(data) {
                data.page = data.page || 1;
                return {
                    results: data.results.map(function(item) {
                        return {
                            id: item.id,
                            text: item.title
                        };
                    })
                }
            },
            cache: true
        }
    });
}

const tableTodosFetch = () => {
    tableTodo = $('#tableTodo').DataTable({
        destroy: true,
        searchable: true,
        processing: true,
        responsive: true,
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
            {
                data: 'action',
                name: 'action',
                orderable: false,
                searchable: false,
                render: function(data, type, row) {
                    return `<div class="input-group-btn">
                            ${(row['status'] === true) ? '' : '<button class="btn btn-sm btn-warning" id="bedit"><i class="fa fa-pencil-alt"></i></button>'}
                            <button class="btn btn-sm btn-danger"  id="bdestroy"><i class="fa fa-trash"></i></button> 
                            <button class="btn btn-sm btn-info"  id="bIsDone"> ${(row['status'] === true) ? '<i class="fa fa-times"></i> On Going' : '<i class="fa fa-paper-plane"></i> Done'}</button>  </div>`
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
            { data: "title" },
            { data: "movieName" },
            // { data: "description" },
            {
                data: "due_date",
                render: function(data) {
                    return formatDate(data)
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
    $('select#movieId').select2('trigger', 'select', { 'data': { 'id': data.movieId, 'text': data.movieName } });
})

$('#tableTodo tbody').on('click', '#bdestroy', function() {
    const id = tableTodo.row($(this).parents('tr')).data().id;

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
    $('span#fullname').html(localStorage.fullname)
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
    $('#registerPage').show();
    $(document.body).addClass('bg-gradient-primary');
}

const loginPage = () => {
    if (localStorage.access_token) {
        $('span#fullname').html(localStorage.fullname)
        dashboardPage()
    } else {
        $('#loginEmail').val('')
        $('#loginPassword').val('')
        $('#dashboardPage').hide();
        $('#loginPage').show();
        $('#registerPage').hide();
        $(document.body).addClass('bg-gradient-primary');
    }
}

const todoPage = () => {
    if (localStorage.access_token) {
        $('#todoContent').show();
        $('#dasboardContent').hide();
        tableTodosFetch()
        select2Movie()
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
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
    });
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

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/loginGoogle`,
        data: {
            id_token
        },
        success: (data) => {
            dashboardPage()
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('fullname', data.fullname)
            $('span#fullname').html(localStorage.fullname)
        },
        error: (err) => {
            toastr.warning(err.responseJSON.message, 'Warning Alert')
        }
    })
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
            localStorage.setItem('fullname', data.fullname)
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