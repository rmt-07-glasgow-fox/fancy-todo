**fancy todo**
----
  Fancy Todo is an application to manage your todo list. this app has:
  - RESTful endpoint for todo's CRUD opration
  - JSON formatted response

&nbsp;

# RESTful endpoints
**Register**
----
  create user into server

* **URL**

  /register

* **Method**

  `POST`

* **Request Body**

  ```
  {
    "email": "agus@gmail.com",
    "password": "123123123"
  }
  ```

* **Success Response:** <br />
  **Code:** 201 <br />
  **Content:**
  ```
  {
    "id": 1,
    "email": "agus@gmail.com"
  }
  ```

* **Failed Response:** <br />
  **Code:** 400 <br />
  **Content:**
  ```
  {
    <validation message>
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "message": "Internal server error"
  }
  ```

**Login**
----
  login into server

* **URL**

  /login

* **Method**

  `POST`

* **Request Body**

  ```
  {
    "email": "agus@gmail.com",
    "password": "123123123"
  }
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJhZ3VzQGdtYWlsLmNvbSIsImlhdCI6MTYxMDAyNjMzNH0.5AsUmBNb3g8F3KVNMW0iziNvnAahsz2M3CQV8iRBC_Q"
  }
  ```

* **Failed Response:** <br />
  **Code:** 400 <br />
  **Content:**
  ```
  {
    <validation message>
  }
  ```
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "message": "invalid email / password"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "message": "Internal server error"
  }
  ```

**Create todo**
----
  Create todo into server

* **URL**

  /todos

* **Method**

  `POST`

* **Request Body**

  ```
  {
    "title": "Makan",
    "description": "Makan malam",
    "status": false,
    "due_date": "2021-01-08"
  }
  ```

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  {
    "id": 1,
    "title": "Makan",
    "description": "Makan Malam",
    "status": false,
    "due_date": "2021-01-08T00:00:00.000Z",
    "UserId": 1,
    "updatedAt": "2021-01-07T13:38:37.181Z",
    "createdAt": "2021-01-07T13:38:37.181Z"
  }
  ```

* **Failed Response:** <br />
  **Code:** 400 <br />
  **Content:**
  ```
  {
    <validation message>
  }
  ```
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "message": "you need to login first"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "message": "Internal server error"
  }
  ```

**Read Todo**
----
  Read todo from server

* **URL**

  /todos

* **Method**

  `GET`

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  [
    {
        "id": 36,
        "title": "Minum",
        "description": "Minum air",
        "status": true,
        "due_date": "2021-01-08T00:00:00.000Z",
        "UserId": 1,
        "createdAt": "2021-01-06T14:14:44.400Z",
        "updatedAt": "2021-01-07T10:03:54.506Z"
    },
    {
        "id": 33,
        "title": "Makan",
        "description": "Makan malam keluarga",
        "status": true,
        "due_date": "2021-01-07T00:00:00.000Z",
        "UserId": 1,
        "createdAt": "2021-01-06T12:18:15.888Z",
        "updatedAt": "2021-01-06T14:15:22.563Z"
    }
  ]
  ```

* **Failed Response:** <br />
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "message": "you need to login first"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "message": "Internal server error"
  }
  ```

**Read Todo by id**
----
  Read todo from server

* **URL**

  /todos/:id

* **Method**

  `GET`

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  {
    "id": 40,
    "title": "Makan",
    "description": "Makan Malam",
    "status": false,
    "due_date": "2021-01-08T00:00:00.000Z",
    "UserId": 4,
    "createdAt": "2021-01-07T13:38:37.181Z",
    "updatedAt": "2021-01-07T13:38:37.181Z"
  }
  ```

* **Failed Response:** <br />
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "message": "you need to login first"
  }
  ```
  **Code:** 404 <br />
  **Content:**
  ```
  {
    "message": "error not found"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "message": "Internal server error"
  }
  ```

**Edit Todo**
----

* **URL**

  /todos/:id

* **Method**

  `PUT`

* **Request Body**

  ```
  {
    "title": "Makan",
    "description": "Makan Siang",
    "status": false,
    "due_date": "2021-01-09"
  }
  ```

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  {
    "id": 40,
    "title": "Makan",
    "description": "Makan Siang",
    "status": false,
    "due_date": "2021-01-09T00:00:00.000Z",
    "UserId": 4,
    "createdAt": "2021-01-07T13:38:37.181Z",
    "updatedAt": "2021-01-08T05:42:59.342Z"
  }
  ```

* **Failed Response:** <br />
  **Code:** 400 <br />
  **Content:**
  ```
  {
    <validation message>
  }
  ```
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "message": "you dont have access"
  }
  ```
  **Code:** 404 <br />
  **Content:**
  ```
  {
    "message": "error not found"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "message": "Internal server error"
  }
  ```

**Edit Status Todo**
----

* **URL**

  /todos/:id

* **Method**

  `PATCH`

* **Request Body**

  ```
  {
    "status": true
  }
  ```

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  {
    "id": 40,
    "title": "Makan",
    "description": "Makan Siang",
    "status": true,
    "due_date": "2021-01-09T00:00:00.000Z",
    "UserId": 4,
    "createdAt": "2021-01-07T13:38:37.181Z",
    "updatedAt": "2021-01-08T05:42:59.342Z"
  }
  ```

* **Failed Response:** <br />
  **Code:** 400 <br />
  **Content:**
  ```
  {
    <validation message>
  }
  ```
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "message": "you dont have access"
  }
  ```
  **Code:** 404 <br />
  **Content:**
  ```
  {
    "message": "error not found"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "message": "Internal server error"
  }
  ```

**Delete Todo**
----

* **URL**

  /todos/:id

* **Method**

  `DELETE`

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  {
    "message": "todo success to delete"
  }
  ```

* **Failed Response:** <br />
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "message": "you dont have access"
  }
  ```
  **Code:** 404 <br />
  **Content:**
  ```
  {
    "message": "error not found"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "message": "Internal server error"
  }
  ```

