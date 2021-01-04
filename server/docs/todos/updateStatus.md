## **Update Status Todo**

Update status todo.

- **URL**

  `/todos/:id`

- **Method:**

  `PATCH`

- **URL Params**

  - id (integer)

- **Data Params**

  - status (boolean)

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

  OR

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
