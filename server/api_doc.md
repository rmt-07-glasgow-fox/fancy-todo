# Fancy Todo 
Fancy Todo is a website to record things exciting things to do. This app has:
* Restful endpoint for fancy todo's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### POST /todos

> Create new todo

_Request Body_
```
{
  "title": "baca buku",
  "description": "baca buku programming",
  "status": "belum",
  "due_date": "2021-02-01"
}
```


_Response (201 - Created)_
```
{
  "id": 1,
  "title": "baca buku",
  "description": "baca buku programming",
  "status": "belum",
  "due_date": "2021-02-01"
}
```

_Response (400 - Bad Request)_
```
{
  "messages": "Validation error: gak boleh masukin tanggal yg udah lewat hari ini"
}
```

_Response (500 - Internal Server Error)_
```
{
  "messages": "internal server errror"
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
      "id": 1,
      "title": "cuci piring",
      "description": "membersihkan piring",
      "status": "belum",
      "due_date": "2021-02-01"
  },
  {
      "id": 2,
      "title": "nonton tv",
      "description": "menonton tv",
      "status": "sudah",
      "due_date": "2021-01-06"
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
  "id": 1,
  "title": "cuci piring",
  "description": "membersihkan piring",
  "status": "belum",
  "due_date": "2021-02-01"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Todo not found"
}
```

---
### PUT /todos/:id

> Update todo using PUT

_Request Body_
```
{
  "title": "berenang",
  "description": "berenang di kolam",
  "status": "belum",
  "due_date": "2021-01-06"
}
```

_Response (200)_
```
{
  "id": 1,
  "title": "berenang",
  "description": "berenang di kolam",
  "status": "belum",
  "due_date": "2021-01-06"
}
```

_Response (400 - Bad Request)_
```
{
  "messages": "do not enter a date that is past today"
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

---
### PATCH /todos/:id

> Update todo using PATCH

_Request Body_
```
{
  "status": "sudah"
}
```

_Response (200)_
```
{
  "id": 1,
  "title": "berenang",
  "description": "berenang di kolam",
  "status": "sudah",
  "due_date": "2021-01-06"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Validation error: status is required"
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






