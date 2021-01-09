<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Glasgow Movies</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="./style.css">
</head>
<body>

    <!-- LOGIN PAGE -->

    <!-- <div id="auth-page">
        <div id="login-page" class="card mt-4 text-center">
            <h4>Log In</h4>
            <div class="text-center intro"> <img src="https://i.imgur.com/uNiv4bD.png" width="160"></div>
            <br>
            <span id="error-message"></span>
            <form>
                <div>
                    <input type="email" class="form-control" id="email-log" name="email" placeholder="Email">
                </div>
                <br>
                <div>
                    <input type="password" class="form-control" id="password-log" name="password" placeholder="Password">
                </div>
                <br>
                <div class="mt-2">
                    <input type="button" class="btn btn-primary btn-block" id="login-btn" value="Log In">
                </div>
            </form>
            <br>
            <div>
                <a id="register">Don't have account? Register</a>
            </div>
        </div>
    </div> -->

    <!-- REGISTER PAGE -->

    <!-- <div id="auth-page">
        <div id="register-page" class="card mt-4 text-center">
            <h4>Register</h4>
            <div class="text-center intro"> <img src="https://i.imgur.com/uNiv4bD.png" width="160"></div>
            <br>
            <span id="error-message"></span>
            <form>
                <div>
                    <input type="email" class="form-control" id="email-reg" name="email" placeholder="Email">
                </div>
                <br>
                <div>
                    <input type="password" class="form-control" id="password-reg" name="password" placeholder="Password">
                </div>
                <br>
                <div class="mt-2">
                    <input type="button" class="btn btn-primary btn-block" id="register-btn" value="Register">
                </div>
            </form>
        </div>
    </div> -->

    <!-- MOVIE PAGE-->

    <div id="movie-page">
        <div id="big-div">
            <div id="flex-container-one" class="container">

            </div>
            <div id="flex-container-two" class="container">
                <div id="flex-one">
                    <div id="sub-flex-one">
                        

                    </div>
                    <div id="sub-flex-one">
                        
                    </div>
                </div>
                <div id="flex-two">
                    <div id="sub-flex-two-static">
                        
                    </div>
                    <div id="sub-flex-two">
                        
                    </div>
                    <div id="sub-flex-two">
                        
                    </div>
                    <div id="sub-flex-two">
                        
                    </div>
                    <div id="sub-flex-two">
                        
                    </div>
                    <div id="sub-flex-two">
                        
                    </div>
                    <div id="sub-flex-two">
                        
                    </div>
                    </div>
            </div>
        </div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="./script.js"></script>
</body>
</html>



body {
    background-color: #14181c;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    color: whitesmoke;
}
/* div {
    padding: 5px;
    margin: 5px;
} */

#auth-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh
}

.card {
    background-color: #222831;
    width: 400px;
    padding: 20px;
    border: none;
    border-radius: 20px;
}

.form-control {
    text-indent: 14px
}

#big-div {
    display: flex;
    flex-flow: column wrap;
    width: auto;
    height: 1000px;
    margin: 10px auto;
}

#flex-container-one {
    flex-grow: 1;
}

#flex-container-two {
    flex-grow: 6;
}

.container {
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
}

.container div {
    border: none;   
    margin: 2px;
    flex: 1;
    border-radius: 20px;
}

#flex-one {
    display: flex;
    flex-flow: column wrap;
}

#flex-two {
    border: none;
    flex-grow: 1.5;
    /* background-color: #374045; */
    display: flex;
    flex-flow: column wrap;
}

#sub-flex-one {
    background-color: #222831;
}

#sub-flex-two {
    padding: 10px;
    border: none;
    margin: 2px;
    flex: 1;
    border-radius: 20px;
    background-color: rgb(82, 93, 104);
}

