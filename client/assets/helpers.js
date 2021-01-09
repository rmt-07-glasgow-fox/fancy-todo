let todoId = null

function showLoginPage(){
    $("#navbar").hide()
    $("#login-page").show()
    $("#register-page").hide()
    $("#list-todo").hide()
    $("#btn-logout").hide()
}
function showMainPage(){
    $("#navbar").show()
    $("#login-page").hide()
    $("#register-page").hide()
    $("#list-todo").show()
    $("#btn-logout").show()
    fetchTodo()
}
function registerPage(){
    $("#navbar").hide()
    $("#login-page").hide()
    $("#register-page").show()
    $("#list-todo").hide()
    $("#btn-logout").hide()
}
function onSignIn(googleUser) {
     // This is null if the 'email' scope is not present.
     const googleToken = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: "POST",
        url: "http://localhost:3000/googleLogin",
        data: { googleToken }
    })
    .done(response => {
        Swal.fire({
            title: "Succes!",
            text: "Login google succes!",
            icon: "success",
            button: "Ok!",
        });
        localStorage.setItem('access_token', response.access_token)
        showMainPage()
    })
    .fail(xhr => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
        })
        console.log(xhr, "<<< error")
    })
}
function login(swal){
    console.log(swal, "<<<< swal bosss")
    const email = $("#email-login").val()
    const password = $("#password-login").val()
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/login",
        data: {
            email,
            password
        }
    })
    .done(response => {
        Swal.fire({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success",
            button: "Aww yiss!",
          });
        console.log(response)
        localStorage.setItem('access_token', response.access_token)
        showMainPage()
    })
    .fail((xhr, textStatus) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
        })
        console.log(xhr.responseJSON.message)
    })
    .always(xhr => {
        $("#email-login").val('')
        $("#password-login").val('')
    })
}
function register(){
    const email = $("#email-regis").val()
    const password = $("#password-regis").val()
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/register",
            data: {
                email,
                password
            }
        })
        .done(response => {
            console.log(response)
            showLoginPage()
        })
        .fail((xhr, textStatus) => {
            console.log(textStatus)
        })
}
function logout(){
    localStorage.clear()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    showLoginPage()
}
function fetchTodo(){
    $("#todo-list").empty()
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/todos",
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
    .done(response => {
        response.forEach(element => {
            $("#todo-list").append(`
            <div class="col-3">
                <div class="card mt-5" style="width: 19rem;">
                <div class="card-body">
                <h5 class="card-title">Title:  ${element.title}</h5>
                </div>
                <ul class="list-group list-group-flush">
                <li class="list-group-item">Due Date:  ${element.due_date.substr(0, 10)}</li>
                <li class="list-group-item">Description:  ${element.description}</li>
                <li class="list-group-item">status:  ${element.status}</li>
                </ul>
                <div class="card-body">
                <button class="btn btn-outline-primary ms-3" onclick="editTodoForm(${element.id})" id="edit-todo"> Edit</button>
                <button class="btn btn-outline-secondary ms-2" onclick="updateStatusForm(${element.id})" id="update-todo"> Update</button>
                <button class="btn btn-outline-danger ms-2" onclick="deleteTodo(${element.id})" id="delete-todo"> Delete</button> 
                </div>
                </div>
            <div>
            `)
        });
       
    })
}
function addTodo(){
    const title = $("#title-add").val()
    const due_date = $("#due_date-add").val()
    const description = $("#add-description").val()
    const status = $("#status-add").val()
    statusTodo = status

    
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/todos",
        headers: {
            access_token: localStorage.getItem("access_token")
        },
        data: {
            title,
            due_date,
            description,
            status
        }
    })
    .done(response => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `Todo ${response.title} Success Add`,
            showConfirmButton: false,
            timer: 1500
          })
        fetchTodo()
        console.log(response)
    })
    .fail(xhr => {
        console.log(xhr.responseJSON.message)
        Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Cool'
        })
        $('#add-form').show()
        console.log(xhr)
    })
    .always(_ => {
        $("#title-add").val('')
        $("#due_date-add").val('')
        $("#add-description").val('')
        $("#status-add").val('')
    })
    $.ajax({
        method: "get",
        url: 'http://localhost:3000/api/jooks',
        headers:{
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(response => {
            console.log(response)
            response.value.forEach(el => {
                $('#title-modal').append(`
                    Jooks
                `)
                $('.modal-body').append(`
                    <h5>${el.joke}</h5>
                `)
            })
        })
        .fail(xhr => {
            console.log(xhr)
        })
}
function cancelEdit(event){
    event.preventDefault()
    console.log(event)
    $("#new-task").show()
    $("#title-listTodo").show()
    $("#todo-list").show()
    $("#edit-form").empty()
}
function updateStatusForm (id) {
    todoId = id
    console.log(id)
    $.ajax({
        method: 'get',
        url: `http://localhost:3000/todos/${todoId}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
        .done(response => {
            $('#new-task').hide()
            $('#title-listTodo').hide()
            $('#todo-list').hide()
            console.log(response)
            $('#update-form').append(`
                <h3 class="mt-5 mb-4 text-center">Update Status </h3>
                <form id="update-status-todo">
                    <div class="form group form-floating mt-2 mb-2" id="floating-status">
                    <select id="status-update" class="form-select">
                    <option value="unfinised" ${response.status === "unfinised" ? 'selected' : ''}>unfinised</option>
                    <option value="finised" ${response.status === "finised" ? 'selected' : ''}>finished</option>
                    </select>
                    <label for="status-edit" class="">Status</label>
                </div>
                <button id="update-submit" class="btn btn-outline-primary mb-2" type="submit"> Submit</button>
                </form>
            
            `)
        })
        .fail(xhr => {
            console.log(xhr)
        })
}
function updateStatus(id) {
    const status = $('#status-update').val()
    console.log(status, "<<<<<<<<")
    todoId = id
    console.log(todoId, '<<<< update status')
    $.ajax({
        method: 'patch',
        url: `http://localhost:3000/todos/${todoId}`,
        headers: {
            access_token: localStorage.getItem('access_token')
        },
        data: {
            status
        }
    })
        .done(response => {
            $("#new-task").show()
            $("#title-listTodo").show()
            $("#todo-list").show()
            $("#update-form").empty()
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Todo ${response.title} Success updated`,
                showConfirmButton: false,
                timer: 1500
            })
        })
        .fail(xhr => {
            console.log(xhr)
        })
}
function editTodoForm(id){
    todoId = id
    console.log(todoId)
    $.ajax({
        method: "GET",
        url: `http://localhost:3000/todos/${todoId}`,
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
    .done(response => {
        console.log(response.title)
        $("#new-task").hide()
        $("#title-listTodo").hide()
        $("#todo-list").hide()
        $("#edit-form").append(`
        <form id="formEdit mt-2">
            <div class="row">
            <h3 class="mt-5 mb-4">Edit Todo</h3>
            <div class="col form-floating">
            <input type="text" class="form-control title" id="titleEdit" value="${response.title}">
            <label for="titleEdit" class="ms-3"> Title </label>
            </div>
            <div class="col form-floating">
            <input type="date" class="form-control due_date" placeholder="due date" id="dueDateEdit" value="${response.due_date.split('T')[0]}">
            <label for="dueDateEdit" class="ms-3">Due-Date</label>
            </div>
            <div class="form-group form-floating w-100 mt-2">
                <textarea class="form-control description" id="descriptionEdit" rows="3" placeholder="Description Here....">${response.description}</textarea>
                <label for="descriptionEdit" class="ms-3">Description</label>
                </div>
                <div class="form group form-floating mt-2 mb-2" id="floating-status">
                <select id="status-edit" class="form-select">
                <option value="unfinised" ${response.status === "unfinised" ? 'selected' : ''}>unfinised</option>
                <option value="finised" ${response.status === "finised" ? 'selected' : ''}>finished</option>
                </select>
                <label for="status-edit" class="ms-3">Status</label>

               </div>
         </div>
                <button type="submit" class="btn btn-outline-primary ms-3" id="edit-todo">Edit</button>
                <button id="cancel-edit" onclick="cancelEdit(event)" class="btn btn-outline-danger">Cancel</button>
            </form>
        `)  
        
    })
    .fail(xhr => {
        console.log(xhr)
    })
}

function editTodo(){
    const title = $("#titleEdit").val()
    const due_date = $("#dueDateEdit").val()
    const description = $("#descriptionEdit").val()
    const status = $("#status-edit").val()
    console.log(status, description, due_date, title, "<<<< edit todo") 
    $.ajax({
        method: "PUT",
        url: "http://localhost:3000/todos/" + todoId,
        headers: {
            access_token: localStorage.getItem("access_token")
        },
        data: { 
            title,
            due_date,
            description,
            status
        }
    })
    .done(response => {
        $("#new-task").show()
        $("#title-listTodo").show()
        $("#todo-list").show()
        $("#edit-form").empty()
        fetchTodo()
        console.log(response)
    })
    .fail(xhr => {
        console.log(xhr)
    })
}
function deleteTodo(id){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-outline-primary ms-3',
          cancelButton: 'btn btn-outline-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            let todo= null
           
            $.ajax({
                method: "get",
                url: "http://localhost:3000" + "/todos/" + id,
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .done(response => {
                    todo = response.title
                })
                .fail(xhr => {
                    console.log(xhr)
                })
            $.ajax({
                method: "delete",
                url: "http://localhost:3000" + "/todos/" + id,
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .done(_ => {
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        `Todo ${todo} has been deleted`,
                        'success'
                    )
                    fetchTodo()
                })
                .fail(xhr => {
                    swalWithBootstrapButtons.fire(
                        'Ops',
                        'Todo Not found :)',
                        'error'
                    )
                    console.log(xhr)
                })
          
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your Todo is safe :)',
            'error'
          )
        }
      })
}