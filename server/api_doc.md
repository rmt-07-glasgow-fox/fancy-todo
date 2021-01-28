# Fancy Todo App Server

&nbsp;

## List of REST API
```
* POST /todos
* GET /todos
* GET /todos/:id
* PUT /todos/:id
* PATCH /todos/:id
* DELETE /todos/:id
* GET /holidays
```
&nbsp;
## RESTfull endpoints
---

### POST /todos
> Create Todo

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
    "status": <true or false>,
    "due_date": "<due_date to get insert into>",
}
```

_Response (201 - Created)_
```
{
    "id": <given id by system>,
    "title": "<posted title>",
    "description": "<posted description>",
    "status": <posted status>,
    "due_date": "<posted due_date>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Validation error: ..."
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### GET /todos
> Get All Todo Data

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
        "id": <todo id>,
        "title": "<todo title>",
        "description": "<todo description>",
        "status": <todo status>,
        "due_date": "<todo due_date>",
        "createdAt": "<todo createdAt>",
        "updatedAt": "<todo updatedAt>",
    }
    {
        "id": <todo id>,
        "title": "<todo title>",
        "description": "<todo description>",
        "status": <todo status>,
        "due_date": "<todo due_date>",
        "createdAt": "<todo createdAt>",
        "updatedAt": "<todo updatedAt>",
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

### GET /todos/:id
> Get Detail Todo By Id

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
{
    "id": <id by param>,
    "title": "<todo title>",
    "description": "<todo description>",
    "status": <todo status>,
    "due_date": "<todo due_date>",
    "createdAt": "<todo createdAt>",
    "updatedAt": "<todo updatedAt>",
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data Not Found"
}
```
---

### PUT /todos/:id
> Update Data Todo By Id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "title": "<title to get update>",
    "description": "<description to get update>",
    "status": <true or false>,
    "due_date": "<due_date to get update>",
}
```

_Response (200)_
```
{
    "id": <id by param>,
    "title": "<updated title>",
    "description": "<updated description>",
    "status": <updated status>,
    "due_date": "<updated due_date>",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Validation error: ..."
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### PATCH /todos/:id
> Update Status Todo By Id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "status": <true or false>
}
```

_Response (200)_
```
{
    "id": <id by param>,
    "status": <updated status>
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Validation error: ..."
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### DELETE /todos/:id
> Delete Data Todo By Id

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
{
    "message:" "Todo success to be deleted!"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```

---

### GET /holidays
> Delete Data Todo By Id

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
{
    "name": "New Year's Day",
    "description": "New Year’s Day is the first day of the year, or January 1, in the Gregorian calendar.",
    "date": "2021-01-01"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```