# fancy-todo

Keep your todo list in this application

&nbsp;

## Endpoints

- `POST /todos`
- `GET /todos`
- `GET /todos/:id`
- `PUT /todos/:id`
- `PATCH /todos/:id`
- `DELETE /todos/:id`

&nbsp;

## RESTful Endpoints

### POST /todos

> Add new Todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
{
  "title" : "<title to be inserted>"
  "description" : "<description to be inserted>"
  "status" : "<status to be inserted>"
  "dueDate" : "<dueDate to be inserted>"
}
```
_Response (201)_
```
{
  "id" : 1,
  "title" : "<title to be inserted>",
  "description" : "<description to be inserted>",
  "status" : "<status to be inserted>",
  "dueDate" : "<dueDate to be inserted>",
  "UserId": "<User logged Id>",
  "createdAt" : "<2021-01-05T16:28:00.651Z>"
  "updatedAt" : "<2021-01-05T16:29:00.651Z>"
}
```
_Response (400 - Bad Request)_
```
{
  "message": "Date must be after today",
  "type": "Validation error",
  "path": "due_date",
  "value": "2021-01-04T00:00:00.000Z",
  "origin": "FUNCTION",
  "instance": {
    "id": "<User logged Id>",
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "updatedAt": "<todo updated at>",
    "createdAt": "<todo created at>"
  },
  "validatorKey": "isAfter",
  "validatorName": "isAfter",
  "validatorArgs": [
    "<current date>"
  ],
  "original": {
    "validatorName": "isAfter",
    "validatorArgs": [
      "<current date>"
    ]
  }
}
```
Response (500 - Internal Server Error)
```
{
  "messsage": "Internal Server Error"
}
```
&nbsp;

### GET /todos

> List all todos

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_

```
Not Needed
```

_Response (200)_
```
[
  {
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "2021-01-09T00:00:00.000Z",
    "UserId": "<User logged Id>",
    "createdAt": "2021-01-05T16:28:00.651Z",
    "updatedAt": "2021-01-05T16:28:12.372Z"
  },
  {
    "id": 2,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "2021-01-09T00:00:00.000Z",
    "UserId": "<User logged Id>",
    "createdAt": "2021-01-05T16:28:00.651Z",
    "updatedAt": "2021-01-05T16:28:12.372Z"
  }
]
```
_Response (500 - Internal Server Error)_
```
{
  "messsage": "Internal Server Error"
}
```
&nbsp;

### GET /todos/:id

> List all Todos based on id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
Not needed
```
_Response (200)_
```
{
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "2021-01-07T00:00:00.000Z",
    "UserId": "<User logged Id>",
    "createdAt": "2021-01-04T16:28:00.651Z",
    "updatedAt": "2021-01-04T16:28:12.372Z"
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
  "message": "Internal Server Error"
}
```
&nbsp;

### PUT /todos/:id

> Update Todos based on id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
{
  "title": "<title name>",
  "description": "<description name>",
  "status": "<status>",
  "due_date": "<due_date>"
}
```
_Response (200)_
```
{
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "2021-01-07T00:00:00.000Z",
    "UserId": "<User logged Id>",
    "createdAt": "2021-01-04T16:28:00.651Z",
    "updatedAt": "2021-01-04T16:28:12.372Z"
}
```
_Response (400 - Bad Request)_
```
{
  "message": "Date must be after today",
  "type": "Validation error",
  "path": "due_date",
  "value": "2021-01-04T00:00:00.000Z",
  "origin": "FUNCTION",
  "instance": {
    "id": "<User logged Id>",
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due date>",
    "updatedAt": "<todo updated at>",
    "createdAt": "<todo created at>"
  },
  "validatorKey": "isAfter",
  "validatorName": "isAfter",
  "validatorArgs": [
    "<current date>"
  ],
  "original": {
    "validatorName": "isAfter",
    "validatorArgs": [
      "<current date>"
    ]
  }
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
  "message": "Internal Server Error"
}
```
&nbsp;

### PATCH /todos/:id

> Update Todos status based on id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
{
  "status": "<status to be changed>"
}
```
_Response (200)_
```
{
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "dueDate": "<2021-01-09T16:28:00.651Z>",
    "UserId": "<User logged Id>",
    "createdAt": "<2021-01-05T16:28:00.651Z>",
    "updatedAt": "<2021-01-05T16:29:00.651Z>"
}
```
_Response (400 - Bad Request)_
```
[
  {
    "message": "Date must be after today",
    "type": "Validation error",
    "path": "due_date",
    "value": "2021-01-04T00:00:00.000Z",
    "origin": "FUNCTION",
    "instance": {
      "id": "<User logged Id>",
      "title": "<todo title>",
      "description": "<todo description>",
      "status": "<todo status>",
      "due_date": "<todo due date>",
      "updatedAt": "<todo updated at>",
      "createdAt": "<todo created at>"
    },
    "validatorKey": "isAfter",
    "validatorName": "isAfter",
    "validatorArgs": [
      "<current date>"
    ],
    "original": {
      "validatorName": "isAfter",
      "validatorArgs": [
        "<current date>"
      ]
    }
  }
]
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
  "message": "Internal Server Error"
}
```
&nbsp;

### DELETE /todos/:id

> Delete spesific Todo

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
Not needed
```
_Response (200)_
```
{
  "message": "Todo deleted successfully"
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
  "message": "Internal Server Error"
}
```