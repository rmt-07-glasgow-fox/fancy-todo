# Fancy Todo

## POST /todos
- Request body: 
    {
        "title": ,
        "description": ,
        "status": ,
        "due_date": 
    }.
- Response (accepted) :
    status code => 201,
    {
        "id": ,
        "title": ,
        "description": ,
        "status": ,
        "due_date": 
    }.
- Response (fail validation) :
    status code => 400,
    {
        "Validation Error": 
    }.
- Response (fail server) :
    status code => 500.

## GET /todos
- Response (accepted) : 
    status code => 200,
    [
        {
            "all data todos"
        }
    ].
- Response (fail) : 
    status code => 500.

## GET /todos/:id
- Response (accepted) : 
    status code => 200,
    {
        "data todo by id"
    }.
    
- Response (fail) : 
    status code => 404,
    [
        "error not found"
    ].

## PUT /todos/:id
- Request body :
    {
        "title": ,
        "description": ,
        "status": ,
        "due_date": 
    }.
- Response (accepted) : 
    status code => 200,
    {
        "data updated"
    }.
- Response (fail validation) : 
    status code => 400,
    {
        "validation error":
    }.
- Response (fail) :
    status code => 404,
    {
        "error not found"
    }
- Response (fail server) :
    status code => 500.

## PATCH /todos/:id
- Request body :
    {
        "status": 
    }.
- Response (accepted) :
    status code => 200,
    {
        "data updated"
    }.
- Response (fail validation) : 
    status code => 400,
    {
        "validation error":
    }.
- Response (fail) :
    status code => 404,
    {
        "error not found"
    }
- Response (fail server) :
    status code => 500.

## DELETE /todos/:id
- Response (accepted) :
    status code => 200,
    {
        message: "todo success to delete"
    }.
- Response (fail) :
    status code => 404,
    {
        "error not found"
    }
- Response (fail server) :
    status code => 500.