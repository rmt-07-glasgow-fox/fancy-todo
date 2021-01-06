
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
        localStorage.setItem('access_token',response.access_token)
        homePage()
    })
    .fail((xhr,textstatus) => {
        console.log(xhr,textstatus)
    })
    .always(_ => {
        $("#email").val("")
        $("#password").val("")
    })
}

function fetchData(){
    $("#list-todos").empty()
    $.ajax({
        url: "http://localhost:3000/todos",
        method: "GET",
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        console.log(response)
        for(let i  = 0; i < response.length; i++){
            $("#list-todos").append(` <div id="title-todo" class="flex mx-auto">
            <h5 class="card-title">${i + 1}. ${response[i].title}</h5>
            </div>
            <div id="info-todo">
                <div class="card-body">
                    <p class="card-text">${response[i].description}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="mx-auto list-group-item"><b>status:</b> ${response[i].status}</li>
                    <li class="mx-auto list-group-item"><b>due date:</b> ${response[i].due_date.slice(0,10)}</li>
                </ul>
            </div>
            <div class="mx-auto card-body">
                <button onclick="formEditTodo(${response[i].id})" type="button" class="btn btn-primary btn-sm">&#128393; edit</button>
                <button id="myBtn" onclick="deleteTodo(${response[i].id})" type="button" class="btn btn-danger btn-sm">&#128465; delete</button>
            </div>`)
        }
    })
    .fail(error => {
        console.log(error)
    })
}


$(document).ready(function(){
    if(localStorage.getItem('access_token')){
        homePage()
    } else {
        loginPage()
    }
    $("#form-login").on("submit", function(e){
        e.preventDefault();
        login()
    });
    $("#logout-btn").click(function(e){
        e.preventDefault();
        localStorage.removeItem('access_token')
        loginPage()
    });
});

function loginPage () {
    $("#login").show();
    $("#homePage").hide();
}
function homePage () {
    $("#login").hide();
    $("#homePage").show();
    fetchData()
}