# Fancy Todo

1. POST /todos

    * Request header
    > ```json
    > { 
    >    "Content-Type": "application/json"  
    > }
    >```

    * Request body
    > ```json
    > {
    >   "title": "Tidur",
    >   "description": "tidur early jam 10",
    >   "due_date": "2021-01-04T00:00:00.000Z", 
    > } 
    > ```

    * Success Response
    > ```json
    > {
    >   "id": 1,
    >   "title": "Tidur",
    >   "description": "tidur early jam 10",
    >   "due_date": "2021-01-04T00:00:00.000Z",
    >   "updatedAt": "2021-01-04T13:12:17.825Z",
    >   "createdAt": "2021-01-04T13:12:17.825Z",
    >   "status": false,
    >   "UserId": null
    > } 
    > ```

    * Error Response

        1. Server error
        
        > ```json
        > { 
        >    "message": "internal server error"  
        > }
        >```

2. GET /todos

    * Request header
    > ```json
    > { 
    >    "Content-Type": "application/json"  
    > }
    >```

    * Success Response
    > ```json
    >[
    >    {
    >        "id": 1,
    >        "title": "pusing",
    >        "description": "pusing karena agak lambat ngerjain",
    >        "status": true,
    >        "due_date": "2021-12-12T00:00:00.000Z",
    >        "UserId": null
    >    },
    >    {
    >        "id": 2,
    >        "title": "nugas p2 d1",
    >        "description": "rest api challenge",
    >        "status": false,
    >        "due_date": "2021-12-12T00:00:00.000Z",
    >        "UserId": null
    >   }
    >]
    > ```

    * Error Response

        1. Validation error

        > ```json
        > { 
        >    "message": "Please input date greater than yesterday"  
        > }
        >```

        2. Server error
        > ```json
        > { 
        >    "message": "internal server error" 
        > }
        >```

3.  GET /todos/:id

    * Request header
    > ```json
    > { 
    >    "Content-Type": "application/json"  
    > }
    >```

    * Request Params
    > ```json
    > {
    >   "id": 1
    > }

    * Success Response
    > ```json
    > {
    >   "id": 1,
    >   "title": "Tidur",
    >   "description": "tidur early jam 10",
    >   "due_date": "2021-01-04T00:00:00.000Z",
    >   "updatedAt": "2021-01-04T13:12:17.825Z",
    >   "createdAt": "2021-01-04T13:12:17.825Z",
    >   "status": false,
    >   "UserId": null
    > } 
    > ```

    * Error Response

        1. Not found error
        > ```json
        > { 
        >    "message": "error not found" 
        > }
        >```

4. PUT /todos/:id

    * Request header
    > ```json
    > { 
    >    "Content-Type": "application/json"  
    > }
    >```

    * Request Params
    > ```json
    > {
    >   "id": 1
    > }

    * Request Body
    > ```json
    > {
    >   "title": "Tidur",
    >   "description": "tidur early jam 10",
    >   "due_date": "2021-01-04T00:00:00.000Z", 
    > } 
    > ```


    * Success Response
    > ```json
    > {
    >   "id": 1,
    >   "title": "Tidur",
    >   "description": "tidur early jam 10",
    >   "due_date": "2021-01-04T00:00:00.000Z",
    >   "updatedAt": "2021-01-04T13:12:17.825Z",
    >   "createdAt": "2021-01-04T13:12:17.825Z",
    >   "status": false,
    >   "UserId": null
    > } 
    > ```

    * Error Response

        1. Not found error
        > ```json
        > { 
        >    "message": "error not found" 
        > }
        >```

        2. Validation error
        > ```json
        > { 
        >    "message": "Please input date greater than yesterday"
        > }
        >```

        3. Server error
        > ```json
        > { 
        >    "message": "internal server error" 
        > }
        >```

5. PATCH /todos/:id

    * Request header
    > ```json
    > { 
    >    "Content-Type": "application/json"  
    > }
    >```

    * Request Params
    > ```json
    > {
    >   "id": 1
    > }

    * Request Body
    > ```json
    > {
    >   "status": true 
    > } 
    > ```


    * Success Response
    > ```json
    > {
    >   "id": 1,
    >   "title": "Tidur",
    >   "description": "tidur early jam 10",
    >   "due_date": "2021-01-04T00:00:00.000Z",
    >   "updatedAt": "2021-01-04T13:12:17.825Z",
    >   "createdAt": "2021-01-04T13:12:17.825Z",
    >   "status": true,
    >   "UserId": null
    > } 
    > ```

    * Error Response

        1. Not found error
        > ```json
        > { 
        >    "message": "error not found" 
        > }
        >```

        2. Validation error
        > ```json
        > { 
        >    "message": "Please input date greater than yesterday"
        > }
        >```

        3. Server error
        > ```json
        > { 
        >    "message": "internal server error" 
        > }
        >```

6. DELETE /todos/:id

    * Request header
    > ```json
    > { 
    >    "Content-Type": "application/json"  
    > }
    >```

    * Request Params
    > ```json
    > {
    >   "id": 1
    > }

    * Success Response
    > ```json
    > {
    >   "message": "todo success to delete"
    > }
    > ```

    * Error Response

        1. Not found error
        > ```json
        > { 
        >    "message": "error not found" 
        > }
        >```

        2. Server error
        > ```json
        > { 
        >    "message": "internal server error" 
        > }
        >```


