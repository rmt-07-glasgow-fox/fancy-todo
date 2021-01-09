**Fancy Todo**
----

### Get all data

* **URL**
  `/todos`

* **Method:**
  `GET`
  
* **Data Params**

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
      [
        {
          "id": 1,
          "title": "Get some milks",
          "description": "Get some UHT milks",
          "status": false,
          "due_date": "2021-01-04T07:58:36.134Z",
          "createdAt": "2021-01-04T07:58:36.134Z",
          "updatedAt": "2021-01-04T07:58:36.134Z"
        },
      ]
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
      ```json
      { 
        "name": "SequelizeConnectionError", 
      }
      ```

* **Sample Call:**

  `localhost:3000/todos`

### Add data

* **URL**

  `/todos`

* **Method:**
  `POST`
  
* **Data Params**

  ```json
  {
    "title": "name of a todo",
    "description": "description of the todo",
    "status": boolean,
    "due_date": "date entry in form YYYY-mm-dd" 
  }
  ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
      ```json
      [
        {
          "id": 1,
          "title": "Get some milks",
          "description": "Get some UHT milks",
          "status": false,
          "due_date": "2021-01-04T07:58:36.134Z",
          "createdAt": "2021-01-04T07:58:36.134Z",
          "updatedAt": "2021-01-04T07:58:36.134Z"
        },
      ]
      ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    { 
      "name": "SequelizeConnectionError", 
    }
    ```
  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
      "errors": [
        "Date must be greather than today"
      ]
    }
    ```

* **Sample Call:**

  `localhost:3000/todos`

### Get data by id

* **URL**
  `/todos/:id`

* **Method:**
  `GET`

*  **URL Params**

   **Required:**
 
   `id=[integer]`
  
* **Data Params**

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
      "id": 2,
      "title": "Buy cat food",
      "description": "Kitchen or RC",
      "status": false,
      "due_date": "2021-01-04T07:58:36.134Z",
      "createdAt": "2021-01-04T07:58:36.134Z",
      "updatedAt": "2021-01-04T07:58:36.134Z"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    { 
      "name": "SequelizeConnectionError", 
    }
    ```
  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
    {
      "message": "data not found"
    }
    ```

* **Sample Call:**

  `localhost:3000/todos/1`



### Edit data by id

* **URL**

  `/todos/:id`

* **Method:**
  `PUT`
  
* **Data Params**

  ```json
  {
    "title": "name of a todo",
    "description": "description of the todo"
    "status": boolean,
    "due_date": "date entry in form YYYY-mm-dd" 
  }
  ```
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
      {
        "id": 1,
        "title": "Get some milks",
        "description": "Get some UHT milks",
        "status": false,
        "due_date": "2021-01-04T07:58:36.134Z",
        "createdAt": "2021-01-04T07:58:36.134Z",
        "updatedAt": "2021-01-04T07:58:36.134Z"
      },
    ]
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    { 
      "name" : "SequelizeConnectionError", 
    }
    ```

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
    {
      "message": "data not found"
    }
    ```

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
      "errors": [
        "Date must be greather than today"
      ]
    }
    ```

* **Sample Call:**

  `localhost:3000/todos/1`

### Edit status by id

* **URL**

  `/todos/:id`

* **Method:**
  `PATCH`
  
* **Data Params**

  ```json
  {
    "status": boolean
  }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
      "id": 2,
      "title": "Buy cat food",
      "description": "Kitchen or RC",
      "status": false,
      "due_date": "2021-01-04T07:58:36.134Z",
      "createdAt": "2021-01-04T07:58:36.134Z",
      "updatedAt": "2021-01-04T07:58:36.134Z"
    }
    ```
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    { 
      "name": "SequelizeConnectionError", 
    }
    ```
    
  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
    {
      "message": "data not found"
    }
    ```

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** 
    ```json
    {
      "errors": [
        "Status field is required"
      ]
    }
    ```

* **Sample Call:**

  `localhost:3000/todos/1`

### Delete data by id

* **URL**

  `/todos/:id`

* **Method:**
  `DELETE`
  
* **Data Params**

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    {
      "message": "todo success to delete"
    }
    ```
  
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    ```json
    { 
      "name": "SequelizeConnectionError", 
    }
    ```
    
  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    ```json
    {
      "message": "data not found"
    }
    ```
    
* **Sample Call:**

  `localhost:3000/todos/1`
