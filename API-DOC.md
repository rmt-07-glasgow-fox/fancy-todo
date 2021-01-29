### How To Use
```
SETTING

npm i
sequelize db:migrate

RUN
npm install -g nodemon (if you dont have installed globally)
nodemon app.js (if you have installed nodemon globally)

Server URL : http://localhost:3000

```


### User
| Method | Route            | Description           |
| ------ | ---------------- | --------------------- |
| POST   | /auth/signup   | Add new user          |
| POST   | /auth/signin      | Login user            |
| POST   | /auth/loginGooge | Login user Via Google |

### TO-DO
| Method | Route            | Description                                     |
| ------ | ---------------- | ----------------------------------------------- |
| GET    | /todos     | Get all To-Do data |
| POST    | /todos | Add New data             |
| DELETE    | /todos/:id | Delete Selected Data              |
| PUT    | /todos/:id | Edit All Attributes data              |
| PATCH    | /todos/:id | Edit Status To false              |


### POST /auth/signin
---

_Request Headers_
```
Not needed
```

_Request Body_
```
{
    email : user01@gmail.com,
    password : user01
}
```

_Response ( 200 )_
```
{
    "access_token": "integer"
}
```

### POST /auth/loginGoogle
---

_Request Headers_
```
Not needed
```

_Request Body_
```
{
    email : user01@gmail.com,
    password : user01
}
```

_Response ( 200 )_
```
{
    "access_token": "integer"
}
```

_Response (401)_
```
{
    "msg": "Invalid Email/Password"
}
```

---
### POST /auth/signup
---

_Request Headers_
```
Not needed
```

_Request Body_
```
{
    email : user01@gmail.com,
    password : user01
}
```

_Response ( 200 )_
```
{
    "name": "Romi Zaki",
    "email": "greedymons@gmail.com"
}
```

### GET /todos/
---

_Request Headers_
```
{
    access_token : 'string'
}
```

_Request Body_
```
Not needed
```

_Response ( 200 )_
```
[
    {
        "id": integer,
        "name": "string",
        "type": "string",
        "description": "string",
        "date": "2021-01-29",
        "time": "11:38",
        "status": false,
        "createdAt": "2021-01-28T15:37:38.288Z",
        "updatedAt": "2021-01-28T15:38:21.665Z",
        "UserId": integer
    }
]
```

### POST /todos/
---

_Request Headers_
```
{
    access_token : 'string'
}
```

_Request Body_
```
{
    "id": integer,
    "name": "string",
    "type": "string",
    "description": "string",
    "date": "2021-01-29",
    "time": "11:38",
    "status": false,
    "UserId": integer
}
```

_Response ( 201 )_
```
[
    {
        "id": integer,
        "name": "string",
        "type": "string",
        "description": "string",
        "date": "2021-01-29",
        "time": "11:38",
        "status": false,
        "createdAt": "2021-01-28T15:37:38.288Z",
        "updatedAt": "2021-01-28T15:38:21.665Z",
        "UserId": integer
    }
]
```

### DELETE /todos/:id
---

_Request Headers_
```
{
    access_token : 'string'
}
```

_Request Params_
```
id: integer (required)
```

_Response ( 200 )_
```
{
    message: 'Todo has been deleted'
}
```

### PUT /todos/:id
---

_Request Headers_
```
{
    access_token : 'string'
}
```
_Request Body_
```
{
    "id": integer,
    "name": "string",
    "type": "string",
    "description": "string",
    "date": "2021-01-29",
    "time": "11:38",
    "status": false,
    "UserId": integer
}
```

_Request Params_
```
id: integer (required)
```

_Response ( 200 )_
```
{
    message: 'Todo has bee edited'
}
```

### PATCH /todos/:id
---

_Request Headers_
```
{
    access_token : 'string'
}
```

_Request Params_
```
id: integer (required)
```

_Response ( 200 )_
```
{
    message: 'Activity has been assigned done'
}
```