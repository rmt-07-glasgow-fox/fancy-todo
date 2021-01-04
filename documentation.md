# Fancy Todo
###  Route
 - **POST /todos**

	* Request:
		* Url:
			`/todos`
		* Body:
			```
			{
				"title": <string>,
				"description": <string>,
				"status": <finished or unfinished>
				"dueDate": <date>
			}
			```

	* Response:
		* Success:
			```
			{
				"id": <int>
				"title": <string>,
				"description": <string>,
				"status": <finished or unfinished>
				"dueDate": <date>
			}
			
		* Validation Error:
		
			The msg is based on the request body value
			```
			{
				"name": "Validation Error",
				"msg": [
					"Status must be 'finished' or 'unfinished'!!!",
					"Title required!!!",
					"Status required!!!",
					"Due date required!!!",
					"Invalid date!!!",
					"Date already passed!!!"
				]
			}
		* Server Error: 
			`"Server Error"`

- **GET /todos**
	* Request:
		* Url:
			`/todos`
	* Response:
		* Success:
			
			Example:
			```
			[
				{
					"id": 1,
					"title": "Mengerjakan tugas",
					"description": "Challenge project fancy todo",
					"status": "unfinished",
					"dueDate": "2021-01-09T00:00:00.000Z"
				},
				{
					"id": 2,
					"title": "Membaca dokumentasi",
					"description": "Tentang API",
					"status": "unfinished",
					"dueDate": "2021-01-05T00:00:00.000Z"
				}
			]
		* Server Error:
			`"Server Error"`

- **GET /todos/:id**
	* Request:
		* Url:
			`/todos/<todo id>`
	* Response:
		* Success:

			Example: `/todos/1` ( Data with id 1 is available )
			```
			{
				"id": 1,
				"title": "Mengerjakan tugas",
				"description": "Challenge project fancy todo",
				"status": "unfinished",
				"dueDate": "2021-01-09T00:00:00.000Z"
			}
		* Not Found:

				Example: `/todos/5` ( There is no data with id 5 )
				
				{
					"msg": "Cannot found data with id 5"
				}
		* Server Error: 
			`"Server Error"`

- **PUT /todos/:id**
	* Request:
		* Url:
			`/todos/<todo id>`
		* Body:
			```
			{
				"id": <int>
				"title": <string>,
				"description": <string>,
				"status": <finished or unfinished>
				"dueDate": <date>
			}
	* Response:
		* Success:

			Example: Update data with id 4
			```
			{
				"id": 4,
				"title": "Menonton youtube",
				"description": "Tentang API",
				"status": "unfinished",
				"dueDate": "2021-01-05T00:00:00.000Z"
			}
		* Validation Error:

			The msg is based on the request body value
			```
			{
				"name": "Validation Error",
				"msg": [
					"Status must be 'finished' or 'unfinished'!!!",
					"Title required!!!",
					"Status required!!!",
					"Due date required!!!",
					"Invalid date!!!",
					"Date already passed!!!"
				]
			}
		* Not Found:

			Example: `/todos/6` ( There is no data with id 6 )
			```
			{
				"msg": "Data with id 6 not found"
			}
		* Server Error:
			`"Server Error"`
- **PATCH /todos/:id**
	* Request:
		* Url:
			`/todos/<todo id>`
		* Body:
			```
			{
				"status": <finished or unfinished>
			}
	* Response:
		* Success:

			Example: Data with id 4, only the update status
			```
			{
				"id": 4,
				"title": "Menonton youtube",
				"description": "Tentang API",
				"status": <finished or unfinished>,
				"dueDate": "2021-01-05T00:00:00.000Z"
			}
		* Validation Error:

			The msg is based on the request body value
			```
			{
				"name": "Validation Error",
				"msg": [
					"Status must be 'finished' or 'unfinished'!!!",
					"Status required!!!"
				]
			}
		* Not Found:

			Example: `/todos/6` ( There is no data with id 6 )
			```
			{
				"msg":"Data with id 6 not found"
			}
		* Server Error:
			`"Server Error"`

- **DELETE /todos/:id**
	* Request:
		* Url:
			`/todos/<todo id>`
	* Response:
		* Success:
			`Todo succes to delete`
		* Not Found:
        
			Example: `/todos/6` ( There is no data with id 6 )
			```
			{
				"msg":"Data with id 6 not found"
			}
		* Server Error:
			`"Server Error"`
