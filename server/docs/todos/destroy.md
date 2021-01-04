## **Destroy Todo**

Destroy todo.

- **URL**

  `/todos/:id`

- **Method:**

  `DESTROY`

- **URL Params**

  - id (integer)

- **Data Params**

  None

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
    curl --location --request GET 'localhost:3000/todos'
    ```
