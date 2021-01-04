# Fancy Todo Website
My Fancy Todo app is a website where you can manage your todo lists. This app features :
* RESTful endpoint for the CRUD operation
* JSON formatted responses

&nbsp;

## RESTful endpoints
### GET /todos

> Get all todos

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "id": 1,
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status>",
        "due_date": "<todo due_date>",
        "createdAt": "2021-01-04T07:22:32.399Z",
        "updatedAt": "2021-01-04T07:22:32.399Z"
    },
    {
        "id": 2,
        "title": "<todo title>",
        "description": "<todo description>",
        "status": "<todo status>",
        "due_date": "<todo due_date>",
        "createdAt": "2021-01-04T06:43:29.956Z",
        "updatedAt": "2021-01-04T07:41:43.824Z"
    }
]
```

_Response (500)_
```
{
    message: "Internal Server Error"
}
```

### POST /todos

> Create new todo

_Request Body_
```
{
    "title": "<title to get insert into>",
    "description": "<description of todo to get insert into>",
    "status": "<status of todo to get insert into>",
    "due_date": "<due_date of todo to get insert into>"
}
```

_Response (201)_
```
{
    "id": <given by the system>,
    "title": "<posted title>",
    "description": "<posted description>",
    "status": <posted status>,
    "due_date": "<posted due_date>",
    "updatedAt": "2021-01-04T10:26:57.723Z",
    "createdAt": "2021-01-04T10:26:57.723Z"
}
```

_Response (400)_
```
{
    "Errors": [
        "Date have to be greater than today"
    ]
}
```

_Response (500)_
```
{
    message: "Internal Server Error"
}
```

### GET /todos/:id

> Get a specific todo based on id

_Request Body_
```
not needed
```

_Request Params_
```
id=[integer]
```

_Response (200)_
```
{
    "id": <based on params>,
    "title": "<title name based on id>",
    "description": "<description based on id>",
    "status": <status based on id>,
    "due_date": "<due_date based on id>",
    "createdAt": "2021-01-04T06:43:29.956Z",
    "updatedAt": "2021-01-04T07:41:43.824Z"
}
```

_Response (404)_
```
{
    "message": "error not found"
}
```

### PUT /todos/:id

> Edit all column based on id

_Request Body_
```
{
    "title": "<title to get updated into>",
    "description": "<description of todo to get updated into>",
    "status": "<status of todo to get updated into>",
    "due_date": "<due_date of todo to get updated into>"
}
```

_Request Params_
```
id=[integer]
```

_Response (200)_
```
{
    "id": <given by the system>,
    "title": "<updated title>",
    "description": "<updated description>",
    "status": <updated statys>,
    "due_date": "updated due_date",
    "createdAt": "2021-01-04T06:43:29.956Z",
    "updatedAt": "2021-01-04T10:37:33.696Z"
}
```