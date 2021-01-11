## **Create Todo**

Create a todo.

- **URL**

  `/todos`

- **Method:**

  `POST`

- **Request Header**

  **Required:**

  - Authorization (string)

  **Example:**

  - application/json
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

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
    curl --location --request POST 'localhost:3000/todos' --header 'Authorization: Bearer <JWT_TOKEN>'  --data-urlencode 'title=adaw' --data-urlencode 'description=adaw' --data-urlencode 'status=true' --data-urlencode 'due_date=2021-01-05'
    ```

## **List Todos**

Show list todos.

- **URL**

  `/todos`

- **Method:**

  `GET`

- **Request Header**

  **Required:**

  - Authorization (string)

  **Example:**

  - application/json
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

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
    curl --location --request GET 'localhost:3000/todos' --header 'Authorization: Bearer <JWT_TOKEN>'
    ```

## **Detail Todo**

Detail todo.

- **URL**

  `/todos/:id`

- **Method:**

  `GET`

- **Request Header**

  **Required:**

  - Authorization (string)

  **Example:**

  - application/json
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

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
    curl --location --request GET 'localhost:3000/todos/1' --header 'Authorization: Bearer <JWT_TOKEN>'
    ```

## **Update Todo**

Update todo.

- **URL**

  `/todos/:id`

- **Method:**

  `PUT`

- **Request Header**

  **Required:**

  - Authorization (string)

  **Example:**

  - application/json
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

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
    curl --location --request PUT 'localhost:3000/todos/1' --header 'Authorization: Bearer <JWT_TOKEN>' --data-urlencode 'title=dawa'  --data-urlencode 'description=adaw2'  --data-urlencode 'status=false'  --data-urlencode 'due_date=2021-01-05 10:10:10'
    ```

## **Update Status Todo**

Update status todo.

- **URL**

  `/todos/:id`

- **Method:**

  `PATCH`

- **Request Header**

  **Required:**

  - Authorization (string)

  **Example:**

  - application/json
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

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
    curl --location --request PATCH 'localhost:3000/todos/2' --header 'Authorization: Bearer <JWT_TOKEN>'  --data-urlencode 'status=false'
    ```

## **Destroy Todo**

Destroy todo.

- **URL**

  `/todos/:id`

- **Method:**

  `DELETE`

- **Request Header**

  **Required:**

  - Authorization (string)

  **Example:**

  - application/json
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

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
    curl --location --request DELETE 'localhost:3000/todos/1' --header 'Authorization: Bearer <JWT_TOKEN>'
    ```

## **Quotes of The Day**

Show quotes.

- **URL**

  `/quotes/qod`

- **Method:**

  `GET`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "_id": "JjBqM4t-sxsr",
      "tags": ["famous-quotes"],
      "content": "Wise men talk because they have something to say; fools, because they have to say something.",
      "author": "Plato",
      "length": 92
    }
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
    curl --location --request GET 'localhost:3000/quotes/qod'
    ```

## **List Holiday on Year**

Show list holiday on year.

- **URL**

  `/holidays/year`

- **Method:**

  `GET`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    [
      {
        "name": "New Year's Day",
        "description": "New Year’s Day is the first day of the year, or January 1, in the Gregorian calendar.",
        "country": {
          "id": "id",
          "name": "Indonesia"
        },
        "date": {
          "iso": "2021-01-01",
          "datetime": {
            "year": 2021,
            "month": 1,
            "day": 1
          }
        },
        "type": ["National holiday"],
        "locations": "All",
        "states": "All"
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
    curl --location --request GET 'localhost:3000/holidays/year'
    ```

## **List Holiday on Month**

Show list holiday on month.

- **URL**

  `/holidays/month`

- **Method:**

  `GET`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    [
      {
        "name": "New Year's Day",
        "description": "New Year’s Day is the first day of the year, or January 1, in the Gregorian calendar.",
        "country": {
          "id": "id",
          "name": "Indonesia"
        },
        "date": {
          "iso": "2021-01-01",
          "datetime": {
            "year": 2021,
            "month": 1,
            "day": 1
          }
        },
        "type": ["National holiday"],
        "locations": "All",
        "states": "All"
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
    curl --location --request GET 'localhost:3000/holidays/month'
    ```

## **List Holiday on Day**

Show list holiday on Day.

- **URL**

  `/holidays/day`

- **Method:**

  `GET`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    [
      {
        "name": "New Year's Day",
        "description": "New Year’s Day is the first day of the year, or January 1, in the Gregorian calendar.",
        "country": {
          "id": "id",
          "name": "Indonesia"
        },
        "date": {
          "iso": "2021-01-01",
          "datetime": {
            "year": 2021,
            "month": 1,
            "day": 1
          }
        },
        "type": ["National holiday"],
        "locations": "All",
        "states": "All"
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
    curl --location --request GET 'localhost:3000/holidays/day'
    ```
