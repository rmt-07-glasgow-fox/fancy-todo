# Todo App Server
Todo App is an application to manage your assets. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;
# All endpoints in server
list endpoints:
- POST /register
- POST /login
- GET /todos
- GET /todos/:id
- POST /todos
- PUT /todos/:id
- DELETE /todos/:id
- GET /weather

&nbsp;
# RESTful endpoints

### POST /register/


_Request:_

- body : 

    ```json
    {
        "email" : "mail@email.com",
        "passoword" : "password"
    }
    ```

_Response:_
- body
    ```json
    {
        "id": 1,
        "email": "mail@email.com",
        "createdAt": "2020-06-08T03:33:04.404Z",
        "updatedAt": "2020-06-08T03:33:04.404Z"
    },
    ```

### POST /login/
_Request_
- body

    ```json
    {
        "email" : "mail@email.com",
        "passoword" : "password"
    }
    ```
_Response_
- body

    ```json
    {
        "message":"berhasil login",
        "access_token":"youraccesstoken"
    },
    ```
### GET /todos
_Request_
- headers

    ```json
    {
        "access_token":"youraccesstoken"
    }
    ```
_Response_
- body

    ```json
    {
        "message":"berhasil login",
        "access_token":"youraccesstoken"
    },
    ```
