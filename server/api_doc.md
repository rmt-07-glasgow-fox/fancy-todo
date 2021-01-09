# Fancy Todo Web App Server
Fancy Todo is a web application to list all your plan. This Web App has:

    1. RESTful endpoint for todo list's CRUD operation
    2. JSON formatted response

# URL

    http://localhost:5000

# Method

 ## - POST/users/register

### *Request Header*

```Not Needed```

### *Request Body*

```javascript
{
    "email": "<your email>",
    "password": "<your password>"
}
```

### *Success Response*
```javascript
Code: 201 Created
Content:
{
    "id": "<your id>",
    "email": "<your email>"
}
```

### *Error Response*

```javascript
Code: 400 Bad Request
Content:
{
    "errorMessages": [ "<error messages>" ],
    
}
```

 ## - POST/users/login

### *Request Header*

```Not Needed```

### *Request Body*

```javascript
{
    "email": "<your email>",
    "password": "<your password>"
}
```

### *Success Response*
```javascript
Code: 201 Created
Content:
{
    "access_token": "<your access_token>"
}
```

### *Error Response*

```javascript
Code: 400 Bad Request
Content:
{
    "errorMessages": [ "<error messages>" ],
    
}
```

 ## - POST/todos

### *Request Header*

```javascript
{
    "access_token": "<your access_token>"
}
```

### *Request Body*

```javascript
{
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>"
}
```

### *Success Response*
```javascript
Code: 201 Created
Content:
{
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>"
}
```

### *Error Response*

```javascript
Code: 400 Bad Request
Content:
{
    "errorMessages": [ "<error messages>" ],
    
}
```
OR
```javascript
Code: 500 Internal Server Error
Content:
{
    "errorMessages": [ "<Internal Server Error>" ],
    
}
```

 ## - GET/todos/

### *Request Header*

```javascript
{
    "access_token": "<your access_token>"
}
```

### *Request Body*

```
Not Needed
```

### *Success Response*
```javascript
Code: 200 OK
Content:
{
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>"
}, ....
```

### *Error Response*

```javascript
Code: 500 Internal Server Error
Content:
{
    "errorMessages": [ "<Internal Server Error>" ],
    
}
```
  ## - GET/todos/:id

### *Request Header*

```javascript
{
    "access_token": "<your access_token>"
}
```

### *Request Body*

```
Not Needed
```

### *Success Response*
```javascript
Code: 200 OK
Content:
{
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>"
}
```

### *Error Response*

```javascript
Code: 404
Content:
{
    "errorMessages": [ "<Error Not Found>" ],
    
}
```

 ## - PUT/todos/:id

### *Request Header*

```javascript
{
    "access_token": "<your access_token>"
}
```
### *Request Params*

```javascript
{
    "id": +req.params.id
}
```

### *Request Body*

```javascript
{
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date>"
}
```

### *Success Response*
```javascript
Code: 200 OK
Content:
{
    "title": "<[new] todo title>",
    "description": "<[new] todo description>",
    "status": "<[new] todo status>",
    "due_date": "<[new] todo due_date>"
}
```

### *Error Response*

```javascript
Code: 400 Bad Request
Content:
{
    "errorMessages": [ "<error messages>" ],
    
}
```
OR
```javascript
Code: 404 Not Found
Content:
{
    "errorMessages": [ "<Error Not Found>" ],
    
}
```
OR
```javascript
Code: 500 Internal Server Error
Content:
{
    "errorMessages": [ "<Internal Server Error>" ],
    
}
```

 ## - PATCH/todos/:id

### *Request Header*

```javascript
{
    "access_token": "<your access_token>"
}
```
### *Request Params*

```javascript
{
    "id": +req.params.id
}
```

### *Request Body*

```javascript
{
    "status": "<todo status>" 
}
```

### *Success Response*
```javascript
Code: 200 OK
Content:
{
    "status": "<[new] todo status>"
}
```

### *Error Response*

```javascript
Code: 400 Bad Request
Content:
{
    "errorMessages": [ "<error messages>" ],
    
}
```
OR
```javascript
Code: 404 Not Found
Content:
{
    "errorMessages": [ "<Error Not Found>" ],
    
}
```
OR
```javascript
Code: 500 Internal Server Error
Content:
{
    "errorMessages": [ "<Internal Server Error>" ],
    
}
```

 ## - DELETE/todos/:id

### *Request Header*

```javascript
{
    "access_token": "<your access_token>"
}
```
### *Request Params*

```javascript
{
    "id": +req.params.id
}
```

### *Request Body*

```
Not Needed
```

### *Success Response*
```javascript
Code: 200 OK
Content:
{
   "message": "Todo Success to Delete"
}
```

### *Error Response*

```javascript
Code: 404 Not Found
Content:
{
    "errorMessages": [ "<Error Not Found>" ],
    
}
```
OR
```javascript
Code: 500 Internal Server Error
Content:
{
    "errorMessages": [ "<Internal Server Error>" ],
    
}
```