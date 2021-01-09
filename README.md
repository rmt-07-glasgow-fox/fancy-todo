# FANCY TODOS

​
List of available endpoints:
​
- `POST /register`
- `POST /login`
- `post /googleLogin`
- `POST /todos`
- `GET /todos`
- `GET /todos/:id`
- `PUT /todos/:id`
- `DELETE /todos/:id`
- `GET /sholat` 

### POST /register

- Request Header
    Not required.
​
- Request Body
​
```json
    {
        "email": "admin@gmail.com",
        "password": "1234567"
    }
 ```
​
- Response 201: Created
```json
{
    "id": 12,
    "email": "admin@gmail.com",
    "password": "$2b$10$KsXX93idSh1MJqwGS/MXzu4X.iKSftlRC1OdzqcguFwdV7YPE/lhW",
    "updatedAt": "2021-02-05T03:19:54.940Z",
    "createdAt": "2021-02-05T03:19:54.940Z"
}
```
​
- Response 400: Bad Request
```json
    {
        "type": "Bad Request",
        "errors": [
            {
                "message": "Please input valid email"
            },
            {
                "message": "Password minimum 6 characters!"
            }
        ]
    }
```
​
- Response 500: Internal server error
```json
    {
        type: "Internal Server Error", <show error>
    }
```
​
### POST /login
​
- Request Header
    Not required.
​
- Request Body
```json
    {
        "email": "admin@gmail.com",
        "password": "1234567"
    }
```
​
- Response 200: OK
```json
{
    "user": {
        "id": 12,
        "email": "admin@gmail.com",
        "password": "$2b$10$KsXX93idSh1MJqwGS/MXzu4X.iKSftlRC1OdzqcguFwdV7YPE/lhW",
        "createdAt": "2021-02-05T03:19:54.940Z",
        "updatedAt": "2021-02-05T03:19:54.940Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImVtYWlsIjoiY29uYW5AZ21haWwuY29tIiwiaWF0IjoxNTk2ODU3MDE5fQ.K_yQyJAo3koDiyTeYx-DYpBpMtUoSwOd0Rmd_hQa1G4"
}
```
​
- Response 400: Bad Request
```json
    {
        "message": "email or password is incorrect",
        "errorCode": "NOT_FOUND_USER"
    }
```
​
- Response 500: Internal server error
```json
    {
        type: "Internal Server Error", <show error>
    }
```
​
### POST /googleLogin
​
- Request Header
    Not required.
​
- Request Body
```json
    {
        "email": "<user's email>",
        "password": "<user's password>"
    }
```
​
- Response 200: OK
```json
    { 
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImVtYWlsIjoiYWRuYW5rYW1pbDI3QGdtYWlsLmNvbSIsImlhdCI6MTU5Njg1NzM1MX0._0gBOnqsZuju4tA40yLTX7OICljOzf7NsIPI_pWAeeA" 
    }
```
​
- Response 400: Bad Request
```json
    {
        "message": "Invalid email/password"
    }

```
​
- Response 500: Internal server error
```json
    {
        type: "Internal Server Error", <show error>
    }
```
​
### POST /todos
​
- Request Header
```json
    {
        "accesstoken":"<access token>"
    }
```
- Request Body
```json
    {
        "title": "happy",
        "description": "kasus tingkat S",
        "dueDate": "2021-10-20"
    }
```
​
- Response 200: OK
```json
    {
        "id": 23,
        "title": "happy",
        "description": "kasus tingkat S",
        "dueDate": "2021-10-20T00:00:00.000Z",
        "UserId": 12,
        "updatedAt": "2021-02-05T03:35:02.314Z",
        "createdAt": "2021-02-05T03:35:02.314Z",
        "status": false
    }
```

- Response 400: Internal server error
```json
    [
        {
            "message": "Validation error. Due date must be after today!",
            "errorCode": "VALIDATIN_ERROR"
        },
        {
            "message": "Please input title for your todo list!",
            "errorCode": "VALIDATIN_ERROR"
        },
        {
            "message": "Please input description for your todo list!",
            "errorCode": "VALIDATIN_ERROR"
        }
        
    ]
```

- Response 500: Internal server error
```json
    {
        type: "Internal Server Error", <show error>
    }
```

### GET /todos
​
- Request Header
```json
    {
        "accesstoken":"<access token>"
    }
```
- Request Body
    no needed
​
- Response 200: OK
```json
[
    {
        "id": 23,
        "title": "happy",
        "description": "kasus tingkat S",
        "status": false,
        "dueDate": "2021-10-20T00:00:00.000Z",
        "UserId": 12,
        "createdAt": "2021-02-05T03:35:02.314Z",
        "updatedAt": "2021-02-05T03:35:02.314Z"
    }
]
```

- Response 500: Internal server error
```json
    {
        type: "Internal Server Error", <show error>
    }
```

### GET /todos/:id
​
- Request Header
```json
    {
        "accesstoken":"<access token>"
    }
```
- Request Body
    no needed
​
- Response 200: OK
```json
[
    {
        "id": 23,
        "title": "happy",
        "description": "always happy",
        "status": false,
        "dueDate": "2021-10-20T00:00:00.000Z",
        "UserId": 12,
        "createdAt": "2021-02-05T03:35:02.314Z",
        "updatedAt": "2021-02-05T03:35:02.314Z"
    }
]
```
- Response 400: Bad Request
```json
    [
        {
            "message": "Not Authorized",
            "errorCode": "INVALID_ACCOUNT"
        }
    ]
```

- Response 500: Internal server error
```json
    {
        type: "Internal Server Error", <show error>
    }
```

### PUT /todos/:id
​
- Request Header
```json
    {
        "accesstoken":"<access token>"
    }
```
- Request Body
```json
    {
        "title": "happy",
        "description": "kasus terpecahkan",
        "dueDate": "2021-10-20"
    }
```
​
- Response 200: OK
```json
    {
        "id": 23,
        "title": "happy",
        "description": "happy new year",
        "dueDate": "2021-10-20T00:00:00.000Z",
        "UserId": 12,
        "updatedAt": "2021-02-05T03:35:02.314Z",
        "createdAt": "2021-02-05T03:35:02.314Z",
        "status": false
    }
```

- Response 400: Internal server error
```json
    [
        {
            "message": "Validation error. Due date must be after today!",
            "errorCode": "VALIDATIN_ERROR"
        },
        {
            "message": "Please input title for your todo list!",
            "errorCode": "VALIDATIN_ERROR"
        },
        {
            "message": "Please input description for your todo list!",
            "errorCode": "VALIDATIN_ERROR"
        }
        
    ]
```

- Response 500: Internal server error
```json
    {
        type: "Internal Server Error", <show error>
    }
```

### DELETE /todos/:id
​
- Request Header
```json
    {
        "accesstoken":"<access token>"
    }
```
- Request Body
    no needed
​
- Response 200: OK
```json
    {
        "id": 23,
        "title": "happy",
        "description": "happy new year",
        "dueDate": "2021-10-20T00:00:00.000Z",
        "UserId": 12,
        "updatedAt": "2021-02-05T03:35:02.314Z",
        "createdAt": "2021-02-05T03:35:02.314Z",
        "status": false
    }
```

- Response 500: Internal server error
```json
    {
        type: "Internal Server Error", <show error>
    }
```





## Time Prayer (THIRD PARTY API)

Find time to prayer
​
- Request Header:
    no needed
```
​
- Request Body:
```json
    {
        "contry": "Jakarta",
        "city": "Indonesia"
    }
```
​
- Response (200 - OK):
```json
    {
        "Fajr": "05:03",
        "Sunrise": "06:02",
        "Dhuhr": "11:58",
        "Asr": "15:20",
        "Sunset": "17:55",
        "Maghrib": "17:55",
        "Isha": "18:54",
        "Imsak": "04:53",
        "Midnight": "23:58"
    }
```