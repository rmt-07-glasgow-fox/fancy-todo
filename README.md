# fancy-todo
A simple todo apps, created using node.js, express, sequelize, postgres.


## URL
- Client: https://fancy-todo-h8.web.app
- Server: https://fancy-todo-glasgow-server.herokuapp.com

(For client's Google sign-in development, use http://localhost:8080)


## How to use this web application to its fullest?
- Please give permission to location access, so the Weather API can detect your location. 
- Double click cards to update the status to done, or not yet done.
- Todo which haven't been done but the due date has not exceeded, have white background
- Todo which haven't been done but the due date has exceeded, have red background
- Todo which has been done, have grey background with crossed description


## List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /googleLogin`
- `GET /todos`
- `POST /todos`
- `GET /todos/:id`
- `PUT /todos/:id`
- `PATCH /todos/:id`
- `DELETE /todos/:id`
- `GET /weather`


### POST /register

description: 
  register user

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 201
- body:
  ​

```json
{
  "id":"integer",
  "email": "string"
}
```

- status: 400
- body:
  ​

```json
{
  "message": [
    "Email Must Be Filled",
    "Input Must Be Email Address",
    "Password Must Be Filled",
    "Password Have Minimum 6 Character"
  ]
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### POST /login

description: 
  User login 

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "access_token": "jwt string",
    "name": "string"
}
```

- status: 401
- body:
  ​

```json
{
  "message": [
    "invalid email/password"
  ]
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### POST /googleLogin

description: 
  sign in as Google user

Request:

- data:

```json
{
  "idToken": "google token"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "access_token": "jwt string",
    "name" : "string"
}
```

- status: 201
- body:
  ​

```json
{
    "access_token": "jwt string",
    "name" : "string"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```


### GET /todos

description: 
  get all todo that user created before

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json

  [
    {
        "id": 1,
        "title": "Sleep",
        "description": "Go to dream island",
        "status": false,
        "due_date": "2021-02-28T00:00:00.000Z",
        "UserId": 1,
        "createdAt": "2021-01-05T04:23:05.692Z",
        "updatedAt": "2021-01-05T05:41:58.354Z"
    },
    {
        "id": 2,
        "title": "Eat",
        "description": "Eat Cheese BigMac",
        "status": false,
        "due_date": "2021-02-28T00:00:00.000Z",
        "UserId": 1,
        "createdAt": "2021-01-05T05:34:36.928Z",
        "updatedAt": "2021-01-05T06:02:09.525Z"
    },
    {
        "id": 3,
        "title": "Play",
        "description": "Play Among Us",
        "status": false,
        "due_date": "2021-02-28T00:00:00.000Z",
        "UserId": 1,
        "createdAt": "2021-01-05T05:34:53.543Z",
        "updatedAt": "2021-01-05T05:34:53.543Z"
    },
    {
        "id": 4,
        "title": "Date",
        "description": "Visit her house",
        "status": false,
        "due_date": "2021-02-28T00:00:00.000Z",
        "UserId": 1,
        "createdAt": "2021-01-05T05:35:17.201Z",
        "updatedAt": "2021-01-05T05:35:17.201Z"
    }
  ]

```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```
- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### POST /todos

description: 
  Create new todo 

Request:

- headers: access_token (string)
- body:

```json
{
    "title": "integer",
    "description": "string",
    "due_date": "Date"
}
```

Response:

- status: 200
- body:

```json
{
    "id": 5,
    "title": "Exercise",
    "description": "Go to gym",
    "status": false,
    "due_date": "2021-02-28T00:00:00.000Z",
    "UserId": 6,
    "createdAt": "2021-01-05T04:23:05.692Z",
    "updatedAt": "2021-01-05T05:41:58.354Z"
}
```

- status: 400
- body:
  ​
```json
{
  "message": [
    "The title can't be null",
    "The description can't be null",
    "The description must be filled",
    "The status can't be null",
    "the status must be boolean",
    "Date must be greater than today",
    "The date can't be null",
    "The date must be filled",
  ]
}
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```

- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### GET /todos/:id

description: 
  show todo which is requested by user

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
    "id": 1,
    "title": "Sleep",
    "description": "Go to dream island",
    "status": false,
    "due_date": "2021-02-28T00:00:00.000Z",
    "UserId": 1,
    "createdAt": "2021-01-05T04:23:05.692Z",
    "updatedAt": "2021-01-05T05:41:58.354Z"
}
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```
- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### PUT /todos/:id

description: 
  Update todo which is picked by user

Request:

- headers: access_token (string)
- params: id (integer)
- body:

```json
{
    "title": "integer",
    "description": "string",
    "due_date": "Date"
}
```

Response:

- status: 200
- body:

```json
{
    "id": 2,
    "title": "Eat",
    "description": "Eat Beef BigMac",
    "status": false,
    "due_date": "2021-02-27T00:00:00.000Z",
    "UserId": 1,
    "createdAt": "2021-01-05T05:34:36.928Z",
    "updatedAt": "2021-01-05T06:02:09.525Z"
}
```

- status: 400
- body:

```json
{
  "message": [
    "The title can't be null",
    "The description can't be null",
    "The description must be filled",
    "The status can't be null",
    "the status must be boolean",
    "Date must be greater than today",
    "The date can't be null",
    "The date must be filled",
  ]
}
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```
- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### PATCH /todos/:id

description: 
  Update todo status into done or vice-versa

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
    "id": 2,
    "title": "Eat",
    "description": "Eat Beef BigMac",
    "status": true,
    "due_date": "2021-02-27T00:00:00.000Z",
    "UserId": 1,
    "createdAt": "2021-01-05T05:34:36.928Z",
    "updatedAt": "2021-01-05T06:02:09.525Z"
}
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```
- status: 404
- body:

```json
{
  "message": "Eerror Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### DELETE /todos/:id

description: 
  Delete todo

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
    "message": "todo is deleted successfully"
}
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```
- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### GET /weather

description: 
  get current weather based from user location

Request:

- headers: 
    access_token (string)
    latitude (string)
    longitude (string)

Response:

- status: 200
- body:

```json
{
  "coord": {
    "lon": 110.42,
    "lat": -6.97
  },
  "weather": [
    {
      "id": 721,
      "main": "Haze",
      "description": "haze",
      "icon": "50d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 302.15,
    "feels_like": 306.85,
    "temp_min": 302.15,
    "temp_max": 302.15,
    "pressure": 1010,
    "humidity": 74
  },
  "visibility": 5000,
  "wind": {
    "speed": 1.5,
    "deg": 340
  },
  "clouds": {
    "all": 40
  },
  "dt": 1606531646,
  "sys": {
    "type": 1,
    "id": 9362,
    "country": "ID",
    "sunrise": 1606515117,
    "sunset": 1606560062
  },
  "timezone": 25200,
  "id": 1627896,
  "name": "Semarang",
  "cod": 200
}
```

- status: 401
- body:

```json
{
  "message": "Pleae Login First"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```