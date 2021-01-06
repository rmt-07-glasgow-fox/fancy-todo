# **Fancy-Todo**
Membuat website untuk mencatat hal - hal menarik untuk dilakukan

## **POST /todos**

Create a todo.

- **Request Header:**

  **Required:**

  - access_token (JSON Web Tokens)

- **Request Body**

  **Required:**
    ```json
    {
      "title": <String>,
      "description": <String>,
      "status": <Boolean>,
      "due_date": <Date>
    }
    ```

  **Example:**

  - application/json
    ```json
    {
      "title": "Cat Food",
      "description": "Buy Cat Food",
      "status": false,
      "due_date": "2021-01-09"
    }
    ```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```json
    {
      "title": "Cat Food",
      "description": "Buy Cat Food",
      "status": false,
      "due_date": "2021-01-09T00:00:00.000Z",
      "UserId": 2
    }
    ```

- **Error Response:**

  - **Code:** 400 <br />
    **Content:**
    ```json
    {
      "message": "Validation error: Due Date Must Greater Than Today"
    }
    ```

    **Code:** 500 <br />
    **Content:**
    ```json
    {
      "message": "Internal Server Error"
    }
    ```

## **GET /todos**

Get list of todos.

- **Request Header:**

  **Required:**

  - access_token (JSON Web Tokens)


- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    [
      {
        "id": <id>,
        "title": <title>,
        "description": <description>,
        "status": <status>,
        "due_date": <due_date>,
        "UserId": <UserId>
      },
      {
        "id": <id>,
        "title": <title>,
        "description": <description>,
        "status": <status>,
        "due_date": <due_date>,
        "UserId": <UserId>
      },
      {
        "id": <id>,
        "title": <title>,
        "description": <description>,
        "status": <status>,
        "due_date": <due_date>,
        "UserId": <UserId>
      },
      {
        "id": <id>,
        "title": <title>,
        "description": <description>,
        "status": <status>,
        "due_date": <due_date>,
        "UserId": <UserId>
      }
    ]
    ```

- **Error Response:**

  - **Code:** 500 <br />
    **Content:**
    ```json
    {
      "message": "Internal Server Error"
    }
    ```

## **GET /todos/:id**

Get todo by id.

- **Request Header:**

  **Required:**

  - access_token (JSON Web Tokens)


- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "id": <id>,
      "title": <title>,
      "description": <description>,
      "status": <status>,
      "due_date": <due_date>,
      "UserId": <UserId>
    }
    ```

- **Error Response:**

  - **Code:** 404 <br />
    **Content:**
    ```json
    {
      "message": "Data Not Found"
    }
    ```
  - **Code:** 500 <br />
    **Content:**
    ```json
    {
      "message": "Internal Server Error"
    }
    ```

## **Update Todo**

Update todo.

- **Request Header:**

  **Required:**

  - access_token (JSON Web Tokens)

- **Request Body**

  **Required:**
    ```json
    {
      "title": <String>,
      "description": <String>,
      "status": <Boolean>,
      "due_date": <Date>
    }
    ```

  **Example:**

  - application/json
    ```json
    {
      "title": "Cat Food",
      "description": "Buy Cat Food",
      "status": false,
      "due_date": "2021-01-09"
    }
    ```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```json
    {
      "title": "Cat Food",
      "description": "Buy Cat Food",
      "status": false,
      "due_date": "2021-01-09T00:00:00.000Z",
      "UserId": 2
    }
    ```

- **Error Response:**

  - **Code:** 400 <br />
    **Content:**
    ```json
    {
      "message": "Validation error: Due Date Must Greater Than Today"
    }
    ```
  - **Code:** 404 <br />
    **Content:**
    ```json
    {
      "message": "Data Not Found"
    }
    ```

  - **Code:** 500 <br />
    **Content:**
    ```json
    {
      "message": "Internal Server Error"
    }
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