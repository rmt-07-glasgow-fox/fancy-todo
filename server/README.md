# TODO App Server
TODO App is an application to make list of our task. This app has:
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## USAGE
- Make sure you have Node.js and npm in your computer and then run `npm install`.
- In order to get access to all of the routes, you will need a `JWT(JSON Web Token) Token` which will be generated automatically after you sign in successfully.
- For start the server: `npm run dev`.

&nbsp;


## RESTful endpoints
### GET /todos

> Get all Todo list

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
none
```

_Response (200)_
```json
[
  {
    "id": 1,
    "title": "Clean Bedroom",
    "description": "Clean bedroom with fabric and hot water",
    "status": true,
    "due_date": "2020-01-04T00:00:00.000Z",
    "createdAt": "2021-01-04T10:35:55.201Z",
    "updatedAt": "2021-01-04T10:35:55.201Z"
  },
  {
    "id": 2,
    "title": "Do 1 Programming Challange",
    "description": "Do 7kyu level in CodeWars",
    "status": true,
    "due_date": "2020-01-04T00:00:00.000Z",
    "createdAt": "2021-01-04T10:35:55.201Z",
    "updatedAt": "2021-01-04T10:35:55.201Z"
  },
  {
    "id": 3,
    "title": "Make Website with HTML CSS",
    "description": "Do with The Net Ninja youtube videos",
    "status": false,
    "due_date": "2020-01-04T00:00:00.000Z",
    "createdAt": "2021-01-04T10:35:55.201Z",
    "updatedAt": "2021-01-04T10:35:55.201Z"
  }
]
```

_Response(401- Unauthorized)_
```
{
    "Error": "Invalid Authentication",
    "message": "The requested page needs a username and a password."
}
```

_Response (500 - Internal Server Error)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```
---

### POST /todos

> Create new todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

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
  "UserId": <given UserId by token user id>,
  "title": "<posted title>",
  "description": "<posted description>",
  "status": "<posted status>"
  "due_date": "<posted due_date>",
  "createdAt": <given createdAt by system>,
  "updatedAt": <given updatedAt by system>
}
```

<!-- TODO: NEED TO BE FIXED -->
_Response(400- bad request)_
```
{
    "Error": "Validation error",
    "message": "Title cannot empty,Cannot input an older date than now"
}
```

_Response(401- Unauthorized)_
```
{
    "Error": "Invalid Authentication",
    "message": "The requested page needs a username and a password."
}
```

_Response (500 - Internal Server Error)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```

---

### GET /todos/:id

> get todos list by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
none
```
<!-- TODO: NEED TO BE FIXED -->
_Response (200)_
```
{
    "id": 1,
    "UserId": 6,
    "title": "Testing Title 6",
    "description": "Description title 6",
    "status": false,
    "due_date": "2021-06-09T00:00:00.000Z",
    "createdAt": "2021-01-05T15:09:12.438Z",
    "updatedAt": "2021-01-05T15:09:12.438Z"
}
```

_Response(401- Unauthorized)_
```
{
    "Error": "Invalid Authentication",
    "message": "The requested page needs a username and a password."
}
```

_Response(403- Forbidden)_
```
{
    "Error": "Forbidden access",
    "message": "You are not authorized to access the file"
}
```

_Response(404 - not found)_
```
{
    "Error": "Invalid Id",
    "message": "Data not found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```
---

### PUT /todos/:id

> Update todos list by ID

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<title to get updated later on>",
  "description": "<description to get updated later on>",
  "due_date": "<due_date to get updated later on>",
  "status": "<status to get updated later on>"
}
```

<!-- TODO: NEED TO BE FIXED -->
_Response(200)_
```
{
    "id": 1,
    "UserId": 6,
    "title": "Test Title 13a",
    "description": "Description data PUT 13a",
    "status": true,
    "due_date": "2021-01-10T00:00:00.000Z",
    "createdAt": "2021-01-05T15:09:12.438Z",
    "updatedAt": "2021-01-05T23:03:43.044Z"
}
```

_Response(401- Unauthorized)_
```
{
    "Error": "Invalid Authentication",
    "message": "Invalid email / password"
}
```

_Response(403- Forbidden)_
```
{
    "Error": "Forbidden access",
    "message": "You are not authorized to access the file"
}
```

_Response(404 - not found)_
```
{
    "Error": "Invalid Id",
    "message": "Data not found"
}

```

_Response(400- bad request)_
```
{
    "Error": "Validation error",
    "message": "Title cannot empty,Cannot input an older date than now"
}
```

_Response (500 - Internal Server Error)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```
---


### PATCH /todos/:id

> Update todos list by ID

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "status": "<status to get updated later on>"
}
```

<!-- TODO: NEED TO BE FIXED -->
_Response(200)_
```
{
    "id": 1,
    "UserId": 6,
    "title": "Test Title 13a",
    "description": "Description data PUT 13a",
    "status": true,
    "due_date": "2021-01-10T00:00:00.000Z",
    "createdAt": "2021-01-05T15:09:12.438Z",
    "updatedAt": "2021-01-05T23:03:43.044Z"
}
```

_Response(401- Unauthorized)_
```
{
    "Error": "Invalid Authentication",
    "message": "Invalid email / password"
}
```

_Response(403- Forbidden)_
```
{
    "Error": "Forbidden access",
    "message": "You are not authorized to access the file"
}
```

_Response(404 - not found)_
```
{
    "Error": "Invalid Id",
    "message": "Data not found"
}

```

_Response(400- bad request)_
```
{
    "Error": "Validation error",
    "message": "Status cannot empty"
}
```

_Response (500 - Internal Server Error)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```
---


### DELETE /todos/:id

>Delete todos list by ID

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

<!-- TODO: NEED TO BE FIXED -->
_Request Body_
selected Todo data by User

_Response(200)_
```

```

_Response(401- Unauthorized)_
```
{
    "Error": "Invalid Authentication",
    "message": "Invalid email / password"
}
```

_Response(403- Forbidden)_
```
{
    "Error": "Forbidden access",
    "message": "You are not authorized to access the file"
}
```

_Response(404 - not found)_
```
{
    "Error": "Invalid Id",
    "message": "Data not found"
}

```

_Response (500 - Internal Server Error)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```
---

### POST /register

>Create User

_Request Header_
```
none
```

_Request Body_
```
{
    "email": "<User's email>",
    "password": "<User's password>"
}
```

_Response(201)_
```
{
  "id": <user_registered_id>
  "email": "<registered_email@registered_email_provider.com>",
}
```

<!-- TODO: NEED TO BE FIXED -->
_Response(400- bad request)_
```
{
    "Error": "Bad request",
    "message": "Invalid email / password"
}
```


_Response (500)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```

### POST/login

> Login User

_Request Header_
```
none
```

<!-- TODO: NEED TO BE FIXED -->
_Request Body_
```

```

_Response(200)_
```

```
_Response(400- bad request)_
```

```


_Response (500)_
```

```