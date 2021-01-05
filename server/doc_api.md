# Todo App Server
Todo App is an application to manage your assets. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;
# All endpoints in server
list endpoints:
- POST /register
- POST /login

&nbsp;
# RESTful endpoints

- POST /register/

    _Request:_

    >body : 

    ```json
    {
        "email" : <yourname>,
        "passoword" : <yourpassword>
    }
    ```

    _Response:_

    ```json
    {
        "id": 1,
        "email": <yourname>,
        "createdAt": "2020-06-08T03:33:04.404Z",
        "updatedAt": "2020-06-08T03:33:04.404Z"
    },
    ```

- POST /login/
