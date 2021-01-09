## My Assets App Server
```
ToDo App is an application to manage and remaind your activities. This app has :
```

## RESTful endpoint for asset's CRUD operation
```
JSON formatted response
```
 

## All RESTful endpoints
```
POST /signUp
POST /signIn
GET /todos
POST /todos
GET /todos/:id
PUT /todos/:id
PATCH /todos/:id
DELETE /todos/:id
```

# POST /signUp
### Create account

## Request Header
```json
not needed
```
## Request Body
```json
{
  "email": "<your email>",
  "password": "<your password>"
}
```
## Response (201 - Created)
```json
{
  "id": 1,
  "email": "user@mail.com"
}
```
## Response (400 - Bad Request)
```json
{
  "message": "Something Wrong"
}
```

# POST /signIn
### Create account

## Request Header
```json
not needed
```
## Request Body
```json
{
  "email": "<your email>",
  "password": "<your password>"
}
```
## Response (201 - Created)
```json
{
  "access_token": "<your access token that has been generated>"
}
```
## Response (400 - Bad Request)
```json
{
  "message": "Invalid email / password"
}
```

# GET /todos
### Get all To Do Lists

## Request Header
```json
{
  "access_token": "<your access token>"
}
```

## Request Body
```json
not needed
```
## Response (200)

```json
[
  {
    "id": 1,
    "name": "<asset name>",
    "description": "<asset description>"
  },
  {
    "id": 2,
    "name": "<asset name>",
    "description": "<asset description>"
  }
]
```

## Response (400 - Bad Request)
```json
{
  "message": "Someting Wrong"
}
```

# POST /todos
### Create a new To Do List

## Request Header
```json
{
  "access_token": "<your access token>"
}
```
## Request Body
```json
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into>",
}
```
## Response (201 - Created)
```json
{
  "id": 11,
  "title": "Wisuda",
  "description": "Wisuda",
  "due_date": "2021-10-03"
}
```
## Response (400 - Bad Request)
```json
{
  "message": "Something Wrong"
}
```

# GET /todos/:id
### Get current list depends on id

## Request Header
```json
{
  "access_token": "<your access token>"
}
```

## Request Params
```json
{
  "id": "<your id>"
}
```
## Request Body
```json
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into>",
}
```
## Response (200)
```json
{
  "id": 11,
  "title": "Wisuda",
  "description": "Wisuda",
  "due_date": "2021-10-03"
}
```
## Response (400 - Bad Request)
```json
{
  "message": "Something Wrong"
}
```

# PUT /todos/:id
### Update data current list depends on id
## Request Header
```json
{
  "access_token": "<your access token>"
}
```

## Request Params
```json
{
  "id": "<your id>"
}
```
## Request Body
```json
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into>",
}
```
## Response (200)
```json
{
  "id": 11,
  "title": "Wisuda",
  "description": "Wisuda",
  "due_date": "2021-10-03"
}
```
## Response (400 - Bad Request)
```json
{
  "message": "Something Wrong"
}
```

# PATCH /todos/:id
### Update status on current list depends on id
## Request Header
```json
{
  "access_token": "<your access token>"
}
```

## Request Params
```json
{
  "id": "<your id>"
}
```
## Request Body
```json
{
  "status": "<status to get insert into>"
}
```
## Response (200)
```json
{
  "status": "done"
}
```
## Response (400 - Bad Request)
```json
{
  "message": "Something Wrong"
}
```

# DELETE /todos/:id
### Delete current list depends on id
## Request Header
```json
{
  "access_token": "<your access token>"
}
```

## Request Params
```json
{
  "id": "<your id>"
}
```
## Request Body
```json
not needed
```
## Response (200)
```json
{
  "message": "todo success to delete"
}
```
## Response (400 - Bad Request)
```json
{
  "message": "Something Wrong"
}
```