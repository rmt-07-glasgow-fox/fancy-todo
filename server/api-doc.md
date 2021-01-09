​List of available endpoints:
​
- `POST /register`
- `POST /login`
- `POST /googleLogin`
- `GET /todos`
- `POST /todos`
- `GET /todos/:id`
- `PUT /todos/:id`
- `DELETE /todos/:id`

### POST /register

description: 
  register user

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 201
- body:
  ​

```json
{
  "id": "integer",
  "email": "string"
}
```

- status: 400
- body:
  ​

```json
{
  "message": [
    "email must be filled"
    "password must be filled",
  ]
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### POST /login

description: 
  log in user

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "access_token": "string"
}
```

- status: 401
- body:
  ​

```json
{
  "message": [
    "Invalid email/password"
  ]
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### GET /todos

description:
fetch list of todos

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json

  [
    {
        "id": 2,
        "title": "Berteriak aku sayang kamu",
        "description": "di depan pacar mantan",
        "status": "sudah",
        "due_date": "2021-09-09 00:00:00.000 +00:00",
        "createdAt": "2021-01-05T07:36:54.000Z",
        "updatedAt": "2021-01-05T07:43:16.161Z",
        "UserId": 1
    },
    {
        "id": 1,
        "title": "Merenung masa lalu",
        "description": "bersama time traveller",
        "status": "sudah",
        "due_date": "2021-08-08 00:00:00.000 +00:00",
        "createdAt": "2021-01-05T07:04:39.012Z",
        "updatedAt": "2021-01-05T07:44:03.133Z",
        "UserId": 1
    }
]

```

- status: 401
- body:

```json
{
  "message": "Please login first"
}
```
- status: 404
- body:

```json
{
  "message": "Todo not found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### POST /todos

description: 
  add todos

Request:

- headers: access_token (string)
- body:

```json
{
    "title": "string",
    "description": "string",
    "due_date": "date"
}
```

Response:

- status: 200
- body:

```json
{
        "id": 1,
        "title": "Merenung masa lalu",
        "description": "bersama time traveller",
        "status": "sudah",
        "due_date": "2021-08-08 00:00:00.000 +00:00",
        "createdAt": "2021-01-05T07:04:39.012Z",
        "updatedAt": "2021-01-05T07:44:03.133Z",
        "UserId": 1
    }
```

- status: 401
- body:

```json
{
  "message": "you must login first"
}
```

- status: 400
- body:
  ​

```json
{
  "message": [
    "title musn't empty",
    "category musn't empty",
    "title musn't null",
    "category musn't null"
  ]
}
```

- status: 404
- body:

```json
{
  "message": "Todo not found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### GET /todos/:id

description: 
  fetch todos by id

Request:

- headers: access_token (string)
- parameters: id (integer)

Response:

- status: 200
- body:

```json
{
        "id": 1,
        "title": "Merenung masa lalu",
        "description": "bersama time traveller",
        "status": "sudah",
        "due_date": "2021-08-08 00:00:00.000 +00:00",
        "createdAt": "2021-01-05T07:04:39.012Z",
        "updatedAt": "2021-01-05T07:44:03.133Z",
        "UserId": 1
    }
```

- status: 401
- body:

```json
{
  "message": "You are not authorized"
}
```
- status: 404
- body:

```json
{
  "message": "Todo not found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### PUT /todos/:id

description: 
  edit todos by id

Request:

- headers: access_token (string)
- parameters: id (integer)
- body:

```json
{
    "title": "string",
    "description": "string",
    "due_date": "date"
}
```

Response:

- status: 200
- body:

```json
{
        "id": 1,
        "title": "Merenung masa lalu",
        "description": "bersama time traveller",
        "status": "sudah",
        "due_date": "2021-08-08 00:00:00.000 +00:00",
        "createdAt": "2021-01-05T07:04:39.012Z",
        "updatedAt": "2021-01-05T07:44:03.133Z",
        "UserId": 1
}
```

- status: 401
- body:

```json
{
  "message": "You are not authorized"
}
```
- status: 404
- body:

```json
{
  "message": "Todo not found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```

### PATCH /todos/:id

description: 
  mark todos as done

Request:

- headers: access_token (string)
- parameters: id (integer)


Response:

- status: 200
- body:

```json
{
        "id": 1,
        "title": "Merenung masa lalu",
        "description": "bersama time traveller",
        "status": "sudah",
        "due_date": "2021-08-08 00:00:00.000 +00:00",
        "createdAt": "2021-01-05T07:04:39.012Z",
        "updatedAt": "2021-01-05T07:44:03.133Z",
        "UserId": 1
}
```

- status: 401
- body:

```json
{
  "message": "You are not authorized"
}
```
- status: 404
- body:

```json
{
  "message": "Todo not found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```


### DELETE /tasks/:id

description: 
  delete task by id 

Request:

- headers: access_token (string)
- parameters: id (integer)

Response:

- status: 200
- body:

```json
{
    "message": "Deleted successfully!"
}
```

- status: 401
- body:

```json
{
  "message": "You are not authorized"
}
```
- status: 404
- body:

```json
{
  "message": "Todo not found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal server error"
}
```