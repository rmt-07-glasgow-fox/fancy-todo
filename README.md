# fancy-todo
Membuat website untuk mencatat hal - hal menarik untuk dilakukan. App ini memiliki fitur:
* RESTful endpoint untuk operasi CRUD

## RESTful endpoints
### POST /todos

> Menambahkan Todos

_Request body_
```json
{
  "title": "judul untuk hal yang ingin dilakukan",
  "description": "deskripsi untuk hal yang ingin dilakukan",
  "status": "<default: boolean(false)>",
  "due_date": "tanggal untuk hal yang ingin dilakukan"
}
```

_Response (201 - Created)_
```json
{
  "id": "<default given by system>",
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status || default: boolean(false)>",
  "due_date": "<posted date>",
  "updatedAt": "<default given by system>",
  "createdAt": "<default given by system>"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Validation error"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

### GET /todos

> Menampilkan semua Todos

_Request body_
```json
{
  "not needed"
}
```

_Response (200 - OK)_
```json
[
  {
  "id": "<default given by system>",
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted date>",
  "updatedAt": "<default given by system>",
  "createdAt": "<default given by system>"
  }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

### GET /todos/:id

> Menampilkan semua Todos berdasarkan id todos

_Request body_
```json
{
  "not needed"
}
```

_Response (200 - OK)_
```json
{
  "id": "<default given by system>",
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted date>",
  "updatedAt": "<default given by system>",
  "createdAt": "<default given by system>"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

### PUT /todos/:id

> Mengubah Todos berdasarkan id

_Request body_
```json
{
  "title": "judul untuk hal yang ingin dilakukan",
  "description": "deskripsi untuk hal yang ingin dilakukan",
  "status": "<default: boolean(false)>",
  "due_date": "tanggal untuk hal yang ingin dilakukan"
}
```

_Response (201 - Created)_
```json
[
  {
    "id": "<default given by system>",
    "title": "<posted title>",
    "description": "<posted description>",
    "status": "<posted status || default: boolean(false)>",
    "due_date": "<posted date>",
    "updatedAt": "<default given by system>",
    "createdAt": "<default given by system>"
  }
]
```

_Response (404 - Not Found)_
```json
{
  "message": "Error not found"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Validation error"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

### PATCH /todos/:id

> Menandai Todos bahwa sudah dilakukan / belum dilakukan

_Request Body_
```json
{
  "status": "<add boolean: true / false>"
}
```

_Response (200 - OK)_
```json
{
  "message": "Data has been updated successfully"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Validation errors"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```

### DELETE /todos/:id

> Menghapus Todos yang sudah tidak diperlukan

_Request Body_
```json
{
  "not needed"
}
```

_Response (200 - OK)_
```json
{
  "message" : "Todo success to delete"
}
```

_Response (404 - Not Found)_
```json
{
  "message" : "Error not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message" : "Internal Server Error"
}
```