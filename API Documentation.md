# Fancy Todo

1. POST /todos

    * Request header
    > ```
    > { 
    >    "Content-Type": "application/json"  
    > }
    >```

    * Request body
    > ```
    > {
    >   "title": "Tidur",
    >   "description": "tidur early jam 10",
    >   "due_date": "2021-01-04T00:00:00.000Z", 
    > } 
    > ```

    * Success Response
    > ```
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
        
        > ```
        > { 
        >    "message": "internal server error"  
        > }
        >```

2. GET /todos

    * Request header
    > ```
    > { 
    >    "Content-Type": "application/json"  
    > }
    >```

    * Success Response
    > ```
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

        > ```
        > { 
        >    "message": "Please input date greater than yesterday"  
        > }
        >```

        2. Server error
        > ```
        > { 
        >    "message": "internal server error" 
        > }
        >```

3.  GET /todos/:id

    * Request header
    > ```
    > { 
    >    "Content-Type": "application/json"  
    > }
    >```

    * Request Params
    > ```
    > {
    >   "id": 1
    > }

    * Success Response
    > ```
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
        > ```
        > { 
        >    "message": "error not found" 
        > }
        >```

4. PUT /todos/:id

    * Request header
    > ```
    > { 
    >    "Content-Type": "application/json"  
    > }
    >```

    * Request Params
    > ```
    > {
    >   "id": 1
    > }

    * Request Body
    > ```
    > {
    >   "title": "Tidur",
    >   "description": "tidur early jam 10",
    >   "due_date": "2021-01-04T00:00:00.000Z", 
    > } 
    > ```


    * Success Response
    > ```
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
        > ```
        > { 
        >    "message": "error not found" 
        > }
        >```

        2. Validation error
        > ```
        > { 
        >    "message": "Please input date greater than yesterday"
        > }
        >```

        3. Server error
        > ```
        > { 
        >    "message": "internal server error" 
        > }
        >```

5. PATCH /todos/:id

    * Request header
    > ```
    > { 
    >    "Content-Type": "application/json"  
    > }
    >```

    * Request Params
    > ```
    > {
    >   "id": 1
    > }

    * Request Body
    > ```
    > {
    >   "status": true 
    > } 
    > ```


    * Success Response
    > ```
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
        > ```
        > { 
        >    "message": "error not found" 
        > }
        >```

        2. Validation error
        > ```
        > { 
        >    "message": "Please input date greater than yesterday"
        > }
        >```

        3. Server error
        > ```
        > { 
        >    "message": "internal server error" 
        > }
        >```

6. DELETE /todos/:id

    * Request header
    > ```
    > { 
    >    "Content-Type": "application/json"  
    > }
    >```

    * Request Params
    > ```
    > {
    >   "id": 1
    > }

    * Success Response
    > ```
    > {
    >   "message": "todo success to delete"
    > }
    > ```

    * Error Response

        1. Not found error
        > ```
        > { 
        >    "message": "error not found" 
        > }
        >```

        2. Server error
        > ```
        > { 
        >    "message": "internal server error" 
        > }
        >```


