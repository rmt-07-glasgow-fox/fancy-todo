## **Create Todo**

Create a todo.

- **URL**

  `/todos`

- **Method:**

  `POST`

- **Request Body**

  **Required:**

  - title (string)
  - description (string)
  - status (boolean)
  - due_date (datetime)

  **Example:**

  - application/json
    ```json
    {
      "title": "Meeting",
      "description": "Meeting in office",
      "status": false,
      "due_date": "2021-01-05 10:10:10"
    }
    ```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```js
    {
      id : 1,
      title : "Meeting",
      description: "Meeting in office",
      status: false,
      due_date: "2021-01-05 10:10:10"
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```js
    {
      error: 'Due date must greater than today';
    }
    ```

- **Sample Call:**
  - **curl**:
    ```js
    curl --location --request POST 'localhost:3000/todos' --data-urlencode 'title=adaw' --data-urlencode 'description=adaw' --data-urlencode 'status=true' --data-urlencode 'due_date=2021-01-05'
    ```

## **List Todos**

Show list todos.

- **URL**

  `/todos`

- **Method:**

  `GET`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    [
      {
        "id": 1,
        "title": "Meeting",
        "description": "Meeting in office",
        "status": false,
        "due_date": "2021-01-05 10:10:10"
      }
    ]
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**
    ```json
    {
      "error": "internal server error"
    }
    ```

- **Sample Call:**
  - **curl**:
    ```js
    curl --location --request GET 'localhost:3000/todos'
    ```

## **Detail Todo**

Detail todo.

- **URL**

  `/todos/:id`

- **Method:**

  `GET`

- **Request Params**

  - id (integer)

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "id": 1,
      "title": "Meeting",
      "description": "Meeting in office",
      "status": false,
      "due_date": "2021-01-05 10:10:10"
    }
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:**

    ```json
    {
      "error": "error not found"
    }
    ```

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**
    ```json
    {
      "error": "internal server error"
    }
    ```

- **Sample Call:**
  - **curl**:
    ```js
    curl --location --request GET 'localhost:3000/todos/1'
    ```

## **Update Todo**

Update todo.

- **URL**

  `/todos/:id`

- **Method:**

  `PUT`

- **Request Params**

  - id (integer)

- **Request Body**

  **Required:**

  - title (string)
  - description (string)
  - status (boolean)
  - due_date (datetime)

  **Example:**

  - application/json
    ```json
    {
      "title": "Meeting",
      "description": "Meeting in office",
      "status": false,
      "due_date": "2021-01-05 10:10:10"
    }
    ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "id": 1,
      "title": "Meeting",
      "description": "Meeting in office",
      "status": false,
      "due_date": "2021-01-05 10:10:10"
    }
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:**

    ```json
    {
      "error": "error not found"
    }
    ```

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**
    ```json
    {
      "error": "internal server error"
    }
    ```

- **Sample Call:**
  - **curl**:
    ```js
    curl --location --request PUT 'localhost:3000/todos/1' --data-urlencode 'title=dawa'  --data-urlencode 'description=adaw2'  --data-urlencode 'status=false'  --data-urlencode 'due_date=2021-01-05 10:10:10'
    ```

## **Update Status Todo**

Update status todo.

- **URL**

  `/todos/:id`

- **Method:**

  `PATCH`

- **URL Params**

  - id (integer)

- **Request Body**

  **Required**

  - status (boolean)

  **Example:**

  - application/json
    ```json
    {
      "status": true
    }
    ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "id": 1,
      "title": "Meeting",
      "description": "Meeting in office",
      "status": true,
      "due_date": "2021-01-05 10:10:10"
    }
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:**

    ```json
    {
      "error": "error not found"
    }
    ```

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**
    ```json
    {
      "error": "internal server error"
    }
    ```

- **Sample Call:**
  - **curl**:
    ```js
    curl --location --request PATCH 'localhost:3000/todos/2' --data-urlencode 'status=false'
    ```

## **Destroy Todo**

Destroy todo.

- **URL**

  `/todos/:id`

- **Method:**

  `DELETE`

- **Request Params**

  - id (integer)

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "message": "todo success to delete"
    }
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:**

    ```json
    {
      "error": "error not found"
    }
    ```

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**
    ```json
    {
      "error": "internal server error"
    }
    ```

- **Sample Call:**
  - **curl**:
    ```js
    curl --location --request DELETE 'localhost:3000/todos/1'
    ```
