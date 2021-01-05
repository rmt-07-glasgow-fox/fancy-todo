# fancy-todo

**REGISTER USER**
----
  <_Register User _>

* **URL**

  `/register`

* **Method:**

  `POST`
  
*  **URL Params**

    Required: 

    `none`

* **Body**

  `firstName=[string] lastname=[string] email=[string] password=[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
        {
          "data": {
              "id": 3,
              "firstname": "ted ",
              "lastname": "george",
              "email": "tedgeorge@gmail.com"
            }
        }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** 
    ```json
        {
            "message": [
                "firstname cannot be empty",
                "lastname cannot be empty"
            ]
        }
    ```

  * **Code:** 500 <br />
    **Content:** 
    ```json
        { 
            "message" : "internal server error" 
        }
    ```


**LOGIN USER**
----
  <_LOGIN User _>

* **URL**

  `/login`

* **Method:**

  `POST`
  
*  **URL Params**

    Required: 

    `none`

* **Body**

  `email=[string] password=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
        {
          "access_token":"asdadasdwdasaedasda"
        }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** 
    ```json
        {
            "message": [
                "firstname cannot be empty",
                "lastname cannot be empty"
            ]
        }
    ```

  * **Code:** 404 <br />
    **Content:** 
    ```json
        {
            "message": "wrong email/password"
        }
    ```

  * **Code:** 500 <br />
    **Content:** 
    ```json
        { 
            "message" : "internal server error" 
        }
    ```

**SHOW ALL TODOS USER**
----
  <_SHOW TODOS User _>

* **URL**

  `/todos`

* **Method:**

  `GET`
  
*  **URL Params**

    Required: 

    `none`

* **Data Params**

  `none`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
      {
        "id": 9,
        "title": "manjat pohon toge",
        "description": "manjat pohon sekolah",
        "status": "belum selesai",
        "due_date": "2020-12-28T17:00:00.000Z",
        "createdAt": "2020-11-25T16:01:28.995Z",
        "updatedAt": "2020-11-25T16:01:28.996Z",
        "UserId": 2
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```json
        {
            "message": "internal server error"
        }
    ```

  * **Code:** 401 <br />
    **Content:** 
    ```json
        {
            "message": "please login first"
        }
    ```




**SHOW TODOS USER BY ID**
----
  <_SHOW TODOS User by id _>

* **URL**

  `/todos/:id`

* **Method:**

  `GET`
  
*  **URL Params**

    Required: 

    `id =[integer]`

* **Data Params**

  `none`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
      {
        "id": 9,
        "title": "manjat pohon toge",
        "description": "manjat pohon sekolah",
        "status": "belum selesai",
        "due_date": "2020-12-28T17:00:00.000Z",
        "createdAt": "2020-11-25T16:01:28.995Z",
        "updatedAt": "2020-11-25T16:01:28.996Z",
        "UserId": 2
      }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```json
        {
            "message": "internal server error"
        }
    ```

  * **Code:** 404  <br />
    **Content:** 
    ```json
        {
            "message": "todo not found"
        }
    ```

  * **Code:** 401 <br />
    **Content:** 
    ```json
        {
            "message": "please login first"
        }
    ```



**DELETE TODOS USER**
----
  <_DELETE TODOS User _>

* **URL**

  `/todos/:id`

* **Method:**

  `DELETE`
  
*  **URL Params**

    Required: 

    `id =[integer]`

* **Data Params**

  `none`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
      {
        "message": "todo success to delete"
      }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```json
        {
            "message": "internal server error"
        }
    ```


  * **Code:** 404  <br />
    **Content:** 
    ```json
        {
            "message": "todo not found!"
        }
    ```

  * **Code:** 401  <br />
    **Content:** 
    ```json
        {
            "message": "you are not authorize with this todo"
        }
    ```

  * **Code:** 401 <br />
    **Content:** 
    ```json
        {
            "message": "please login first"
        }
    ```

**UPDATE TODOS STATUS**
----
  <_UPDATE TODOS STATUS _>

* **URL**

  `/todos/:id`

* **Method:**

  `PATCH`
  
*  **URL Params**

    Required: 

    `id =[integer]`

* **Data Params**

  `status =[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
      {
        "id": 9,
        "title": "manjat pohon toge",
        "description": "manjat pohon sekolah",
        "status": "selesai",
        "due_date": "2020-12-28T17:00:00.000Z",
        "createdAt": "2020-11-25T16:01:28.995Z",
        "updatedAt": "2020-11-25T16:01:28.996Z",
        "UserId": 2
      }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```json
        {
            "message": "internal server error"
        }
    ```


  * **Code:** 404  <br />
    **Content:** 
    ```json
        {
            "message": "todo not found!"
        }
    ```

  * **Code:** 401  <br />
    **Content:** 
    ```json
        {
            "message": "you are not authorize with this todo"
        }
    ```

  * **Code:** 401 <br />
    **Content:** 
    ```json
        {
            "message": "please login first"
        }
    ```


**UPDATE TODOS**
----
  <_UPDATE TODOS _>

* **URL**

  `/todos/:id`

* **Method:**

  `PUT`
  
*  **URL Params**

    Required: 

    `id =[integer]`

* **Data Params**

  `title=[string] description=[string] status =[string] due_date=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
      {
        "id": 2,
        "title": "manjat pohon toge",
        "description": "manjat pohon sekolah",
        "status": "selesai",
        "due_date": "2020-12-28T17:00:00.000Z",
        "createdAt": "2020-11-25T16:01:28.995Z",
        "updatedAt": "2020-11-25T16:01:28.996Z",
        "UserId": 2
      }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```json
        {
            "message": "internal server error"
        }
    ```


  * **Code:** 404  <br />
    **Content:** 
    ```json
        {
            "message": "todo not found!"
        }
    ```

  * **Code:** 400  <br />
    **Content:** 
    ```json
        {
            "message": "date must be greater than now"
        }
    ```

  * **Code:** 401  <br />
    **Content:** 
    ```json
        {
            "message": "you are not authorize with this todo"
        }
    ```

  * **Code:** 401 <br />
    **Content:** 
    ```json
        {
            "message": "please login first"
        }
    ```


**CREATE TODOS**
----
  <_CREATE TODOS _>

* **URL**

  `/todos/:id`

* **Method:**

  `POST`
  
*  **URL Params**

    Required: 

    `none`

* **Body**

  `title=[string] description=[string] status =[string] due_date=[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
      {
        "id": 9,
        "title": "manjat pohon toge",
        "description": "manjat pohon sekolah",
        "status": "selesai",
        "due_date": "2020-12-28T17:00:00.000Z",
        "createdAt": "2020-11-25T16:01:28.995Z",
        "updatedAt": "2020-11-25T16:01:28.996Z",
        "UserId": 2
      }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```json
        {
            "message": "internal server error"
        }
    ```

  * **Code:** 400  <br />
    **Content:** 
    ```json
        {
            "message": [
              "date must be greater than now",
              "title cannot be empty",
              "date cannot be empty",
              "description cannot be empty",
              "staus cannot be empty"
              ]
        }
    ```

  * **Code:** 401 <br />
    **Content:** 
    ```json
        {
            "message": "please login first"
        }
    ```