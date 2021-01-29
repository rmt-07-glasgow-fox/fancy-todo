# fancy-to-do
```
Create fancy to do app, using express, jquery, ajax, axios
* RESTful endpoint for Todo List's CRUD operation
* JSON formatted response
* Web Server response
* Getting a Charity List if you want to add a Fund Raising Todo in this app via Charity 3rd API
* Able to send a new Todo to your email right away via #rd API SIMPLE MAIL after you've created you own Todo List
```

# USAGE
```
Make sure you have Node.js and npm in your computer and then run `npm install`.
In order to get access to all of the routes, you will need a `JWT(JSON Web Token) Token` which will be generated automatically after you sign in successfully.
Run `nodemon app.js  to start the server.
```

##Restful endpoints
# URL
```
Client URL : http://localhost:5500
Server URL : http://localhost:3000
```

### GET/todos

>get all todos list

_Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
not needed
```
_Response (200)_
```javascript


{
    "Todo": [
       
        {
            "id": 8,
            "title": "makan",
            "description": "mandi",
            "status": true,
            "due_date": "2022-01-06"
            
        },
        {
            "id": 3,
            "title": "masak",
            "description": "tidur",
            "status": true,
            "due_date": "2022-02-09"
            
        },
        {
            "id": 2,
            "title": "idup",
            "description": "sans",
            "status": true,
            "due_date": "2022-02-10"
          
        }
    ]
}
```

_Response(401- Unauthorized)_
```javascript
{
    "Error" :  "USER_NOT_AUTHENTICATED"
    "message": "Invalid User"
}
```

_Response (500 - Bad Request)_
```javascript
{
  "Error": UNKNOWN_ERROR,
  "message": "Error undescribable"
}
```



### POST/todos

>Create new todos list

__Request Header_
```
{
  access_token: token
}
```
_Request Body_
```javascript
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "due_date": "<due_date to get insert into>",
   "status": "<status to get insert into>"
}
```
_Response (201 - Created)_
```javascript
{
  "id": <given id by system>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>"
  
}
```
_Response(400- bad request)_
```javascript
{
    "Error" :  VALIDATION_ERROR
    "message": "Name required,Description required,Status required,Due date required, Status has to be true or false", "This email is already taken try another, You date has already passed"
}
```

_Response(401- Unauthorized)_
```javascript
{
    "Error" :  "USER_NOT_AUTHENTICATED"
    "message": "Invalid User"
}
```



_Response (500)_
```javascript
{
   "Error": UNKNOWN_ERROR,
  "message": "Error undescribable"
}
```
### GET/todos/:id

>Get todos list by ID


__Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
not needed
```
_Response (200)_
```javascript
{
    "todo": {
        "id": 6,
        "title": "nyapu",
        "description": "nyapu kamar",
        "status": false,
        "due_date": "2020-01-01"
      
    }
}
```

_Response(401- Unauthorized)_
```javascript
{
    "Error" :  "USER_NOT_AUTHENTICATED"
    "message": "Invalid User"
}
```

_Response(403- Forbidden)_
```javascript
{
    "Error" :  "FORBIDDEN_ACCESS"
    "message": "You are not authorized to access the file"
}
```

_Response(404 - not found)_
```javascript
{
  "Error": "INVALID_ID",
  "message": "Data_not_found"
}
```

_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Error undescribable"
}
```
### POST/todos/:id

>Update todos list by ID

_Request Header_
```
{
  access_token: token
}
```


_Request Body_
```javascript
{
  "title": "<title to get updated later on>",
  "description": "<description to get updated later on>",
  "due_date": "<due_date to get updated later on>",
   "status": "<status to get updated later on>"
}
```
_Response(200)_
```javascript
{
    "id": 18,
    "title": "Farhad",
    "description": "afk",
    "status": null,
    "due_date": "2022-08-11T00:00:00.000Z",
    "UserId": 5,
    "createdAt": "2021-01-09T08:55:40.180Z",
    "updatedAt": "2021-01-09T08:56:28.895Z"
}
```

_Response(401- Unauthorized)_
```javascript
{
    "Error" :  "USER_NOT_AUTHENTICATED"
    "message": "Invalid User"
}
```

_Response(403- Forbidden)_
```javascript
{
    "Error" :  "FORBIDDEN_ACCESS"
    "message": "Not authorized"
}
```

_Response(404 - not found)_
```javascript
{
  "Error": "INVALID_ID",
  "message": "Data_not_found"
}
```



_Response(400- bad request)_
```javascript
{
    "Error" :  "VALIDATION_ERROR"
    "message": "Name required,Description required,Status required,Due date required, Status has to be true or false"
}
```
_Response (500)_
```javascript

{
  "Error": "UNKNOWN_ERROR",
  "message": "Error undescribable"
}
```


### DELETE/todos/:id

>Delete todos list by ID

_Request Header_
```
{
  access_token: token
}
```

_Response(200)_
```javascript
{
    "todo": 1
}
```

_Response(401- Unauthorized)_
```javascript
{
    "Error" :  "USER_NOT_AUTHENTICATED"
    "message": "Invalid User"
}
```

_Response(403- Forbidden)_
```javascript
{
    "Error" :  "FORBIDDEN_ACCESS"
    "message": "Not Authorized"
}
```

_Response(404 - not found)_
```javascript
{
  "Error": "INVALID_ID",
  "message": "Data_not_found"
}
```

_Response(404 - not found)_
```javascript
{
  "Error": "INVALID_ID",
  "message": "Data_not_found"
}
```
_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Error undescribable"
}
```

### POST/register

>Create User

_Request Header_
```
not needed
```

_Request Body_
```javascript
{
    "name": "<User's Name>",
    "email": "<User's email>",
    "password": "<User's password>"
}
```

_Response(201)_
```javascript
{
    "name": "farhad",
    "email": "farhad@gmail.com",
    "password": "kvndlkfrnfoieneknne"
}
```
_Response(400- bad request)_
```javascript
{
    "Error" :  "VALIDATION_ERROR"
    "message": "Name required,Email required,Password required,Due date required, Invalid email format"
}
```


_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

### POST/login

>Login User

_Request Header_
```
not needed
```

_Request Body_
```javascript
{
   
    "email": "<User's email>",
    "password": "<User's password>"
}
```

_Response(200)_
```javascript
{
    "access_token": alkdfknoeifheoifnien4y08
}
```
_Response(400- bad request)_
```javascript
{
    "Error" :  "VALIDATION_ERROR"
    "message": "Name required,Email required,Password required,Due date required, Invalid email format"
}
```


_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Error undescribable"
}
```



### POST/loginGoogle

Request Header

```Not Needed```

Request Body

```javascript
{
    "id_token": "<your id_token>"
}
```

_Response(200)
```javascript
{
    "access_token": "<your access_token>"
}
```
OR

_Response(201)
```javascript
{
    "access_token": "<your access_token>"
}
```

_Response(401)
```javascript
{
    "message":  "<Invalid Email/Password>" ,
    
}
```