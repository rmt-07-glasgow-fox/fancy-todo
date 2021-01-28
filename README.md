### How To Use
```
SETTING

npm i
sequelize db:migrate

RUN
npm install -g nodemon (if you dont have installed globally)
nodemon app.js (if you have installed nodemon globally)

Server URL : http://localhost:3000

```


### User
| Method | Route            | Description           |
| ------ | ---------------- | --------------------- |
| POST   | /auth/register   | Add new user          |
| POST   | /auth/login      | Login user            |
| POST   | /auth/loginGooge | Login user Via Google |

### TO-DO
| Method | Route            | Description                                     |
| ------ | ---------------- | ----------------------------------------------- |
| GET    | /todos     | Get all To-Do data |
| POST    | /todos | Add New data             |
| DELETE    | /todos/:id | Delete Selected Data              |
| PUT    | /todos/:id | Edit All Attributes data              |
| PATCH    | /todos/:id | Edit Status To false              |


### POST /auth/login
---
> login user

_Request Headers_
```
Not needed
```

_Request Body_
```
{
    email : user01@gmail.com,
    password : user01
}
```

_Response ( 200 )_
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InJvbWl6YWtpIiwiZW1haWwiOiJyemZlcmRpeWFudG9AZ21haWwuY29tIiwiaWF0IjoxNjEwMDg5NTk3fQ.SsRxk2IWB_Z11AWIpXOBcZIVt4Mm22gM04PIMC2n99g"
}
```

---
### POST /auth/loginGoogle
---
> login user

_Request Headers_
```
Not needed
```

_Request Body_
```
{
    email : user01@gmail.com,
    password : user01
}
```

_Response ( 200 )_
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InJvbWl6YWtpIiwiZW1haWwiOiJyemZlcmRpeWFudG9AZ21haWwuY29tIiwiaWF0IjoxNjEwMDg5NTk3fQ.SsRxk2IWB_Z11AWIpXOBcZIVt4Mm22gM04PIMC2n99g"
}
```

_Response (401)_
```
{
    "msg": "Invalid Email/Password"
}
```

---
### POST /auth/register
---
> register user

_Request Headers_
```
Not needed
```

_Request Body_
```
{
    email : user01@gmail.com,
    password : user01
}
```

_Response ( 200 )_
```
{
    "name": "Romi Zaki",
    "email": "greedymons@gmail.com"
}
```

_Response (400)_
```
[
    {
        "message": "email must be unique",
        "column": "email"
    }
]
```

_Response (500)_
```
{
    "msg": "Internar server error"
}
```