**Todos**

### GET/TODOS

* **REQUEST HEADERS**
    * **content**
    ```json
    [
        {
            "access_token": "string"
        }
    ]
    ```
* **SUCCESS RESPONSE**
    * **code** 200
    * **content**
    ```json
    [
        {
            "title": "string",
            "due_date": "dateonly",
            "status": "boolean",
            "description": "string"
        }
    ]
    ```
* **ERROR RESPONSE**
    * **code** 500
    * **content**
    ```json
    [
        {
            "message": "Internal Server Error"
        }
    ]
    ```

### POST/TODOS

* **REQUEST HEADERS**
    * **content**
    ```json
    [
        {
            "access_token": "string"
        }
    ]
    ```
* **SUCCESS RESPONSE**
    * **code** 201
    * **content**
    ```json
    [
        {
            "title": "string",
            "due_date": "dateonly",
            "status": "boolean",
            "description": "string"
        }
    ]
    ```
* **ERROR RESPONSE**
    * **code** 500
    * **content**
    ```json
    [
        {
            "message": "Internal Server Error"
        }
    ]
    ```

### GET/TODOS/:id

* **REQUEST HEADERS**
    * **content**
    ```json
    [
        {
            "access_token": "string"
        }
    ]
    ```
* **SUCCESS RESPONSE**
    * **code** 200
    * **content**
    ```json
    [
        {
            "title": "string",
            "due_date": "dateonly",
            "status": "boolean",
            "description": "string"
        }
    ]
    ```
* **ERROR RESPONSE**
    * **code** 404
    * **content**
    ```json
    [
        {
            "message": "Data Not Found"
        }
    ]
    ```
    * **code** 500
    * **content**
    ```json
    [
        {
            "message": "Internal Server Error"
        }
    ]
    ```

### PUT/TODOS

* **REQUEST HEADERS**
    * **content**
    ```json
    [
        {
            "access_token": "string"
        }
    ]
    ```
* **SUCCESS RESPONSE**
    * **code** 200
    * **content**
    ```json
    [
        {
            "title": "string",
            "due_date": "dateonly",
            "status": "boolean",
            "description": "string"
        }
    ]
    ```
* **ERROR RESPONSE**
    * **code** 500
    * **content**
    ```json
    [
        {
            "message": "Internal Server Error"
        }
    ]
    ```

### PATCH/TODOS

* **REQUEST HEADERS**
    * **content**
    ```json
    [
        {
            "access_token": "string"
        }
    ]
    ```
* **SUCCESS RESPONSE**
    * **code** 200
    * **content**
    ```json
    [
        {
            "title": "string",
            "due_date": "dateonly",
            "status": "boolean",
            "description": "string"
        }
    ]
    ```
* **ERROR RESPONSE**
    * **code** 500
    * **content**
    ```json
    [
        {
            "message": "Internal Server Error"
        }
    ]
    ```
### DELETE/TODOS/:id

* **REQUEST HEADERS**
    * **content**
    ```json
    [
        {
            "access_token": "string"
        }
    ]
    ```
* **SUCCESS RESPONSE**
    * **code** 200
    * **content**
    ```json
    [
        {
            "message": "Todo Has Been Succesfully Deleted"
        }
    ]
    ```
* **ERROR RESPONSE**
    * **code** 404
    * **content**
    ```json
    [
        {
            "message": "Data Not Found"
        }
    ]
    ```
    * **code** 500
    * **content**
    ```json
    [
        {
            "message": "Internal Server Error"
        }
    ]
    ```

### POST/REGISTER

* **SUCCESS RESPONSE**
    * **code** 200
    * **content**
    ```json
    [
        {
            "id": "string",
            "email": "string"
        }
    ]
    ```
* **ERROR RESPONSE**
    * **code** 500
    * **content**
    ```json
    [
        {
            "message": "Internal Server Error"
        }
    ]
    ```

### POST/LOGIN

* **SUCCESS RESPONSE**
    * **code** 200
    * **content**
    ```json
    [
        {
            "access_token": "string",
        }
    ]
    ```
* **ERROR RESPONSE**
    * **code** 500
    * **content**
    ```json
    [
        {
            "message": "Internal Server Error"
        }
    ]
    ```


