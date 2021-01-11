const baseUrl = "http://localhost:3000"

//per satu page satu function
//munculin error dan success nya pake sweetalert di fail (dalam Swal.fire kalau mau pake )

$(document).ready(() => {
    console.log("Greeting")
    if (!localStorage.access_token) {
        home()
    } else {
        homepage()
    }
})

function home() {
    $("#signup").hide()
    $("#home-card").show()
    $("#signin").hide()
    $("#card-group").show()
    $("#signout-navbar").hide()
    $("#homepage").hide()
}

function signin() {
    $("#signup").hide()
    $("#home-card").hide()
    $("#signin").show()
    $("#card-group").hide()
    $("#signout-navbar").hide()
    $("#homepage").hide()  
}

function signup() {
    $("#signup").show()
    $("#home-card").hide()
    $("#signin").hide()
    $("#card-group").hide()
    $("#signout-navbar").hide()
    $("#homepage").hide()  
}

$("#signup-btn-home").click(() => {
    signup()
})

$("#signin-btn-home").click(() => {
    signin()
})

$("#signup-btn").click((event) => {
    event.preventDefault()
    const email = $("#email-signup").val()
    const password = $("#password-signup").val()
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/signUp`,
        data: {email, password}
    })
    .done(response => {
        Swal.fire({
            title: 'Success!',
            text: 'Account successfully registered',
            icon: 'success'
        })
        signin()
    })
    .fail(err => {
        let errMessage = err.responseJSON.message.split("Validation error:").join("\n")
        Swal.fire({
            title: 'Error!',
            text: errMessage,
            icon: 'error',
        })
    })
    .always(() => {
        $("#email-signin").val('')
        $("#password-signin").val('')
    })
})

$("#signin-btn").click((event) => {
    event.preventDefault()
    const email = $("#email-signin").val()
    const password = $("#password-signin").val()
    console.log(email, password)
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/signIn`,
        data: {email, password}
    })
    .done(response => {
        console.log(response)
        Swal.fire({
            title: 'Logged In!',
            icon: 'success',
        })

        localStorage.setItem('access_token', response.access_token)
        localStorage.setItem('UserId', response.id)
        homepage()
    })
    .fail(err => {
        let errMessage = err.responseJSON.message.split("Validation error:").join("\n")
        Swal.fire({
            title: 'Error!',
            text: errMessage,
            icon: 'error',
        })
    })
    .always(() => {
        $("#email-signin").val('')
        $("#password-signin").val('')
    })
})

function homepage() {
    $("#edit-plan-form").hide()
    $("#homepage").show()
    $("#add-plan-section-intro").show()
    $("#plan-list").show()
    $("#signup").hide()
    $("#home-card").hide()
    $("#signin").hide()
    $("#card-group").hide()
    $("#signup-btn-home").hide()
    $("#signout-navbar").show()
    $("#add-plan-section-fill").hide()
    getTodos()
    // getFood()
   
}

$("#add-plan").click(() => {
    $("#plan-list").hide()
    $("#add-plan-section-intro").hide()
    $("#add-plan-section-fill").show()
})


$("#diet-type-btn").click((event) => {
    event.preventDefault()
    const diet = $("#type-diet").val()
    console.log(diet)
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/food`,
        headers: {access_token: localStorage.access_token},
        data: {diet}
    })
    .done(response => {
        $('#food-table').empty()
        response.forEach(el => {
            $('#food-table').append(`
            <div class="card mb-3">
            <img src="${el.image}" class="card-img-top" style="border: 1px solid #ddd;border-radius: 4px;padding: 5px;width: 150px;">
            <div class="card-body">
              <h5 class="card-title">${el.recipe}</h5>
              <p class="card-text">Category: ${el.category.join("\n")}</p>
              <p class="card-text">Ingredients: ${el.ingredients.map(el => {return JSON.stringify(el.text)})}</p>
              <p class="card-text">Calories: ${el.calories}</p>
              <p class="card-text">Total Weight: ${el.totalWeight}</p>
            </div>
            </div>
            
            `)
        });
    })
    .fail(err => {
        console.log(err)
    })

})


function getTodos() {
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/todos`,
        headers: {access_token: localStorage.access_token},
    })
    .done(response => {
        console.log(response)
        $('#plan-list').empty()
        response.forEach(el => {
            $('#plan-list').append(`
            <div class="card-body text-primary">
              <h5 class="card-title">${el.title}</h5>
              <p class="card-text">${el.description}</p>
              `+ (!el.status ? '<p class="card-text">Ingredients prep: Uncomplete</p>' : '<Ingredients prep: Complete>') +`
              <p class="card-text">Due date: ${el.due_date}</p>
              <a href="#" class="btn btn-primary" id="edit-plan" onclick="editToDo(${el.id})">Edit</a>
              <a href="#" class="btn btn-primary" id="edit-status" onclick="editStatus(${el.id})">Preparation complete</a>
              <button type="button" class="btn btn-danger" onclick="deletePlan(${el.id})">Delete</button>
            </div>
            `)
        });
    })
    .fail(err => {
        console.log(err)
    })
}

$("#add-plan-btn").click((event) => {
    event.preventDefault()
    const title = $("#title").val()
    const description = $("#description").val()
    const due_date = $("#due_date").val()
    const UserId = localStorage.UserId
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/todos`,
        headers: {access_token: localStorage.access_token},
        data: {title, description, UserId, due_date, UserId}
    })
    .done(response => {
        Swal.fire({
            title: 'Success!',
            text: 'Plan added',
            icon: 'success',
        })
        homepage()
        
    })
    .fail(err => {
        let errMessage = err.responseJSON.message.split("Validation error:").join("\n")
        Swal.fire({
            title: 'Error!',
            text: errMessage,
            icon: 'error',
        })
    })
    .always(() => {
        $("#title").val('')
        $("#description").val('')
        $("#due_date").val('')
    })
})


function editToDo(id) {
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/todos/${id}`,
        headers: {access_token: localStorage.access_token},
    })
    .done(response => {
        console.log(response.UserId)
        console.log(+localStorage.UserId)
        if (response.UserId !== +localStorage.UserId) {
            throw new Error ("access denied")
        } else {
            $("#plan-list").hide()
            $("#add-plan-section-intro").hide()
            $("#add-plan-section-fill").hide()
            $("#edit-plan-form").show()
            $('#edit-plan-form').empty()
                $('#edit-plan-form').append(`
                <div class="card-body">
                <h5 class="card-title">Edit Plan</h5>
                <form class="row gy-2 gx-3 align-items-center" id="add-plan-form">
                <div class="col-auto">
                  <label class="visually-hidden" for="autoSizingInput">Title</label>
                  <input type="text" class="form-control" id="title" placeholder="Title" value="${response.title}">
                </div>
                <div class="col-auto">
                  <label class="visually-hidden" for="autoSizingInput">Description</label>
                  <input type="text" class="form-control" id="description" value="${response.description}">
                </div>
                <div class="form-group row">
                  <label for="example-date-input" class="col-2 col-form-label">~</label>
                  <div class="col-10">
                    <input class="form-control" type="date" id="due_date" value="${response.due_date}">
                  </div>
                </div>
                <div class="col-auto">
                  <button type="submit" class="btn btn-primary" onclick="editPlan(${response.id})">Edit plan</button>
                </div>
              </form>
              </div>
              </div>
            `)
        }
    })
    .fail(err => {
        Swal.fire({
            title: 'Error!',
            text: "Access Denied",
            icon: 'error',
        })
    })
    
}

function editPlan(id) {
    const title = $("#title").val()
    const description = $("#description").val()
    const due_date = $("#due_date").val()
    $.ajax({
        method: 'PUT',
        url: `${baseUrl}/todos/${id}`,
        headers: {access_token: localStorage.access_token},
        data: {title, description, due_date}
    })
    .done(response => {
        homepage()
        
    })
    .fail(err => {
        console.log(err)
    })
    .always(() => {
        $("#title").val('')
        $("#description").val('')
        $("#due_date").val('')
    })
}


function editStatus(id) {
    $.ajax({
        method: 'PATCH',
        url: `${baseUrl}/todos/${id}`,
        headers: {access_token: localStorage.access_token},
        data: {status: true}
    })
    .done(response => {
        homepage()
        
    })
    .fail(err => {
        Swal.fire({
            title: 'Error!',
            text: "Access Denied",
            icon: 'error',
        })
    })
    .always(() => {

    })
}

function deletePlan(id) {
    $.ajax({
        method: 'DELETE',
        url: `${baseUrl}/todos/${id}`,
        headers: {access_token: localStorage.access_token}
    })
    .done(response => {
        homepage()
        
    })
    .fail(err => {
        console.log(err)
    })
    .always(() => {

    })
}

$("#signout-navbar").click((event) => {
    event.preventDefault()
    localStorage.clear()
    home()
})

function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/loginGoogle`,
        data:{
            id_token
        }
    })
    .done(response =>{
        console.log(response)
        localStorage.setItem('access_token', response.acces_token)
        homepage()
    })
    .fail((xhr,status) =>{
        console.log(status)
    })
}

$('#signout-navbar').click((event) => {
    event.preventDefault()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut()
    .then(function () {
        localStorage.clear()
        console.log('User signed out.');
        login()
    })
    .catch(err=>{
        console.log(err)
    })
})


