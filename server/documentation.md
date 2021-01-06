## My Assets App Server
My Assets App is an application to manage your assets. This app has :

## RESTful endpoint for asset's CRUD operation
JSON formatted response
 

## RESTful endpoints
GET /todos => Get all To Do Lists
POST /todos => Create a new To Do List
GET /todos/:id => Get current list depends on id
PUT /todos/:id => Update data current list depends on id
PATCH /todos/:id => Update status on current list depends on id
DELETE /todos/:id => Delete current list depends on id

# Request Header

{
  "access_token": "<your access token>"
}

# Request Body

not needed
Response (200)

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

# Response (400 - Bad Request)

{
  "message": "Invalid request"
}

## POST /assets
# Create new asset

# Request Header

{
  "access_token": "<your access token>"
}
# Request Body

{
  "name": "<name to get insert into>",
  "description": "<description to get insert into>"
}
# Response (201 - Created)

{
  "id": <given id by system>,
  "name": "<posted name>",
  "description": "<posted description>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
# Response (400 - Bad Request)

{
  "message": "Invalid requests"
}
