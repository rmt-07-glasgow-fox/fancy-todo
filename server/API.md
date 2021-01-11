# Fancy Todo Website
My Fancy Todo app is a website where you can manage your todo lists. This app features :
* RESTful endpoint for the CRUD operation
* JSON formatted responses

&nbsp;

## RESTful endpoints
### GET /todos

> Get all todos

_Request Header_
```
{
    "access_token" : <given by the system>
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
        "title": "Olahraga",
        "description": "Biar Sehat,
        "status": false,
        "due_date": "2021-01-08T00:00:00.000Z",
        "createdAt": "2021-01-04T07:22:32.399Z",
        "updatedAt": "2021-01-04T07:22:32.399Z"
    },
    {
        "id": 2,
        "title": "Beli Aqua",
        "description": "Minum untuk seminggu",
        "status": false,
        "due_date": "2021-01-06T00:00:00.000Z",
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

_Request Header_
```
{
    "access_token" : <given by the system>
}
```

_Request Body_
```
{
    "title": "<title to get insert into>", DataType : string,
    "description": "<description of todo to get insert into>", DataType: string,
    "status": "<status of todo to get insert into>", DataType: boolean,
    "due_date": "<due_date of todo to get insert into>, DataType: date"
}
```

_Response (201)_
```
{
    "id": 3,
    "title": "Beli Makanan",
    "description": "biar ga lapar",
    "status": false,
    "due_date": "2021-01-07T00:00:00.000Z",
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

_Request Header_
```
{
    "access_token" : <given by the system>
}
```

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
    "id": 1,
    "title": "Olahraga Pagi",
    "description": "Jangan lupa olahraga",
    "status": false,
    "due_date": "2021-01-07T00:00:00.000Z",
    "updatedAt": "2021-01-04T10:26:57.723Z",
    "createdAt": "2021-01-04T10:26:57.723Z"
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

_Request Header_
```
{
    "access_token" : <given by the system>
}
```

_Request Body_
```
{
    "title": "<title to get updated into>", DataType: string,
    "description": "<description of todo to get updated into>", DataType: string,
    "status": "<status of todo to get updated into>", DataType: boolean,
    "due_date": "<due_date of todo to get updated into>, DataType: date"
}
```

_Request Params_
```
id=[integer]
```

_Response (200)_
```
{
    "id": 3,
    "title": "Beli Sarapan",
    "description": "biar ga lapar",
    "status": false,
    "due_date": "2021-01-07T00:00:00.000Z",
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

_Response (404)_
```
{
    "message": "error not found"
}
```

_Response (500)_
```
{
    message: "Internal Server Error"
}
```

### PATCH /todos/:id

> For updating status of todo

_Request Header_
```
{
    "access_token" : <given by the system>
}
```

_Request Body_
```
{
    "status" : <status of todo list to be updated to>
}
```

_Request Params_
```
id=[integer]
```

_Response (200)_
```
{
    "id": 3,
    "title": "Beli Makanan",
    "description": "biar ga lapar",
    "status": true,
    "due_date": "2021-01-07T00:00:00.000Z",
    "updatedAt": "2021-01-04T10:26:57.723Z",
    "createdAt": "2021-01-04T10:26:57.723Z"
}

```

_Response (400)_
```
{
    "Errors": [
        "Only can accept boolean"
    ]
}
```

_Reponses (404)_
```
{
    "message": "error not found"
}
```
_Response (500)_
```
{
    message: "Internal Server Error"
}
```

### DELETE /todos/:id

> Delete a todo item based on id

_Request Header_
```
{
    "access_token" : <given by the system>
}
```

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
    "message": "todo success to delete"
}
```

_Response (404)_
```
{
    "message": "error not found"
}
```

_Response (500)_
```
{
    message: "Internal Server Error"
}
```

### POST /register

> add user to database

_Request Body_
```
{
    "email" : "example@mail.com",
    "password" : "password"
}
```

_Response (201)_
```
{
    "id": 1,
    "email": "example@mail.com"
}
```

_Response (400)_
```
{
    "Errors": [
        "Invalid email format",
        "Minimal password length is 8 character"
    ]
}
```

_Response (500)_
```
{
    message: "Internal Server Error"
}
```


### POST /login

> login user to main page using authentification

_Request Body_
```
{
    "email" : "example@mail.com",
    "password" : "password"
}
```

_Response (201)_
```
{
    "access_token": <given by the system>
}
```

_Response (400)_
```
{
    "message": "Incorect Email / Password"
}
```

_Response (500)_
```
{
    message: "Internal Server Error"
}
```


### GET /loginGoogle

> login user using 3rd Party OAuth2 from google

_Response (500)_
```
{
    message: "Internal Server Error"
}
```


### GET /calendar

> use 3rd Party API to find data of holidays

_Request Header_
```
{
    "access_token" : <given by the system>
}
```
_Request Body_
```
{
    not needed
}
```

_Response (200)_
```
{
    {
    "holidays": [
        {
            "name": "New Year's Day",
            "description": "New Year’s Day is the first day of the year, or January 1, in the Gregorian calendar.",
            "country": {
                "id": "id",
                "name": "Indonesia"
            },
            "date": {
                "iso": "2021-01-01",
                "datetime": {
                    "year": 2021,
                    "month": 1,
                    "day": 1
                }
            },
            "type": [
                "National holiday"
            ],
            "locations": "All",
            "states": "All"
        }
    }
}
```


_Response (500)_
```
{
    message: "Internal Server Error"
}
```
