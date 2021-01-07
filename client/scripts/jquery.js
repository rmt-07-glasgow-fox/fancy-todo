$(".register").hide()
$(".main-content").hide()
$("#toRegister").click( () => {
    $(".register").show()
    $(".login").hide()
} )
$("#toLogin").click( () => {
    $(".register").hide()
    $(".login").show()
} )

//user.text()