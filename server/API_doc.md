# My Fancy Todo App
My Fancy Todo app is an application to manage your activities. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## List endpoitns
- `POST /fancyTodo`
- `GET /fancyTodo`

## RESTful endpoint

### GET /assets
> Get all assets
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
```
{
     "message": "Invalid request"
}
```
---

### POST /fancyTodo
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