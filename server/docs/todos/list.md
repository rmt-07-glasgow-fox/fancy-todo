## **List Todos**

Show list todos.

- **URL**

  `/todos`

- **Method:**

  `GET`

- **URL Params**

  None

- **Data Params**

  None

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
