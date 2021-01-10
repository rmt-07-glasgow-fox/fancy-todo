# fancy-todo REST APIs Documentation

## Open Endpoints

Open endpoints require no Authentication.

* [Login](login.md) : `POST /api/users/login/`
* [Register](register.md) : `POST /api/users/register/`

## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header of the
request. A Token can be acquired from the Login view above.


### Current User related

Each endpoint manipulates or displays information related to the User whose
Token is provided with the request:

* [Show info](user/get.md) : `GET /api/users/`
* `<TBD>` [Update info](user/put.md) : `PUT /api/users/`

### Todo related

Endpoints for CRUD the Todos that the Authenticated User has permissions to access.

* [Create Todo](todos/post.md) : `POST /api/todos/`
* [Show Todos](todos/post.md) : `GET /api/todos/`
* [Show A Todo](todos/id/get.md) : `GET /api/todos/:id/`
* [Update A Todo](todos/id/put.md) : `PUT /api/todos/:id/`
* [Update A Todo Status](todos/id/patch.md) : `PATCH /api/todos/:id/`
* [Delete A Todo](todos/id/delete.md) : `DELETE /api/todos/:id/`

### 3rd Party APIs related `<TBD>`

E.g: Emailing for Todos hits

## Error Response for Authentication Endpoints

**Condition** : If not provide valid 'access_token' on headers

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "message": "Login First"
}
```

## Error Response for Request Failed because of Server Error

**Condition** : Request Failed because of Server Error

**Code** : `500 INTERNAL SERVER ERROR'

**Content** :

```json
{
    "message": "INTERNAL SERVER ERROR"
}
```

# Login

Used to collect a Token for a registered User.

**URL** : `/api/login/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
    "email": "[valid email address; uniqe email]",
    "password": "[password in plain text; minimal 6 characters]"
}
```

**Data example**

```json
{
    "email": "andrianm28@hacktiv8.com",
    "password": "abcd1234"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "access_token": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d"
}
```

## Error Response

**Condition** : If 'email' is not available.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "message": "Email does not exist"
}
```

### Or

**Condition** : If 'password' is wrong.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
    "message": "Wrong Password"
}
```

# Register

Create an Account for the authenticated User if an Account for that User does
not already exist. Each User can only have one Account.

**URL** : `/api/register/`

**Method** : `POST`

**Auth required** : YES

**Permissions required** : None

**Data constraints**

Provide email of Account to be created.

```json
{
    "email": "[valid email address; uniqe email]",
    "password": "[password in plain text; minimal 6 characters]"
}
```

**Data example** All fields must be sent.

```json
{
    "email": "andrianm28@hacktiv8.com",
    "password": "abc123"
}
```

## Success Response

**Condition** : If everything is OK and an Account didn't exist for this User.

**Code** : `201 CREATED`

**Content example**

```json
{
    "id": 123,
    "email": "andrianm28@hacktiv8.com"
}
```

## Error Responses

**Condition** : If Account already exists for User.

**Code** : `303 SEE OTHER`

**Headers** : `Location: /api/accounts/123/`

**Content example**

```json
{
    "messages": "This Email already exists"
}
```

### Or

**Condition** : If email field is missed.

**Code** : `400 BAD REQUEST`

**Content example**

```json
{
    "messages": "Email is Required"
}
```

### Or

**Condition** : If email is not like email format.

**Code** : `400 BAD REQUEST`

**Content example**

```json
{
    "messages": "Email Must Be Email Format"
}
```

### Or

**Condition** : If password field is missed.

**Code** : `400 BAD REQUEST`

**Content example**

```json
{
    "messages": "Password is Required"
}
```

### Or

**Condition** : If password length less than 6.

**Code** : `400 BAD REQUEST`

**Content example**

```json
{
    "messages": "Password at least 6 characters"
}
```

# Show Current User 

Get the details of the currently Authenticated User along with basic
subscription information.

**URL** : `/api/users/`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

For a User with ID 1234 on the local database where that User has saved an
email address and name information.

```json
{
    "id": 1234,
    "email": "andrianm28@hacktiv8.com"
}
```

# Update Current User `<TBD>`

Allow the Authenticated User to update their details.

**URL** : `/api/users/`

**Method** : `PUT`

**Auth required** : YES

**Permissions required** : None

**Data constraints**

```json
{
    "first_name": "[1 to 30 chars]",
    "last_name": "[1 to 30 chars]"
}
```

Note that `id` and `email` are currently read only fields.

**Header constraints**

The application used to update the User's information can be sent in the
header. Values passed in the `UAPP` header only pass basic checks for validity:

- If 0 characters, or not provided, ignore.
- If 1 to 8 characters, save.
- If longer than 8 characters, ignore.

```
UAPP: [1 to 8 chars]
```

**Data examples**

Partial data is allowed.

```json
{
    "first_name": "John"
}
```

Empty data can be PUT to erase the name, in this case from the iOS application
version 1.2:

```
UAPP: ios1_2
```

```json
{
    "last_name": ""
}
```

## Success Responses

**Condition** : Data provided is valid and User is Authenticated.

**Code** : `200 OK`

**Content example** : Response will reflect back the updated information. A
User with `id` of '1234' sets their name, passing `UAPP` header of 'ios1_2':

```json
{
    "id": 1234,
    "first_name": "Joe",
    "last_name": "Bloggs",
    "email": "joe25@example.com",
    "uapp": "ios1_2"
}
```

## Error Response

**Condition** : If provided data is invalid, e.g. a name field is too long.

**Code** : `400 BAD REQUEST`

**Content example** :

```json
{
    "first_name": [
        "Please provide maximum 30 character or empty string",
    ]
}
```

## Notes

* Endpoint will ignore irrelevant and read-only data such as parameters that
  don't exist, or fields that are not editable like `id` or `email`.
* Similar to the `GET` endpoint for the User, if the User does not have a
  UserInfo instance, then one will be created for them.

# Create A Todo

Create a Todo.

**URL** : `/api/todos/`

**Method** : `POST`

**Auth required** : YES

**Permissions required** : None

**Data constraints**

Provide title, description, status and due date of Todo to be created.

```json
{
  "title": "[string]",
  "description": "[string]",
  "status": "[string]",
  "due_date": "[date]"
}
```

**Data example** All fields must be sent.

```json
{
  "title": "Build Startup",
  "description": "Build Tech Startup",
  "status": "DOING",
  "due_date": "15/03/2021"
}
```

## Success Response

**Condition** : If everything is OK.

**Code** : `201 CREATED`

**Content example**

```json
{
  "id": "1",
  "title": "Build Startup",
  "description": "Build Tech Startup",
  "status": "DOING",
  "due_date": "15/03/2021",
  "UserId": "123",
  "updatedAt": "2021-01-09 09:00:32.958+07",
  "createdAt": "2021-01-09 09:00:32.958+07"
}
```

## Error Responses

**Condition** : If 'due_date' is passed due today

**Code** : `400 BAD REQUEST`

**Content example**

```json
{
    "messages": "Due Date must greater than equal Today"
}
```

# Show Todos

Get the list of Todos.

**URL** : `/api/todos/`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

```json
[
  {
    "id": "1",
    "title": "Build Startup",
    "description": "Build Tech Startup",
    "status": "DOING",
    "due_date": "15/03/2021",
    "UserId": "123",
    "updatedAt": "2021-01-09 09:00:32.958+07",
    "createdAt": "2021-01-09 09:00:32.958+07"
  }
]
```

# Show A Todo

Get a Todo by Id.

**URL** : `/api/todos/:id`

**Method** : `GET`

**Auth required** : YES

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

```json
{
  "id": "1",
  "title": "Build Startup",
  "description": "Build Tech Startup",
  "status": "DOING",
  "due_date": "15/03/2021",
  "UserId": "123",
  "updatedAt": "2021-01-09 09:00:32.958+07",
  "createdAt": "2021-01-09 09:00:32.958+07"
}
```

# Update A Todo

Update the Todo by Id.

**URL** : `/api/todos/:id/`

**Method** : `PUT`

**Auth required** : YES

**Permissions required** : User is Todo Owner

**Data constraints**

```json
{
  "title": "[string]",
  "description": "[string]",
  "status": "[string]",
  "due_date": "[date]"
}
```

**Data example** Partial data is allowed.

```json
{
  "title": "Build Startup",
  "description": "Build a Decacorn Tech Startup",
  "status": "DOING",
  "due_date": "15/03/2021"
}
```

## Success Responses

**Condition** : Update can be performed either fully or partially by the Owner
of the Todo.

**Code** : `200 OK`

**Content example** : For the example above, when the 'description' is updated and
posted to `/api/todos/1/`...

```json
{
  "id": "1",
  "title": "Build Startup",
  "description": "Build a Decacorn Tech Startup",
  "status": "DOING",
  "due_date": "15/03/2021",
  "UserId": "123",
  "updatedAt": "2021-01-09 09:00:32.958+07",
  "createdAt": "2021-01-09 09:00:32.958+07"
}
```

## Error Response

**Condition** : If 'due_date' is passed due today

**Code** : `400 BAD REQUEST`

**Content example**

```json
{
    "messages": "Due Date must greater than equal Today"
}
```

### Or

**Condition** : Todo does not exist at URL

**Code** : `404 NOT FOUND`

**Content** :

```json
{
    "messages": "Todo does not exist"
}
```

### Or

**Condition** : Authorized User is not Owner of Todo at URL.

**Code** : `403 FORBIDDEN`

**Content** :

```json
{
    "messages": "Unauthorized"
}
```

# Update A Todo Status

Update the Todo by Id.

**URL** : `/api/todos/:id/`

**Method** : `PATCH`

**Auth required** : YES

**Permissions required** : User is Todo Owner

**Data constraints**

```json
{
  "status": "[string]"
}
```

**Data example** Partial data is allowed.

```json
{
  "status": "DONE"
}
```

## Success Responses

**Condition** : IF everything is OKE

**Code** : `200 OK`

**Content example** : For the example above, when the 'description' is updated and
posted to `/api/todos/1/`...

```json
{
  "id": "1",
  "title": "Build Startup",
  "description": "Build a Decacorn Tech Startup",
  "status": "DONE",
  "due_date": "15/03/2021",
  "UserId": "123",
  "updatedAt": "2021-01-09 09:00:32.958+07",
  "createdAt": "2021-01-09 09:00:32.958+07"
}
```

## Error Response

**Condition** : If 'status' either not "TODO/DOING/DONE"

**Code** : `400 BAD REQUEST`

**Content example**

```json
{
    "messages": "Status must be TODO/DOING/DONE"
}
```

### Or

**Condition** : Todo does not exist at URL

**Code** : `404 NOT FOUND`

**Content** :

```json
{
    "messages": "Todo does not exist"
}
```

### Or

**Condition** : Authorized User is not Owner of Todo at URL.

**Code** : `403 FORBIDDEN`

**Content** :

```json
{
    "messages": "Unauthorized"
}
```

# Delete A Todo

Delete the Todo of the Authenticated User if they are Owner by Id.

**URL** : `/api/todos/:id/`

**URL Parameters** : `id=[integer]` where `id` is the ID of the Todo in the
database.

**Method** : `DELETE`

**Auth required** : YES

**Permissions required** : User is Todo Owner

**Data** : `{}`

## Success Response

**Condition** : If the Todo exists.

**Code** : `200 OKE`

**Content** :

```json
{
    "messages": "todo with title: '<title>' success to delete"
}
```

## Error Responses

**Condition** : If there was no Todo available to delete.

**Code** : `404 NOT FOUND`

**Content** :

```json
{
    "messages": "Todo does not exist"
}
```

### Or

**Condition** : Authorized User is not Owner of Todo at URL.

**Code** : `403 FORBIDDEN`

**Content** :

```json
{
    "messages": "Unauthorized"
}
```