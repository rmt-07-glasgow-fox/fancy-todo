# Fancy Todo App
Technology Portal News is application for {.......}. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;
# All endpoints in server
list endpoints:
- POST /register
- POST /login
- POST /login/google
- GET /todos
- POST /todos
- GET /todos/:id
- PUT /todos/:id
- PATCH /todos/:id
- DELETE /todos/:id
- GET /api

&nbsp;
# RESTful endpoints

### POST /register
_Request:_

- body 

    ```json
    {
        "email" : "mail@email",
        "password" : "binmail"
    }
    ```

_Response:_

- body 

    ```json
    {
        "email" : "mail@email",
        "password" : "binmail"
    }
    ```
### POST /login
_Request:_

- body 

    ```json
    {
        "email" : "mail@email",
        "password" : "binmail"
    }
    ```

_Response:_

- body 

    ```json
    {
    "access_token" : "jwt_access_token"
    }
    ```
### GET /todos
_Request:_

- headers 

    ```json
    {
    "access_token" : "jwt_access_token"
    }
    ```

_Response:_

- body 

    ```json
    {
        "id": "<given id by system>",
        "title": "<to do title>",
        "description": "<to do description>",
        "status": "<to do status>",
        "dueDate": "<to do date>"
    }
    ```

### POST /todos
_Request:_

- headers 

    ```json
    {
    "access_token" : "jwt_access_token"
    }
    ```

_Response:_

- body 

    ```json
    {
        "title": "<title to get insert into>",
        "description": "<to do description>",
        "status": "<status to get insert into>",
        "dueDate": "<due_date to get insert into>"
    }
    ```

### GET /todos/:id
_Request:_

- headers 

    ```json
    {
    "access_token" : "jwt_access_token"
    }
    ```
- params 

    ```json
    {
    "id" : "<to do id>",
    }
    ```
_Response:_

- body 

    ```json
    {
        "id": "<given id by system>",
        "title": "<to do title>",
        "description": "<to do description>",
        "status": "<to do status>",
        "due_date": "<to do date>"
    }
    ```

### PUT /todos/:id
_Request:_

- headers 

    ```json
    {
    "access_token" : "jwt_access_token"
    }
    ```
- params 

    ```json
    {
    "id" : "<to do id>",
    }
    ```

_Response:_

- body 

    ```json
    {
        "title": "<title to get insert into>",
        "description": "<to do description>",
        "status": "<status to get insert into>",
        "dueDate": "<due_date to get insert into>"
    }
    ```

### PATCH /todos/:id
_Request:_

- headers 

    ```json
    {
    "access_token" : "jwt_access_token"
    }
    ```
- params 

    ```json
    {
    "id" : "<to do id>",
    }
    ```

_Response:_

- body 

    ```json
    {
        "status": "<status to get insert into>"
    }
    ```

### DELETE /todos/:id
_Request:_

- headers 

    ```json
    {
    "access_token" : "jwt_access_token"
    }
    ```
- params 

    ```json
    {
    "id" : "<to do id>",
    }
    ```

_Response:_

- body 

    ```json
    {
        "message": "<success message>"
    }
    ```

### GET /weather
_Request:_

- headers 

    ```json
    {
    "access_token" : "jwt_access_token"
    }
    ```
- params 

    ```json
    {
    "location" : "<location>",
    }
    ```

_Response:_

- body 

    ```json
    {
    "coord": {
        "lat" : "<latitude>",
        "lon" : "<longitude>"
    },
    "weather": [
        {
            "id": "<id>",
            "main": "Rain",
            "description": "light rain",
            "icon": "10n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": "<number>",
        "feels_like": "<number>",
        "temp_min": "<number>",
        "temp_max": "<number>",
        "pressure": "<number>",
        "humidity": "<number>",
        "sea_level": "<number>",
        "grnd_level": "<number>"
    },
    "visibility": "<number>",
    "wind": {
        "speed": "<number>",
        "deg": "<number>"
    },
    "rain": {
        "1h": "<number>"
    },
    "clouds": {
        "all": "<number>"
    },
    "dt": "<timestamp>",
    "sys": {
        "country": "ID",
        "sunrise": "<timestamp>",
        "sunset": "<timestamp>"
    },
    "timezone": "<number>",
    "name": "<city>",
    "cod": 200
