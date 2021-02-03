# Fancy Todo

Fancy Todo is a website to record things exciting things to do. This app has:

- Restful endpoint for fancy todo's CRUD operation
- JSON formatted response

&nbsp;

## RESTful endpoints

### POST /todos

> Create new todo

_Request Body_

```
{
    "id": 3,
    "title": "belajar OAuth",
    "description": "OAuth dari Google",
    "status": "sudah",
    "due_date": "2021-01-10"
}
```

_Response (201 - Created)_

```
{
    "id": 3,
    "title": "belajar OAuth",
    "description": "OAuth dari Google",
    "status": "sudah",
    "due_date": "2021-01-10"
}
```

_Response (400 - Bad Request)_

```
{
    "message": "do not enter a date that is past today"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

### GET /todos

> Get all todo

_Request Body_

```
not needed
```

_Response (200)_

```
[
    {
        "id": 3,
        "title": "belajar OAuth",
        "description": "OAuth dari Google",
        "status": "sudah",
        "due_date": "2021-01-10",
        "UserId": 1
    }
]
```

_Response (500 - Internal Server Error)_

```
{
  "messages": "internal server errror"
}
```

---

### GET /todos/:id

> Get todo by ID

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "id": 4,
    "title": "belajar OAuth",
    "description": "OAuth dari Google",
    "status": "sudah",
    "due_date": "2021-01-10",
    "UserId": 1,
    "User": {
        "id": 1,
        "email": "rizki@gmail.com",
        "password": "$2a$10$0HjTnckMzi099X6QieyUA.eUXaVVdFYI98FWKC.YAApheivTobTPS",
        "createdAt": "2021-01-06T16:53:55.040Z",
        "updatedAt": "2021-01-06T16:53:55.040Z"
    }
}
```

_Response (404 - Not Found)_

```
{
    "message": "Todo Not Found"
}
```

---

### PUT /todos/:id

> Update todo using PUT

_Request Body_

```
{
    "title": "belajar javascript",
    "description": "javascript mastery",
    "status": "sudah",
    "due_date": "2021-05-27"
}
```

_Response (200)_

```
{
    "id": 4,
    "title": "belajar javascript",
    "description": "javascript mastery",
    "status": "sudah",
    "due_date": "2021-05-27"
}
```

_Response (400 - Bad Request)_

```
{
    "message": "do not enter a date that is past today"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Todo Not Found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "messages": "internal server errror"
}
```

---

### PATCH /todos/:id

> Update todo using PATCH

_Request Body_

```
{
  "status": "belum"
}
```

_Response (200)_

```
{
    "id": 4,
    "title": "belajar javascript",
    "description": "javascript mastery",
    "status": "belum",
    "due_date": "2021-05-27"
}
```

_Response (400 - Bad Request)_

```
{
    "message": "status is required"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Todo Not Found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "messages": "internal server errror"
}
```

---

### DELETE /todos/:id

> Delete todo

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "todo success to delete"
}
```

_Response (404 - Not Found)_

```
{
  "message": "Todo not found"
}
```

_Response (500 - Internal Server Error)_

```
{
  "messages": "internal server errror"
}
```
