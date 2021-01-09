# Fancy Todos

**A simple todo list app. Millions people rely on this app with their task list, reminder, planner, and more. Be an organized and punctual person. Keep things practical before they become confusing and forgotten.**

### Env:

 - SECRET_KEY
 - GOOGLE_AUTH_KEY
 - API_KEY

### Error response type:

 - Status: 400 *Bad request*
	 
	```
	{
		"name":"Validation error",
		"msg": [Error list...]
	}
	```

 - Status: 401 *Unauthorized*

	```
	{
		"msg":"Access failed!!!"
	}
	```
	
	or

	```
	{
		"msg":"You must logged in!!!"
	}
	```

 - Status: 404 *Not found*
	 
	```
	{
		"msg":"Data with id <id> not found!!!"
	}
	```

 - Status: 500 *Server error*
	 
	```
	"Server Error"
	```

## Routes

 - **POST** /signIn
 
	> req.body
	```
	{
		"email":<string>,
		"password":<string>
	}
	```
	> Success
	```
	{
		"id":<int>,
		"email":<string>
	}
	```
	> Error 400 and 500
	
 - **POST** /signUp
	> req.body
	```
	{
		"email":<string>,
		"password":<string>
	}
	```
	> Success
	```
	{
		"token":<string>
	}
	```
	> Error 400 and 500
 - **POST** /googleLogin
	 > req.body
	```
	{
		token_id: <googleToken>
	}
	``` 
	> Success
	```
	{
		"token":<jwt>
	}
	```
	> Error 500
 - **POST** /todos
	 > req.headers
	```
	{
		"token":<jwt>
	}
	```
	 > req.body
	```
	{
		"title":<string>,
		"description":<string>,
		"status":<finished or unfinished>,
		"due-date":<string>
	}
	```
	> Success
	```
	{
		"id":<int>,
		"title":<string>,
		"description":<string>,
		"status":<finished or unfinished>,
		"due-date":<string>
	}
	```
	> Error 400 and 500
 - **GET** /todos
	 > req.headers
	```
	{
		"token":<jwt>
	}
	```
	 > Success
	 ```
	[{
		"id":<int>,
		"title":<string>,
		"description":<string>,
		"status":<finished or unfinished>,
		"due-date":<string>
	}, ...]
	```
	> Error 401 and 500
 - **GET** /todos/:id
	 > req.headers
	```
	{
		"token":<jwt>
	}
	```
	> Success
	```
	{
		"id":<int>,
		"title":<string>,
		"description":<string>,
		"status":<finished or unfinished>,
		"due-date":<string>
	}
	```
	> Error 401, 404, and 500
 - **PUT** /todos/:id
	 > req.headers
	```
	{
		"token":<jwt>
	}
	```
	> req.body
	```
	{
		"id":<int>,
		"title":<string>,
		"description":<string>,
		"status":<finished or unfinished>,
		"due-date":<string>
	}
	```
	> Success
	```
	{
		"id":<int>,
		"title":<string>,
		"description":<string>,
		"status":<finished or unfinished>,
		"due-date":<string>
	}
	```
	> Error 400, 401, 404, and 500
 - **PATCH** /todos/:id
	 > req.headers
	```
	{
		"token":<jwt>
	}
	```
	> req.body
	```
	{
		"status":<finished or unfinished>
	}
	```
	> Success
	```
	{
		"id":<int>,
		"title":<string>,
		"description":<string>,
		"status":<finished or unfinished>,
		"due-date":<string>
	}
	```
	> Error 400, 401, 404, and 500
 - **DELETE** /todos/:id
	 > req.headers
	```
	{
		"token":<jwt>
	}
	```
	> Success
	```
	"todo success to delete"
	```
	> Error 401, 404, and 500
 - **POST** /movies/find
	 > req.headers
	```
	{
		"token":<jwt>
	}
	```
	> req.body
	```
	{
		"search":<string>
	}
	```
	> Succes
	```
	[{ ... }, Array of movie...]
	```
 - **GET** /movies
	 > req.headers
	```
	{
		"token":<jwt>
	}
	```
	> Succes
	```
	[{ ... }, Array of movie...]
	```
 - **GET** /movies/topRated
	 > req.headers
	```
	{
		"token":<jwt>
	}
	```
	> Succes
	```
	[{ ... }, Array of movie...]
	```
