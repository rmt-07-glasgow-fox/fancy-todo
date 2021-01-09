# Fancy Todo App
An Application for managing your task or daily works
​
List of available endpoints:
​
- `POST /register`
- `POST /login`
- `POST /loginGoogle`
- `GET /todos`
- `POST /todos`
- `GET /numberFact`
- `GET /randomQuote`
- `GET /todos/:id`
- `PUT /todos/:id`
- `PATCH /todos/:id'`
- `DELETE /todos/:id`

### POST /register

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

Errors:
```json

{
"message": "Invalid email/password",
"code": 400,
"from": "Controller User:user"
}
```

### POST /login

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
    "id": "integer",
    "email": "string",
    "access_token": "jwt string"
}

Errors:
```json

{
"message": "Invalid email/password",
"code": 401,
"from": "Controller User: login user"
}

{
"message": "Invalid email/password",
"code": 400,
"from": "Controller User: login user"
}

```

### POST /loginGoogle

Description:
  login social via google auth

Request:

- body: id_token (integer)

- response Google:
```json
{
  "email": "string"
}

Response:

- status: 200
- body:
  ​

```json
{
    "id": "integer",
    "email": "string",
    "access_token": "jwt string"
}

Errors:
```json
not needed format

```

### GET /todos

description: 
  get all todo list based on logged in user id

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json
{
  "todos": [
    {
      "id": 1,
      "title": "makan",
      "description": "biar kenyang",
      "status": "done",
      "due_date": "2020-06-12T16:22:40.469Z"
    }
  ]
}

Errors:
```json

{
"message": "Internal server error",
"code": 500,
"from": "Controller Todo: show all todo"
}

```

### POST /todos

description: 
  create todo with data from client

Request:

- userId: user_id (integer)

- headers: access_key (string)

- body:
```json
{
"title": "string",
"description": "string",
"due_date": "date/time stampz"
}

Response:

- status: 201
- body:

```json
{
  "todos": [
    {
      "id": 1,
      "title": "makan",
      "description": "biar kenyang",
      "status": "done",
      "due_date": "2020-06-12T16:22:40.469Z"
    }
  ]
}

Errors:
```json

{
"message": "Internal server error",
"code": 500,
"from": "Controller Todo: create todo"
}

{
"message": "string",
"code": 400,
"from": "Controller User: create todo"
}

```

### GET /numberFact

description: 
  get random fact number (API request)

Request:

- headers: access_key (string)

- body:
```json
{
"id": "integer"
}

Response:

- status: 200
- body:

```json
{
  "data": "44 is the number of derangements of 5 items."
}

Errors:
not needed format

```

### GET /randomQuote

description: 
  get random quotes (API request)

Request:

- headers: access_key (string)

- body:
```json
{
"id": "integer"
}

Response:

- status: 200
- body:

```json
{
  "data": "You better give up!"
}

Errors:
not needed format

```

### GET /todos/:id

description: 
  get single todo based on todo id

Request:

- params: id (integer)

- headers: 
not needed

Response:

- status: 200
- body:

```json
{
  "todos": [
    {
      "id": 1,
      "title": "makan",
      "description": "biar kenyang",
      "status": "done",
      "due_date": "2020-06-12T16:22:40.469Z",
      "user_id": 3,
      "createdAt": "2020-06-12T16:22:40.469Z",
      "updatedAt": "2020-06-12T16:22:40.469Z"
    }
  ]
}

Errors:
```json

{
"message": "Item not found",
"code": 404,
"from": "Controller User: find by id"
}

{
"message": "Internal server error",
"code": 500,
"from": "Controller User: find by id"
}

```

### PUT /todos/:id

description: 
  update multiple properties of single tod based on todo id

Request:

- params: id (integer)

- headers: access_key (string)

- body:
```json
{
"title": "string",
"description": "string",
"due_date": "date/time stampz"
}

Response:

- status: 200
- body:

```json
{
  "todos": [
    {
      "id": 1,
      "title": "makan",
      "description": "biar kenyang",
      "status": "done",
      "due_date": "2020-06-12T16:22:40.469Z",
      "user_id": 3,
      "createdAt": "2020-06-12T16:22:40.469Z",
      "updatedAt": "2020-06-12T16:22:40.469Z"
    }
  ]
}

Errors:
```json

{
"message": "Item not found",
"code": 404,
"from": "Controller User: update todo"
}

{
"message": "string",
"code": 400,
"from": "Controller User: update todo"
}

{
"message": "Internal server error",
"code": 500,
"from": "Controller User: update todo"
}

```

### PATCH /todos/:id

description: 
  update status property (done/complete) of single todo based on todo id

Request:

- params: id (integer)

- headers: access_key (string)

Response:

- status: 200
- body:

```json
{
  "todos": [
    {
      "id": 1,
      "title": "makan",
      "description": "biar kenyang",
      "status": "done",
      "due_date": "2020-06-12T16:22:40.469Z",
      "user_id": 3,
      "createdAt": "2020-06-12T16:22:40.469Z",
      "updatedAt": "2020-06-12T16:22:40.469Z"
    }
  ]
}

Errors:
```json

{
"message": "Item not found",
"code": 404,
"from": "Controller User: change status"
}

{
"message": "string",
"code": 400,
"from": "Controller User: update todo"
}

{
"message": "Internal server error",
"code": 500,
"from": "Controller User: update todo"
}

```

### DELETE /todos/:id

description: 
  delete single todo based on todo id

Request:

- params: id (integer)

- headers: access_key (string)

Response:

- status: 200
- body:

```json
{
  "todos": [
    {
      "id": 1,
      "title": "makan",
      "description": "biar kenyang",
      "status": "done",
      "due_date": "2020-06-12T16:22:40.469Z",
      "user_id": 3,
      "createdAt": "2020-06-12T16:22:40.469Z",
      "updatedAt": "2020-06-12T16:22:40.469Z"
    }
  ]
}

Errors:
```json

{
"message": "Item not found",
"code": 404,
"from": "Controller User: update todo"
}

{
"message": "Internal server error",
"code": 500,
"from": "Controller User: update todo"
}

```