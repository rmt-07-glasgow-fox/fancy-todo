
---
# API Documentation
---

```
Server URL : http://localhost:3000
```

### Todo
| Method | Route      | Description              |
| ------ | ---------- | ------------------------ |
| POST   | /todos     | Add new todo             |
| GET    | /todos     | Get all todo             |
| GET    | /todos/:id | Get todo by id           |
| PUT    | /todos/:id | Update todo by id        |
| PATCH  | /todos/:id | Update status todo by id |
| DELETE | /todos/:id | Delete todo by id        |

### User
| Method | Route     | Description  |
| ------ | --------- | ------------ |
| POST   | /register | Add new user |
| POST   | /login    | Login user   |

---
### GET /todos 
---
>get all todos list

_Request Headers_
```
access_token : MOutCvMHysWtpWDi00
```

_Request Body_
```
not needed
```

_Response ( 200 )_
```
{
    "message": [
        {
            "id": 10,
            "title": "Belajar React",
            "description": "updated",
            "status": true,
            "due_date": "2021-01-06",
            "UserId": 4
        },
        {
            "id": 13,
            "title": "Belajar React",
            "description": "updated",
            "status": false,
            "due_date": "2021-01-06",
            "UserId": 4
        }
    ]
}
```

_Response ( 401 )_
```
{
    "message": "jwt must be provided" / "jwt malformed"
}
```

_Response (500)_
```
{
    "message": "Internal server error"
}
```

---
### POST /todos
---
>Create new todos list

_Request Headers_
```
access_token : MOutCvMHysWtpWDi00
```

_Request Body_
```
{
    "title": "test",
    "description": "",
    "due_date": "2021-01-06"
}
```

_Response ( 201 - Created )_
```
{
    "message": {
        "id": 18,
        "status": false,
        "title": "test",
        "description": "",
        "due_date": "2021-01-06",
        "UserId": 4
    }
}
```

_Response( 400 - bad request )_
```
{
    "message" : [
        "Name required",
        "Description required",
        "Status required",
        "Due date required",
        "Status has to be true or false"
    ]
}
```

_Response ( 401 - Forbidden )_
```
{
    "message": "jwt must be provided" / "jwt malformed"
}
```

_Response( 404 - Not Found )_
```
{
    "message": "Not found"
}
```

_Response ( 500 - Internal Server Error )_
```
{
    "message": "Internal server error"
}
```

---
### GET /todos/:id
---
>Get todos list by ID

_Request Headers_
```
access_token : MOutCvMHysWtpWDi00
```

_Request Body_
```
not needed
```

_Response ( 200 - OK )_
```
{
    "message": {
        "id": 18,
        "status": false,
        "title": "test",
        "description": "",
        "due_date": "2021-01-06",
        "UserId": 4
    }
}
```

_Response(404 - not found)_
```
{
  "message": "Data_not_found"
}
```

---
### PUT /todos/:id 
---
>Update todos list by ID

_Request Headers_
```
access_token : MOutCvMHysWtpWDi00
```

_Request Body_
```
{
    "title": "test",
    "description": "",
    "due_date": "2021-01-06",
    "status": true / false
}
```

_Response( 200 - OK )_
```
{
    "message": {
        "id": 18,
        "status": false,
        "title": "test",
        "description": "",
        "due_date": "2021-01-06",
        "UserId": 4
    }
}
```

_Response( 400 - Bad Request )_
```
{
    "message" : [
        "Name required",
        "Description required",
        "Status required",
        "Due date required",
        "Status has to be true or false"
    ]
}
```

_Response( 403 - Forbidden )_
```
{
    "message": "It doesn't belongs to user"
}
```

_Response( 404 - Not Found )_
```
{
    "message": "Not found"
}
```

_Response ( 500 - Internal Server Error )_
```
{
    "message": "Internal server error"
}
```

---
### PATCH /todos/:id 
---
>Update todos status by ID

_Request Headers_
```
access_token : MOutCvMHysWtpWDi00
```

_Request Body_
```
{
 "status": true / false
}
```

_Response(200)_
```
{
    "message": "Update status berhasil"
}
```

_Response( 403 - Forbidden )_
```
{
    "message": "It doesn't belongs to user"
}
```

_Response( 404 - Not Found )_
```
{
    "message": "Not found"
}
```

_Response ( 500 - Internal Server Error )_
```
{
    "message": "Internal server error"
}
```

---
### DELETE /todos/:id 
---
>Delete todos list by ID

_Request Headers_
```
access_token : MOutCvMHysWtpWDi00
```

_Request Body_
```
not needed
```

_Response( 200 )_
```
OK
```
_Response( 403 - Forbidden )_
```
{
    "message": "It doesn't belongs to user"
}
```

_Response( 404 - Not Found )_
```
{
    "message": "Not found"
}
```

_Response ( 500 - Internal Server Error )_
```
{
    "message": "Internal server error"
}
```

---
### POST /register 
---
>Delete todos list by ID

_Request Headers_
```
not needed
```

_Request Body_
```
{
    "email": "user01@gmail.com",
    "password": "user01"
}
```

_Response( 200 )_
```
{
    "id": 5,
    "email": "user03@gmail.com"
}
```

_Response( 400 - Bad Request )_
```
{
    "message": [
        "Email is empty",
        "Invalid email format",
        "Password is empty",
        "Password at least 6 characters"
    ]
}
```

_Response( 404 - Not Found )_
```
{
    "message": "Not found"
}
```

_Response ( 500 - Internal Server Error )_
```
{
    "message": "Internal server error"
}
```

---
### POST /login 
---
>Delete todos list by ID

_Request Headers_
```
not needed
```

_Request Body_
```
{
    "email": "user01@gmail.com",
    "password": "user01"
}
```

_Response( 200 )_
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ1c2VyMDJAZ21haWwuY29tIiwiaWF0IjoxNjA5OTI0ODg1fQ.PdvoxOqmU8s7Vl40B9UcdLg08EQL9t3O1XDyHbOsbsk"
}
```

_Response( 400 - Bad Request )_
```
{
    "message": "Email / Password is invalid"
}
```

_Response( 404 - Not Found )_
```
{
    "message": "Not found"
}
```

_Response ( 500 - Internal Server Error )_
```
{
    "message": "Internal server error"
}
```