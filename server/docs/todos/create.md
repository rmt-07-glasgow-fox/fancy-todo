## **Create Todo**

Create a todo.

- **URL**

  `/todos`

- **Method:**

  `POST`

- **URL Params**

  None

- **Data Params**

  **Required:**

  - title (string)
  - description (string)
  - status (boolean)
  - due_date (datetime)

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
