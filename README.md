
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

_Request Body_
```
not needed
```
_Response (200)_
```
[
  {
    "id": 1,
    "title": "Belajar Vue JS",
    "description": "",
    "status": true,
    "due_date": "2020-01-04"
  },
  {
    "id": 2,
    "title": "Belajar React JS",
    "description": "",
    "status": false,
    "due_date": "2020-02-05"
  }
]
```

---
### POST /todos
---
>Create new todos list

_Request Body_
```
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "due_date": "<due_date to get insert into>",
  "status": "<status to get insert into>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>"
}
```

_Response(400- bad request)_
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

---
### GET /todos/:id
---
>Get todos list by ID

_Request Body_
```
not needed
```

_Response (200)_
```
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

_Request Body_
```
{
  "title": "<title to get updated later on>",
  "description": "<description to get updated later on>",
  "due_date": "<due_date to get updated later on>",
   "status": "<status to get updated later on>"
}
```

_Response(200)_
```
{
    "todo": [
        1
    ]
}
```

_Response(404 - not found)_
```
{
  "Error": "INVALID_ID",
  "message": "Data_not_found"
}
```

_Response(400- bad request)_
```
{
    "Error" :  "VALIDATION_ERROR"
    "message": "Name required,Description required,Status required,Due date required, Status has to be true or false"
}
```

---
### PATCH /todos/:id 
---
>Update todos status by ID

_Request Body_
```
{
 "status": Boolean
}
```

_Response(200)_
```
{
    "message": "Update status berhasil"
}
```

_Response(404 - not found)_
```
{
  "message": "Data_not_found"
}
```

_Response(400- bad request)_
```
{
    "Error" :  "VALIDATION_ERROR"
    "message": "message" : [
        "Status has to be true or false"
    ]
}
```

---
### DELETE /todos/:id 
---
>Delete todos list by ID

_Response(200)_
```
{
    "message": 'Success Delete'
}
```

_Response(404 - not found)_
```
{
  "message": "Data_not_found"
}
```

_Response (500)_
```
{
  "message": "Error undescribable"
}
```