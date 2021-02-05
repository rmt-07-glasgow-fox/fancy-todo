# FANCY-TODO
Fancy todo is a Todo List web app 


**Show Todo**
----
  Returns json data Todos.

* **URL**

  /todos

* **Method:**

  `GET`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "id": <given id by system>,
        "title": "<title from db>",
        "description": "<description from db>",
        "due_date": "<date from db>",
        "status": "<status from db>",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`

**Create Todo**
----
  Returns form Creating json data Todo.

* **URL**

  /todos

* **Method:**

  `POST`
  
* **Req Body**

  **Required:**
  ```
    {
        "title": "<input title>",
        "description": "<input description>",
        "due_date": "<input date>",
        "status": "<input status>",
    }
  ```
    

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ``` json
    {
        "id": <given id by system>,
        "title": "<title from db>",
        "description": "<description from db>",
        "due_date": "<date from db>",
        "status": "<status from db>",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`

**Find Todo**
----
  Returns json data about a single Todo by specific id.

* **URL**

  /todos/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "id": <given id by system>,
        "title": "<title from db>",
        "description": "<description from db>",
        "due_date": "<date from db>",
        "status": "<status from db>",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "todo is not found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`


**Update Todo**
----
  Update single Todo json data by specific id.

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Req Body**

  **Required:**
  ```
    {
        "title": "<input title>",
        "description": "<input description>",
        "due_date": "<input date>",
        "status": "<input status>",
    }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "title": "<title from db>",
        "description": "<description from db>",
        "status": "<status from db>",
        "due_date": "<date from db>"
    }
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "todo is not found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`

  OR

   * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`

**Patch Todo**
----
  Update specific single Todo json data by specific id.

* **URL**

  /todos/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Req Body**

  **Required:**
  ```
    {
        "status": "<input status>"
    }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "status": "<status from db>"
    }
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "todo is not found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`

  OR

   * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`

**Delete Todo**
----
  Delete single Todo json data by specific id.

* **URL**

  /todos/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        message: 'todo success to delete'
    }
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "todo is not found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`


**Login User**
----
  Login json data by specific email Password.

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
  ```
    {
        "email": "<input email>",
        "password": "<input password>",
    }
  ```


* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        message: 'success'
    }
 
* **Error Response:**

  * **Code:** 401 BAD REQUEST <br />
    **Content:** `{ message : "invalid password" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`


**register User**
----
  register json data by specific email Password.

* **URL**

  /register

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
  ```
    {
        "email": "<input email>",
        "password": "<input password>",
    }
  ```


* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        message: 'success'
    }
 
* **Error Response:**

  * **Code:** 401 BAD REQUEST <br />
    **Content:** `{ message : "invalid password" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`

