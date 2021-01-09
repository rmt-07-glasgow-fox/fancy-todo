$(document).ready(function () {
    if(localStorage.getItem("access_token")){
        showMainPage()
    }
    else{
        showLoginPage()
    }
    $('#update-form').on('submit', function(event) {
        // console.log(event)
        event.preventDefault()
        console.log('wew')
        updateStatus()
    })
    $("#home").on('click', function(event) {
        event.preventDefault()
    })
    $("#cancel-edit").on('click', function() {
        $("#formEdit").hide()
    })
    $("#cancel-add").on('click', function(event) {
        event.preventDefault()
        $('#title-listTodo').show()
        showMainPage()
        $('#form-add').css("display", "none")
    })
    $("#new-task").on('click', function(event){
        event.preventDefault()
        $('#form-add').css("display", "block")
        $('#todo-list').empty()
        $('#title-listTodo').hide()
    })
    // $('#staticBackdrop').on('hidden.bs.modal', function() {
    //     console.log('close', '<<<<<,')
    //     $('#modal-status').empty()
    //     $('.modal-footer').empty()
    // })
    $("#add-form").on("submit", function(event){
        event.preventDefault()
        $('#add-form').css('display', 'none')
        addTodo()
    })
    $("#login-form").on("submit", function(event){
        event.preventDefault()
        login(swal)

          
    })
    $("#edit-form").on("submit", function(event){
        event.preventDefault()
        editTodo()
    })
    $("#delete-todo").on("submit", function(event){
        deleteTodo()
        event.preventDefault()
                  
    })
    $("#register-form").on("submit", function(event) {
        event.preventDefault()
        register()
    })
    $("#btn-logout").on("click", function() {
        logout()
    })
    $('#staticBackdrop').on('hidden.bs.modal', function() {
        console.log('close', '<<<<<,')
        $('.modal-header').empty()
        $('.modal-body').empty()
    })
})