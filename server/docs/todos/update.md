## **Update Todo**

Update todo.

- **URL**

  `/todos/:id`

- **Method:**

  `PUT`

- **URL Params**

  - id (integer)

- **Data Params**

  - title (string)
  - description (string)
  - status (boolean)
  - due_date (datetime)

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
    curl --location --request PUT 'localhost:3000/todos/1' --data-urlencode 'title=dawa'  --data-urlencode 'description=adaw2'  --data-urlencode 'status=false'  --data-urlencode 'due_date=2021-01-05 10:10:10'
    ```
