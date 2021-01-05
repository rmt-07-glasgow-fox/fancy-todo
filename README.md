# fancy-todo
A simple todo apps, created using node.js, express, sequelize, postgres.


List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /googleLogin`
- `GET /todos`
- `POST /todos`
- `GET /todos/:id`
- `PUT /todos/:id`
- `PATCH /todos/:id`
- `DELETE /todos/:id`
- `GET /weather`


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
  "id":"integer",
  "email": "string"
}
```

- status: 400
- body:
  ​

```json
{
  "message": [
    "Email Must Be Filled",
    "Input Must Be Email Address",
    "Password Must Be Filled",
    "Password Have Minimum 6 Character"
  ]
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### POST /login

description: 
  User login 

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
    "access_token": "jwt string",
    "name": "string"
}
```

- status: 401
- body:
  ​

```json
{
  "message": [
    "invalid email/password"
  ]
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### GET /todos

description: 
  get all list todo that user created before

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json

  [
    {
        "id": 1,
        "title": "Sleep",
        "description": "Go to dream island",
        "status": false,
        "due_date": "2021-02-28T00:00:00.000Z",
        "UserId": 1,
        "createdAt": "2021-01-05T04:23:05.692Z",
        "updatedAt": "2021-01-05T05:41:58.354Z"
    },
    {
        "id": 2,
        "title": "Eat",
        "description": "Eat Cheese BigMac",
        "status": false,
        "due_date": "2021-02-28T00:00:00.000Z",
        "UserId": 1,
        "createdAt": "2021-01-05T05:34:36.928Z",
        "updatedAt": "2021-01-05T06:02:09.525Z"
    },
    {
        "id": 3,
        "title": "Play",
        "description": "Play Among Us",
        "status": false,
        "due_date": "2021-02-28T00:00:00.000Z",
        "UserId": 1,
        "createdAt": "2021-01-05T05:34:53.543Z",
        "updatedAt": "2021-01-05T05:34:53.543Z"
    },
    {
        "id": 4,
        "title": "Date",
        "description": "Visit her house",
        "status": false,
        "due_date": "2021-02-28T00:00:00.000Z",
        "UserId": 1,
        "createdAt": "2021-01-05T05:35:17.201Z",
        "updatedAt": "2021-01-05T05:35:17.201Z"
    }
  ]

```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```
- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### POST /todos

description: 
  Create list todo that user made in form

Request:

- headers: access_token (string)
- body:

```json
{
    "title": "integer",
    "description": "string",
    "due_date": "Date"
}
```

Response:

- status: 200
- body:

```json
{
    "id": 5,
    "title": "Exercise",
    "description": "Go to gym",
    "status": false,
    "due_date": "2021-02-28T00:00:00.000Z",
    "UserId": 6,
    "createdAt": "2021-01-05T04:23:05.692Z",
    "updatedAt": "2021-01-05T05:41:58.354Z"
}
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```

- status: 400
- body:
  ​

```json
{
  "message": [
    "The title must be filled",
    "The description must be filled",
    "The date must be filled",
    "The title can't be null",
    "The description can't be null",
    "The date can't be null"
  ]
}
```

- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### GET /todos/:id

description: 
  get list todo that user requested

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
    "id": 1,
    "title": "Sleep",
    "description": "Go to dream island",
    "status": false,
    "due_date": "2021-02-28T00:00:00.000Z",
    "UserId": 1,
    "createdAt": "2021-01-05T04:23:05.692Z",
    "updatedAt": "2021-01-05T05:41:58.354Z"
}
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```
- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### PUT /todos/:id

description: 
  Update list todo that user requested

Request:

- headers: access_token (string)
- params: id (integer)
- body:

```json
{
    "title": "integer",
    "description": "string",
    "due_date": "Date"
}
```

Response:

- status: 200
- body:

```json
{
    "id": 2,
    "title": "Eat",
    "description": "Eat Beef BigMac",
    "status": false,
    "due_date": "2021-02-27T00:00:00.000Z",
    "UserId": 1,
    "createdAt": "2021-01-05T05:34:36.928Z",
    "updatedAt": "2021-01-05T06:02:09.525Z"
}
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```
- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### PATCH /todos/:id

description: 
  Update status todo that signed as done/finished

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
    "id": 2,
    "title": "Eat",
    "description": "Eat Beef BigMac",
    "status": true,
    "due_date": "2021-02-27T00:00:00.000Z",
    "UserId": 1,
    "createdAt": "2021-01-05T05:34:36.928Z",
    "updatedAt": "2021-01-05T06:02:09.525Z"
}
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```
- status: 404
- body:

```json
{
  "message": "Eerror Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### DELETE /todos/:id

description: 
  Delete status todo that signed as done/finished or not

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
    "message": "todo success to delete"
}
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```
- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```