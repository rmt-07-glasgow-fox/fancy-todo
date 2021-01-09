let local_host = 'http://localhost:3000'

$('document').ready(()=>{
    checkOut()
})

$('#href-sign-up').click(()=>{
    $("#sign-up").show('fast')
    $("#sign-in").hide('fast')
})

$('#href-sign-in').click(()=>{
    $("#sign-in").show('fast')
    $("#sign-up").hide('fast')
})

$("#btn-sign-out").click(event =>{
    event.preventDefault()
    localStorage.clear()
    checkOut()
})

$("#btn-sign-in").click(event =>{
    event.preventDefault()
    signIn()
})

$("#btn-sign-up").click(event =>{
    event.preventDefault()
    signUp()
})

$('#btn-add-todo').click(()=>{
    $('#add-todo').show('fast')
    $('#todo').hide('fast')
})

$('#btn-close-add-todo').click(()=>{
    checkOut()
})

$('#btn-close-edit-todo').click((event)=>{
    checkOut()
})

$('#btn-submit-todo').click(event =>{
    event.preventDefault()
    submitTodo()
})

$('#btn-update-todo').click(event =>{
    event.preventDefault()
    updateTodo()
})
    
$('#todo').on('click','#btn-delete-todo', deleteTodo)
$('#todo').on('click','#btn-patch-todo', patchTodo)
$('#todo').on('click','#btn-edit-todo', editTodo)

function deleteTodo(event) {
    event.preventDefault()
    let id = $(this).val()
    $.ajax({
        method: 'DELETE',
        url: `${local_host}/todos/${id}`,
        data: {id},
        headers: {accessToken: localStorage.accessToken}
    })
    .done(res=>{
        $("#todo").hide('fast')
        checkOut()
    })
    .fail(err=>{
        alert(err.responseText)
    })
}

function editTodo(event) {
    event.preventDefault()
    let id = $(this).val()
    $.ajax({
        method: 'GET',
        url: `${local_host}/todos/${id}`,
        data: {id},
        headers: {accessToken: localStorage.accessToken}
    })
    .done(res=>{
        $("#todo").hide('fast')
        $('#edit-todo').show('fast')
        $('#title-edit').val(res.title)
        $('#description-edit').val(res.description)
        $('#status-edit').val(res.status)
        $('#date-edit').val(res.due_date)
        $('#id-todo').val(res.id)
    })
    .fail(err=>{
        alert(err.responseText)
    })
}

function patchTodo(event) {
    let id = $(this).val()
    event.preventDefault()
    $.ajax({
        method: 'PATCH',
        url:`${local_host}/todos/${id}`,
        data: {status: 'DONE'},
        headers: {accessToken: localStorage.accessToken}
    })
    .done(res=>{
        findTodo()
    })
    .fail(err=>{
        alert(err.responseText)
    })
}

function closeAddtodo() {
    $('#add-todo').show('fast')
    $('#todo').hide('fast')
}

function submitTodo() {
    let title = $('#title').val()
    let description = $('#description').val()
    let status = $('#status').val()
    let due_date = $('#date').val()
    
    $.ajax({
        method: 'POST',
        url: `${local_host}/todos`,
        data: {
            title,description,status,due_date
        },
        headers: {accessToken: localStorage.accessToken}
    })
    .done(res=>{
        $('#title').val('')
        $('#description').val('')
        $('#status').val('')
        $('#date').val('')
        checkOut()
    })
    .fail(err=>{
        alert(err.responseText)
    })
}

function updateTodo() {
    let id = $('#id-todo').val()
    let title = $('#title-edit').val()
    let description = $('#description-edit').val()
    let status = $('#status-edit').val()
    let due_date = $('#date-edit').val()

    $.ajax({
        method: 'PUT',
        url: `${local_host}/todos/${id}`,
        data: {
            title,description,status,due_date
        },
        headers: {accessToken: localStorage.accessToken}
    })
    .done(res=>{
        $('#title-edit').val('')
        $('#description-edit').val('')
        $('#status-edit').val('')
        $('#date-edit').val('')
        checkOut()
    })
    .fail(err=>{
        alert(err.responseText)
    })
}

function signIn() {
    let email = $('#email').val()
    let password = $('#password').val()
    $.ajax({
        method: "POST",
        url: `${local_host}/signIn`,
        data: {
            email,password
        }
    })
    .done((res)=>{
        localStorage.setItem('accessToken',res.accessToken)
        $('#email').val('')
        $('#password').val('')
        checkOut()
    })
    .fail(err=>{
        alert(err.responseText)
        $('#password').val('')
    })
}

function signUp() {
    let email = $('#register-email').val()
    let password = $('#register-password').val()
    $.ajax({
        method: "POST",
        url: `${local_host}/signUp`,
        data: {
            email,
            password
        }
    })
    .done((res)=>{
        return $.ajax({
            method: "POST",
            url: `${local_host}/signIn`,
            data: {
                email,
                password
            }
        })
        .done((res)=>{
            localStorage.setItem('accessToken',res.accessToken)
            checkOut()
        })
    })
    .done((res)=>{
        $('#register-email').val('')
        $('#register-password').val('')
    })
    .fail(err=>{
        alert(err.responseText)
        $('#password').val('')
    })
}

function findTodo() {
    $('tbody').empty()
    $.ajax({
        method: "GET",
        url: `${local_host}/todos`,
        headers: {
            accessToken: localStorage.accessToken
        }
    })
    .done((res)=>{
        let i = 0
        res.forEach(e=>{
            i++
            $('tbody').append(
                `<tr>
                    <th scope="row">${i}</th>
                    <td>${e.title}</td>
                    <td>${e.description}</td>
                    <td>${e.due_date}</td>
                    <td>${e.status}</td>
                    <td>
                        <button class="btn btn-outline my-2 my-sm-0 btn-primary" id="btn-edit-todo" value="${e.id}">Edit</button>
                        <button type="submit" class="btn btn-outline my-2 my-sm-0 btn-primary" id="btn-delete-todo" value="${e.id}">Delete</button>
                        <button type="submit" class="btn btn-outline my-2 my-sm-0 btn-primary" id="btn-patch-todo" value="${e.id}">Mark as done</button>
                    </td>
                </tr>`
            )
        })
    })
    .fail(err=>{
        alert(err.responseText)
    })
}

function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    $.ajax({
      method: 'POST',
      url: `${local_host}/signIn/google`,
      data: {
        email: profile.getEmail(),
        password : 'google'
      }
    })
    .done(res => {
      localStorage.setItem('accessToken',res.accessToken)
      checkOut()
    })
    .fail(err => {
        alert(err.responseText)
    })
  }

function checkOut() {
    $("#sign-up").hide()
    $('#add-todo').hide('fast')
    $('#edit-todo').hide('fast')
    if(localStorage.accessToken){
        $("#sign-in").hide('fast')
        $("#todo").show('fast',()=>{
            findTodo()
        })
        $('#btn-sign-out').show()
    } else {
        $("#sign-in").show('fast')
        $("#todo").hide('fast')
        $('#btn-sign-out').hide()
    }
}