
**Title**
Fancy To Do
==
*1. Add To Do*
-
*  **URL**

/todos
  
*  **Method:**

`POST`

*  **Data Params**

**Body**:

`{ title:[string], description:[string], status: [string], due_date: Date }`

*  **Success Response:**

**Code:** 201 <br  />

**Content:**  `{ message: success creating To Do {req.body.title} }`
*  **Error Response:**

**Code:** 400 <br  />

**Content:**  `{ error : "Input Validations Error" }`<br  /><br  />

*2. Show To Do List*
-

/todos
  
*  **Method:**

`GET`

*  **Success Response:**

**Code:** 200 <br  />

**Content:**  `[`<br  />
    `{
        "id": 1,
        "title": "title example 1",
        "description": "description example 1",
        "status": "status example 1",
        "due_date": "due date example 1",
        "createdAt": "created date",
        "updatedAt": "updated date"
    },`<br  />
    `{
        "id": 2,
        "title": "title example 2",
        "description": "description example 2",
        "status": "status example 2",
        "due_date": "due date example 2",
        "createdAt": "created date",
        "updatedAt": "updated date"
    },`<br  />
    `.`<br  />
    `.,`<br  />
        `{
        "id": x,
        "title": "title example x",
        "description": "description example x",
        "status": "status example x",
        "due_date": "due date example x",
        "createdAt": "created date",
        "updatedAt": "updated date"
    }`<br  />
`]`
*  **Error Response:**

**Code:** 500 <br  />

**Content:**  `{ error : "Internal Server Error" }`<br  /><br  />

*3. Show To Do List by Id*
-

/todos/:id
  
*  **Method:**

`GET`
*  **URL Params**

**Required:**

`id=[integer]`

*  **Success Response:**

**Code:** 200 <br  />

**Content:**  `{ Filtered To Do List by Id }`
*  **Error Response:**

**Code:** 404 <br  />

**Content:**  `{ error : "Not Found" }`<br  /><br  />

*4. Replace To Do List by Id*
-

/todos/:id
  
*  **Method:**

`PUT`

*  **URL Params**

**Required:**

`id=[integer]`

*  **Data Params**

**Body**:

`{ title:[string], description:[string], status: [string], due_date: Date }`


*  **Success Response:**

**Code:** 200 <br  />

**Content:**  `{ `{ title:[string], description:[string], status: [string], due_date: Date }` }`
*  **Error Response:**

**Code:** 404 <br  />

**Content:**  `{ error : "Not Found" }`<br  />
or<br  />
**Code:** 400 <br  />

**Content:**  `{ error : "Input Validation Errors" }`<br  />
or<br  />
**Code:** 500 <br  />

**Content:**  `{ error : "Internal Server Error" }`<br  /><br  />




*5. Patch To Do List by Id*
-

/todos/:id
  
*  **Method:**

`PATCH`


*  **URL Params**

**Required:**

`id=[integer]`
*  **Data Params**

**Body**:

`{ status: [string] }`


*  **Success Response:**

**Code:** 200 <br/>

**Content:**  `{ `{ title:[string], description:[string], status: [string], due_date: Date }` }`
*  **Error Response:**

**Code:** 404 <br  />

**Content:**  `{ error : "Not Found" }`<br  />

or<br  />

**Code:** 400 <br  />

**Content:**  `{ error : "Input Validation Errors" }`<br  />

or<br  />

**Code:** 500 <br  />

**Content:**  `{ error : "Internal Server Error" }`<br  /><br  />

*6.  Delete Do List by Id*
-

/todos/:id
  
*  **Method:**

`DELETE`


*  **URL Params**

**Required:**

`id=[integer]`


*  **Success Response:**

**Code:** 200 <br/>

**Content:**  ``{ `message: 'to do deleted successfully'`` }`<br  />
*  **Error Response:**

**Code:** 404 <br  />

**Content:**  `{ error : "Not Found" }`<br  />
or

**Code:** 500 <br  />

**Content:**  `{ error : "Internal Server Error" }`