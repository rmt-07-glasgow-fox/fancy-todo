# Fancy Todo
Fancy Todo is an web application to manage todo list. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response
* 

&nbsp;

## RESTful endpoints

### GET /todos

> Get all assets

_Request Header_
```

```

_Request Body_
```
not needed
```

_Response (200)_
```json
[
  {
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date in Date format>",
    "createdAt": "2021-01-04T16:08:02.900Z",
    "updatedAt": "2021-01-04T16:08:02.900Z"
  },
  {
    "id": 1,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": "<todo status>",
    "due_date": "<todo due_date in Date format>",
    "createdAt": "2021-01-04T16:08:02.900Z",
    "updatedAt": "2021-01-04T16:08:02.900Z"
  }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
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
  "name": "<name to get insert into>",
  "description": "<description to get insert into>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "name": "<posted name>",
  "description": "<posted description>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid requests"
}
```