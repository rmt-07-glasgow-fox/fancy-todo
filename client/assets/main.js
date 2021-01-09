$(document).ready(function(){
    if(localStorage.access_token){
        listpage()
    } else {
        homepage()
    }

    $("#signup").on("submit", function(e) {
        e.preventDefault()
        signup()
        loginpage()
    })

    $("#login").on("click", function(e) {
        e.preventDefault()
        login()
    })

    $("#create").on("click", function(e) {
        // e.preventDefault()
        createTodo()
    })

    $("#logout").on("click", function(e) {
        e.preventDefault()
        logout()
    })

    $("#save").on("click", function(e) {
        e.preventDefault()
        saveEdit()
    })
})
  