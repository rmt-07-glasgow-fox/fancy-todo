$(document).ready(function(){
    if(localStorage.access_token){
        listpage()
    } else {
        homepage()
    }
})
  