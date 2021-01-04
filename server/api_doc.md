# Fancy Todo App
Fancy Todo App is an application to make a list of every fancy todo of your daily activities. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## List of available endpoints
- `GET /todo`
- `POST /todo`

## RESTful endpoints

### GET /assets

> Get all assets

_Request Header_
```json
{
  "access_token": "<your access token>"
}
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
    "name": "<asset name>",
    "description": "<asset description>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "name": "<asset name>",
    "description": "<asset description>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid request"
}
```
---
### POST /assets

> Create new asset

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "name": "<name to get insert into>",
  "description": "<description to get insert into>"
}
```

_Response (201 - Created)_
```json
{
  "id": <given id by system>,
  "name": "<posted name>",
  "description": "<posted description>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid requests"
}
```
