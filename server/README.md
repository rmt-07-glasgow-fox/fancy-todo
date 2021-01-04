# TODO App Server
TODO App is an application to make list of our task. This app has:
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### GET /todos

> Get all assets

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

_Response (501 - Internal Server Error)_
```json
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