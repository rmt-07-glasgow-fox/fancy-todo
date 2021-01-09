const baseUrl = "http://localhost:3000"

$(document).ready(function(){
    preventDefault()
    // show("login")
    checkAuthentication()
})

$(".register-link").click(()=>{
    show("register")
})

$(".login-link").click(()=>{
    show("login")
})

$("#btn-login").click(()=>{
    login()
})

$("#btn-register").click(()=>{
    register()
})

$("#btn-logout").click(()=>{
    localStorage.access_token = ''
    if(localStorage.signGoogle){
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        console.log('User signed out.');
        });
        localStorage.signGoogle = ''
    }

    checkAuthentication()
})

$("#btn-showAdd").click(()=>{
    $("#form-add").fadeToggle(300)
})

$("#btn-addTodo").click(()=>{
    let title = $("#addTitleTodo").val()
    let description = $("#addDescriptionTodo").val()
    let due_date = $("#addDueDate").val()
    let status = false
    $.ajax({
        method : 'POST',
        url : baseUrl+'/todos/',
        headers: {
            access_token: localStorage.access_token
        },
        data : {
            title,
            description,
            due_date,
            status
        }
    })
    .done(response=>{
        console.log(response);
        checkAuthentication()
    })
    .fail(err=>{
        console.log(err);
    })
    $("#addTitleTodo").val('')
    $("#addDescriptionTodo").val('')
    $("#addDueDate").val('')

})

function Weather(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
            const lat = position.coords.latitude
            const lon = position.coords.longitude

            $.ajax({
                method : 'GET',
                url : baseUrl+'/weather',
                headers: {
                    access_token: localStorage.access_token
                },
                data : {
                    lat,
                    lon
                }
            })
            .done(response=>{
                $("#weather-data").html(`
                <p class="card-text">
                ${response.name}, ${response.sys.country} <br>
                <span style="font-size: 40px !important;">${Math.round((response.main.temp-273)*10)/10+"°C" }</span> <br>
                ${response.weather[0].main}
                </p>`)
            })
            .fail(err=>{

            })
        });
    } else {}
}

function getTodo(){
    $.ajax({
        method : 'GET',
        url : baseUrl+'/todos',
        headers: {
            access_token: localStorage.access_token
        },
    })
    .done(response=>{
        console.log(response);
        $(".wrapper-todo").empty()
        let wrapperTodo = ''
        for (let i = 0; i < response.length; i++) {
            const el = response[i];
            let {id,title,description,status,due_date,strDate} = el

            status = (due_date<=Date.now())? 'missed' : status? 'done' : 'not yet'

            const content = `
            <div class="card col" style="width: 18rem;">                        
                <div class="card-body">
                    <p class="card-title">${title}</p>
                    <hr>
                    <p class="card-text">${description}</p>
                    <hr>
                    status : ${status} <br>
                    due : ${strDate}
                    <hr>
                    <a class="link-primary">edit</a> | 
                    <a class="link-danger" onClick="deleteTodo(${id})">delete</a>
                    
                </div>
            </div>
            `

            if(i%3 === 0 && i!==0){
                wrapperTodo+=`
                </div>
                <div class="row">
                 ${content}
                `
            }else if(i===0){
                wrapperTodo+=`
                <div class="row">
                ${content}

                `
            }else{
                wrapperTodo+=content
            }
        }
        $(".wrapper-todo").append(`${wrapperTodo} </div>`)
    })
    .fail(err=>{
        console.log(err);
    })
}

function deleteTodo(id){
    $.ajax({
        method : 'DELETE',
        url : baseUrl+'/todos/'+id,
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(response=>{
        console.log(response);
        checkAuthentication()
    })
    .fail(err=>{
        console.log(err);
    })
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method:'POST',
        url:'http://localhost:3000/googleSign',
        data:{token:id_token},
        success:(response)=>{
            localStorage.access_token = response.access_token
            localStorage.signGoogle = "yes"
            checkAuthentication()
        }
    })
}
function login(){
    const email = $("#emailLogin").val()
    const password = $("#passwordLogin").val()
    console.log(email,password);
    $.ajax({
        method : 'POST',
        url : `${baseUrl}/login`,
        data : {
            email,
            password
        }
    })

    .done(response=>{
        localStorage.access_token = response.access_token
        checkAuthentication()
    })
    .fail(err=>{
        console.log(err);
    })
}

function register(){
    const email = $("#emailRegister").val()
    const password = $("#passwordRegister").val()
    console.log(email,password);
    $.ajax({
        method : 'POST',
        url : `${baseUrl}/register`,
        data : {
            email,
            password
        }
    })

    .done(response=>{
        checkAuthentication()
    })
    .fail(err=>{
        console.log(err);
    })
}



function preventDefault(){
    $("button").click((event)=>{
        event.preventDefault()
    })
    $("a").click((event)=>{
        event.preventDefault()
    })
}

function checkAuthentication(){
    if (localStorage.access_token){
        show("content")
    }else{
        show("login")
    }
}

function show(option){
    switch (option) {
        case "login":
            $("#emailLogin").val('')
            $("#passwordLogin").val('')
            $("#login-form").show();
            $("#register-form").hide();
            $(".content").hide();
            $("#btn-logout").hide()
            break;
        case "register":
            $("#emailRegister").val('')
            $("#passwordRegister").val('')
            $("#login-form").hide();
            $("#register-form").show();
            $(".content").hide();
            $("#btn-logout").hide()
            break;
        case "content":
            $("#login-form").hide();
            $("#register-form").hide();
            $("#form-add").hide()
            Weather()
            getTodo()
            $(".content").show();
            $("#btn-logout").show()
            break;
    }
}