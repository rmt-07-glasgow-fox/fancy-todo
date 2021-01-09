```
Fancy Todo App
```

# How To Use
```
run `npm install`
run `npx nodemon` in the server folder
run `live-server --host=localhost` in the client folder
```

# REST API Endpoints
<!-- --- -->
## URL
```
Server URL : http://localhost:3000
```


## POST/todos

>Create a new todo

_Request Header_

```
{
  access_token: token
}
```

_Request Body_
```
{
  "title": <string>,
  "description": <string>,
  "due_date": <date YYYY-MM-DD>,
  "status": <boolean>
}
```

_Response (201 - Created)_
```
{
  "title": <string>,
  "description": <string>,
  "due_date": <date YYYY-MM-DD>,
  "status": <boolean>
}
```

_Response(400- bad request)_
```
{
  err
}
```

_Response (500)_
```
{
  message: "Internal error"
}
```




## GET/todos

> Show all todos


_Request Header_
```
{
  access_token: token
}
```

_Request Body_
```
```

_Response (200)_
```
{
  [
    {
      "title": <string>,
      "description": <string>,
      "due_date": <date YYYY-MM-DD>,
      "status": <boolean>
    }
  ],
  [
    {
      "title": <string>,
      "description": <string>,
      "due_date": <date YYYY-MM-DD>,
      "status": <boolean>
    }
  ],
}
```

_Response(401- authentication)_
```
{
  message: 'You are not logged in!'
}
```

_Response(404- not found)_
```
{
  message:"Error 404: todo not found"
}
```

_Response (500)_
```
{
  message:"Internal error"
}
```



## GET/todos/:id

> Get todo by ID

_Request Header_
```
{
  access_token: token
}
```

_Request Body_
```
```

_Response (200)_
```
{
  "title": <string>,
  "description": <string>,
  "due_date": <date YYYY-MM-DD>,
  "status": <boolean>
}
```

_Response(401- authentication)_
```
{
  message: 'You are not logged in!'
}
```

_Response (500)_
```
{
  message:"Internal error"
}
```




## PUT/todos/:id

_Request Header_
```
{
  access_token: token
}
```

_Request Body_
```
{
  "title": <string>,
  "description": <string>,
  "due_date": <date YYYY-MM-DD>,
  "status": <boolean>
}
```

_Response (200)_
```
{
  "title": <string>,
  "description": <string>,
  "due_date": <date YYYY-MM-DD>,
  "status": <boolean>
}
```

_Response(401- authentication)_
```
{
  message: 'You are not logged in!'
}
```

_Response (500)_
```
{
  message:"Internal error"
}
```




## PATCH/todos/:id

>Update todo status by ID

_Request Header_
```
{
  access_token: token
}
```

_Request Body_
```
{
  "status": <boolean>
}
```

_Response (200)_
```
{
  "title": <string>,
  "description": <string>,
  "due_date": <date YYYY-MM-DD>,
  "status": <boolean>
}
```

_Response(401- authentication)_
```
{
  message: 'You are not logged in!'
}
```

_Response (500)_
```
{
  message:"Internal error"
}
```


## DELETE/todos/:id

>Delete todo  by ID

_Request Header_
```
{
  access_token: token
}
```

_Request Body_
```
```

_Response (200)_
```
{
  message: todo success to delete
}
```

_Response(401- authentication)_
```
{
  message: 'You are not logged in!'
}
```

_Response (500)_
```
{
  message:"Internal error"
}
```


## POST/register
>Create a new account

_Request Header_
```
```

_Request Body_
```
{
  email: <string>
  password: <string>
}
```

_Response (201)_
```
{
  email: email
}
```

_Response(400- authentication)_
```
{
  err
}
```

_Response (500)_
```
{
  message:"Internal error"
}
```

## POST/login
>Login

_Request Header_
```
```

_Request Body_
```
{
  email: <string>
  password: <string>
}
```

_Response (200)_
```
{
  access_token: access_token
}
```

_Response(400)_
```
{
  err
}
```

_Response (500)_
```
{
  message:"Internal error"
}
```