# My-Gallery

​
List of available endpoints:
​
- `POST /register`
- `POST /login`
- `GET /todos`
- `POST /todos`
- `DELETE /todos/:id`
- `GET /todos/:id`
- `PUT /todos/:id`
- `PATCH /todos/:id`



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
```

### GET /todos

description: 
  get all current logged-in user's to-do list

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json
{

  "id": <id>,
  "title": <title>,
  "description":<description>,
  "status": <status>,
  "due_date": <due_date>,
  "UserId": <UserId>,
  "createdAt": <createdAt>,
  "updatedAt": <updatedAt>

}
```

### POST /todos

description: 
  add task

Request:

- headers: access_token (string)

```json
{

  "title": <title>,
  "description":<description>,
  "status": <status>,
  "due_date": <due_date>,
  "UserId": <UserId>,

}
```

Response:

- status: 200
- body:

```json
{

  "id": <id>,
  "title": <title>,
  "description":<description>,
  "status": "ongoing",
  "due_date": <due_date>,
  "UserId": <UserId>,
  "createdAt": <createdAt>,
  "updatedAt": <updatedAt>

}
```

### DELETE /todos/:id

description: 
  delete task

Request:

- headers: access_token (string)

Response:

- status: 200

### GET /todos/:id

description: 
  get all to-do list by task id

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json
{

  "id": <id>,
  "title": <title>,
  "description":<description>,
  "status": <status>,
  "due_date": <due_date>,
  "UserId": <UserId>,
  "createdAt": <createdAt>,
  "updatedAt": <updatedAt>

}
```

### PUT /todos/:id

description: 
  edit task

Request:

- headers: access_token (string)

```json
{

  "title": <title>,
  "description":<description>,
  "due_date": <due_date>,

}
```

Response:

- status: 200
- body:

```json
{

  "id": <id>,
  "title": <title>,
  "description":<description>,
  "status": <status>,
  "due_date": <due_date>,
  "UserId": <UserId>,
  "createdAt": <createdAt>,
  "updatedAt": <updatedAt>

}
```

### PATCH /todos/:id

description: 
  update task status

Request:

- headers: access_token (string)

```json
{

  "status": <status>

}
```

Response:

- status: 200
- body:

```json
{

  "status": <status>

}
```