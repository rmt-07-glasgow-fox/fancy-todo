# Fancy Todo App Server
Fancy Todo is an application that tracks your daily todo list. This app has:
* REST endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;

# REST endpoints

## POST /todos
_Request Header_
```
{
  "Content-Type": "application/json" 
}
```
_Request Body_
```
{
  "title": "Complete Fancy Todo App",
  "description": "P2W1 Individual Challenge",
  "status": false,
  "due_date": "2021-01-09"
}
```
_Success Response_
```
code: 201

content: 
{
  "id": 5,
  "title": "Complete Fancy Todo App",
  "description": "P2W1 Individual Challenge",
  "status": false,
  "due_date": "2021-01-06T00:00:00.000Z",
  "createdAt": "2021-01-04T12:25:43.532Z",
  "updatedAt": "2021-01-04T12:25:43.532Z"
}
```
_Error Response_
```
code: 400

content: { message: 'Can not choose date in the past' }

OR

code: 500

content: { message: 'internal server error' }
```

&nbsp;

## GET /todos
_Request Header_
```
{
  "Content-Type": "application/json" 
}
```
_Request Body_
```
not needed
```
_Success Response_
```
code: 200

content:
[
  {
    "id": 1,
    "title": "Complete Fancy Todo App",
    "description": "P2W1 Individual Challenge",
    "status": false,
    "due_date": "2021-01-06T00:00:00.000Z",
    "createdAt": "2021-01-04T12:25:43.532Z",
    "updatedAt": "2021-01-04T12:25:43.532Z"
  }
]
```
_Error Response_
```
code: 500

content: { message: 'internal server error' }
```

&nbsp;

## GET /todos/:id
_Request Header_
```
{
  "Content-Type": "application/json" 
}
```
_Request Params_
```
{
  "id": 1
}
```
_Success Response_
```
code: 200

content:
{
  "id": 1,
  "title": "Complete Fancy Todo App",
  "description": "P2W1 Individual Challenge",
  "status": false,
  "due_date": "2021-01-06T00:00:00.000Z",
  "createdAt": "2021-01-04T12:25:43.532Z",
  "updatedAt": "2021-01-04T12:25:43.532Z"
}
```
_Error Response_
```
code: 404

content: { message: 'error not found' }

OR

code: 500

content: { message: 'internal server error' }
```

&nbsp;

## PUT /todos/:id
_Request Header_
```
{
  "Content-Type": "application/json" 
}
```
_Request Body_
```
{
  "title": "Complete Fancy Todo App",
  "description": "Hacktiv8's P2W1 Individual Challenge",
  "status": false,
  "due_date": "2021-01-08"
}
```
_Request Params_
```
{
  "id": 1
}
```
_Success Response_
```
code: 200

content:
{
  "id": 1,
  "title": "Complete Fancy Todo App",
  "description": "Hacktiv8's P2W1 Individual Challenge",
  "status": false,
  "due_date": "2021-01-06T00:00:00.000Z",
  "createdAt": "2021-01-04T12:25:43.532Z",
  "updatedAt": "2021-01-04T14:21:39.770Z"
}

```
_Error Response_
```
code: 404

content: { message: 'error not found' }

OR

code: 400

content: { message: 'Can not choose date in the past' }

OR

code: 500

content: { message: 'internal server error' }
```

&nbsp;

## PATCH /todos/:id
_Request Header_
```
{
  "Content-Type": "application/json" 
}
```
_Request Body_
```
{
  "status": true
}
```
_Request Params_
```
{
  "id": 1
}
```
_Success Response_
```
{
  "id": 1,
  "title": "Complete Fancy Todo App",
  "description": "Hacktiv8's P2W1 Individual Challenge",
  "status": true,
  "due_date": "2021-01-06T00:00:00.000Z",
  "createdAt": "2021-01-04T12:25:43.532Z",
  "updatedAt": "2021-01-04T14:21:39.770Z"
}
```

_Error Response_
```
code: 404

content: { message: 'error not found' }

OR

code: 400

content: { message: 'Can not choose date in the past' }

OR

code: 500

content: { message: 'internal server error' }
```

&nbsp;

## DELETE /todos/:id

_Request Header_
```
{
  "Content-Type": "application/json" 
}
```
_Request Params_
```
{
  "id": 1
}
```
_Success Response_
```
{
  message: 'todo success to delete'
}

```
_Error Response_
```
code: 404

content: { message: 'error not found' }

OR

code: 500

content: { message: 'internal server error' }
```


