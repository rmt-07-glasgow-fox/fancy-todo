# Fancy Todo

My FancyTodo App is an application to manage your life. This app has :

- RESTful endpoint for asset's CRUD operation
- JSON formatted response

&nbsp;

## List Available endPoints

- `GET /todos`
- `POST /todos`
- `PUT /todos/:id`
- `PATCH /todos/:id`
- `DELETE /todos/:id`

## RESTful endpoints

### GET /todo

> Get all todo

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200)_

```
[
  {
    "id": 1,
    "title": "joging",
    "description": "joging bersama teman",
    "status": false,
    "due_date": "2021-01-09T17:00:00.000Z",
    "createdAt": "2021-01-04T07:25:24.893Z",
    "updatedAt": "2021-01-04T07:25:24.893Z"
  },
  {
    "id": 2,
    "title": "joging",
    "description": "joging bersama teman",
    "status": false,
    "due_date": "2021-01-09T17:00:00.000Z",
    "createdAt": "2021-01-04T07:25:24.893Z",
    "updatedAt": "2021-01-04T07:25:24.893Z"
  }
]
```

_Response (400 - Bad Request)_

```
{
  "message": "Invalid request"
}
```

---

### POST /assets

> Create new asset

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
  "description": "<description to get insert into>"
  "status":"<status to get insert into>
  "due_date":"<due_date to get insert into>
}
```

_Response (201 - Created)_

```
{
  "id": <given id by system>,
  "tile": "<posted title>",
  "description": "<posted description>",
  "status":"<posted status>
  "due_date":"<posted due_date>
  "createdAt": <time stamp>",
  "updatedAt": "<time stamp",
}
```

_Response (400 - Bad Request)_

```
{
  "message": "Invalid requests"
}
```
