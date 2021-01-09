
---
# API Documentation
---

### LOGIN PAGE
![Clean Blog Preview](https://raw.githubusercontent.com/rmt-07-glasgow-fox/fancy-todo/6e9baec3f5937a0a906e0629c2a1d38f6322aabe/client/assets/page-login.png)

### MAIN PAGE
![Clean Blog Preview](https://raw.githubusercontent.com/rmt-07-glasgow-fox/fancy-todo/6e9baec3f5937a0a906e0629c2a1d38f6322aabe/client/assets/page-main.png)

SETTING IN SERVER
```
npm i
sequelize db:create
sequelize db:migrate
```

ENV
```
JWT_SECRET_KEY=secretKey
NEWS_API_KEY=737d647b324541a2aa6ad30016dd3540
GOOGLE_CLIENT_ID=847872434739-ieov91f4btpg8551tira12pvdtatudrg.apps.googleusercontent.com
```

RUN
```
Server : npm run dev / nodemon app.js
Client : live-server --host=localhost (npm install -g live-server)
```

URL
```
Server URL  : http://localhost:3000
Client URL  : http://localhost:8080 (registered google API)
```

### Todo
| Method | Route      | Description              |
| ------ | ---------- | ------------------------ |
| POST   | /todos     | Add new todo             |
| GET    | /todos     | Get all todo             |
| GET    | /todos/:id | Get todo by id           |
| PUT    | /todos/:id | Update todo by id        |
| PATCH  | /todos/:id | Update status todo by id |
| DELETE | /todos/:id | Delete todo by id        |

### User
| Method | Route     | Description  |
| ------ | --------- | ------------ |
| POST   | /register | Add new user |
| POST   | /login    | Login user   |

### PublicAPI
| Method | Route            | Description                                                                                                                       |
| ------ | ---------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| GET    | /news            | Get list headline news in indonesia from http://newsapi.org                                                                       |
| GET    | /news/:category  | Get list headline news in indonesia from http://newsapi.org by category (business entertainment health science sports technology) |
| GET    | /covid/indonesia | Get covid recent statistic in Indonesia from https://covid19.mathdro.id/api/countries/ID                                          |
| GET    | /covid/global    | Get covid recent statistic globally from https://covid19.mathdro.id/api                                                           |

---
### GET /todos 
---
>get all todos list

_Request Headers_
```
access_token : MOutCvMHysWtpWDi00
```

_Request Body_
```
not needed
```

_Response ( 200 )_
```
{
    "message": [
        {
            "id": 10,
            "title": "Belajar React",
            "description": "updated",
            "status": true,
            "due_date": "2021-01-06",
            "UserId": 4
        },
        {
            "id": 13,
            "title": "Belajar React",
            "description": "updated",
            "status": false,
            "due_date": "2021-01-06",
            "UserId": 4
        }
    ]
}
```

_Response ( 401 )_
```
{
    "message": "jwt must be provided" / "jwt malformed"
}
```

_Response (500)_
```
{
    "message": "Internal server error"
}
```

---
### POST /todos
---
>Create new todos list

_Request Headers_
```
access_token : MOutCvMHysWtpWDi00
```

_Request Body_
```
{
    "title": "test",
    "description": "",
    "due_date": "2021-01-06"
}
```

_Response ( 201 - Created )_
```
{
    "message": {
        "id": 18,
        "status": false,
        "title": "test",
        "description": "",
        "due_date": "2021-01-06",
        "UserId": 4
    }
}
```

_Response( 400 - bad request )_
```
{
    "message" : [
        "Name required",
        "Description required",
        "Status required",
        "Due date required",
        "Status has to be true or false"
    ]
}
```

_Response ( 401 - Forbidden )_
```
{
    "message": "jwt must be provided" / "jwt malformed"
}
```

_Response( 404 - Not Found )_
```
{
    "message": "Not found"
}
```

_Response ( 500 - Internal Server Error )_
```
{
    "message": "Internal server error"
}
```

---
### GET /todos/:id
---
>Get todos list by ID

_Request Headers_
```
access_token : MOutCvMHysWtpWDi00
```

_Request Body_
```
not needed
```

_Response ( 200 - OK )_
```
{
    "message": {
        "id": 18,
        "status": false,
        "title": "test",
        "description": "",
        "due_date": "2021-01-06",
        "UserId": 4
    }
}
```

_Response(404 - not found)_
```
{
  "message": "Data_not_found"
}
```

---
### PUT /todos/:id 
---
>Update todos list by ID

_Request Headers_
```
access_token : MOutCvMHysWtpWDi00
```

_Request Body_
```
{
    "title": "test",
    "description": "",
    "due_date": "2021-01-06",
    "status": true / false
}
```

_Response( 200 - OK )_
```
{
    "message": {
        "id": 18,
        "status": false,
        "title": "test",
        "description": "",
        "due_date": "2021-01-06",
        "UserId": 4
    }
}
```

_Response( 400 - Bad Request )_
```
{
    "message" : [
        "Name required",
        "Description required",
        "Status required",
        "Due date required",
        "Status has to be true or false"
    ]
}
```

_Response( 403 - Forbidden )_
```
{
    "message": "It doesn't belongs to user"
}
```

_Response( 404 - Not Found )_
```
{
    "message": "Not found"
}
```

_Response ( 500 - Internal Server Error )_
```
{
    "message": "Internal server error"
}
```

---
### PATCH /todos/:id 
---
>Update todos status by ID

_Request Headers_
```
access_token : MOutCvMHysWtpWDi00
```

_Request Body_
```
{
 "status": true / false
}
```

_Response(200)_
```
{
    "message": {
        "id": 18,
        "title": "Belajar React",
        "description": "updated",
        "status": false,
        "due_date": "2021-01-08",
        "UserId": 4
    }
}
```

_Response( 403 - Forbidden )_
```
{
    "message": "It doesn't belongs to user"
}
```

_Response( 404 - Not Found )_
```
{
    "message": "Not found"
}
```

_Response ( 500 - Internal Server Error )_
```
{
    "message": "Internal server error"
}
```

---
### DELETE /todos/:id 
---
>Delete todos list by ID

_Request Headers_
```
access_token : MOutCvMHysWtpWDi00
```

_Request Body_
```
not needed
```

_Response( 200 )_
```
OK
```
_Response( 403 - Forbidden )_
```
{
    "message": "It doesn't belongs to user"
}
```

_Response( 404 - Not Found )_
```
{
    "message": "Not found"
}
```

_Response ( 500 - Internal Server Error )_
```
{
    "message": "Internal server error"
}
```

---
### POST /register 
---
>Delete todos list by ID

_Request Headers_
```
not needed
```

_Request Body_
```
{
    "email": "user01@gmail.com",
    "password": "user01"
}
```

_Response( 200 )_
```
{
    "id": 5,
    "email": "user03@gmail.com"
}
```

_Response( 400 - Bad Request )_
```
{
    "message": [
        "Email is empty",
        "Invalid email format",
        "Password is empty",
        "Password at least 6 characters"
    ]
}
```

_Response( 404 - Not Found )_
```
{
    "message": "Not found"
}
```

_Response ( 500 - Internal Server Error )_
```
{
    "message": "Internal server error"
}
```

---
### POST /login 
---
>Delete todos list by ID

_Request Headers_
```
not needed
```

_Request Body_
```
{
    "email": "user01@gmail.com",
    "password": "user01"
}
```

_Response( 200 )_
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ1c2VyMDJAZ21haWwuY29tIiwiaWF0IjoxNjA5OTI0ODg1fQ.PdvoxOqmU8s7Vl40B9UcdLg08EQL9t3O1XDyHbOsbsk"
}
```

_Response( 400 - Bad Request )_
```
{
    "message": "Email / Password is invalid"
}
```

_Response( 404 - Not Found )_
```
{
    "message": "Not found"
}
```

_Response ( 500 - Internal Server Error )_
```
{
    "message": "Internal server error"
}
```

---
### GET /news 
---
> Get list headline news in indonesia from http://newsapi.org

_Request Headers_
```
not needed
```

_Request Body_
```
Not Neede
```

_Response( 200 )_
```
[
    {
        "source": {
            "id": null,
            "name": "Sindonews.com"
        },
        "author": "Muh Iqbal Marsyaf",
        "title": "Punya Bukti Kuat, Astrofisikawan Harvard Percaya Alien Cerdas... - SINDOnews.com",
        "description": "Ahli astrofisika Harvard, Avi Loeb, mengatakan, dia telah menemukan bukti kuat untuk teknologi alien di tata surya, apa yang bisa disebut sebagai sampah kehidupan...",
        "url": "https://sains.sindonews.com/read/294972/767/punya-bukti-kuat-astrofisikawan-harvard-percaya-alien-cerdas-kunjungi-bumi-1610121691?showpage=all",
        "urlToImage": "https://pict.sindonews.net/dyn/620/pena/news/2021/01/08/767/294972/punya-bukti-kuat-astrofisikawan-harvard-percaya-alien-cerdas-kunjungi-bumi-ulu.jpg",
        "publishedAt": "2021-01-08T16:13:25Z",
        "content": "JAKARTA - Ahli astrofisika Harvard, Avi Loeb, mengatakan, dia telah menemukan bukti kuat untuk teknologi alien di tata surya, apa yang bisa disebut sebagau sampah kehidupan asing. Tetapi beberapa ilm… [+7131 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "Idntimes.com"
        },
        "author": "Santi Dewi",
        "title": "Menkes Turki Segera Keluarkan Izin Edar Darurat Sinovac - IDNTimes.com",
        "description": "Turki jadwalkan rilis EUA CoronaVac pekan depan",
        "url": "https://www.idntimes.com/news/world/santi-dewi/menkes-turki-segera-keluarkan-izin-edar-darurat-vaksin-sinovac",
        "urlToImage": "https://cdn.idntimes.com/content-images/post/20210104/whatsapp-image-2021-01-04-at-82808-am-2-5231a1a9ed98d4bfe442468db68261c6_wm_600x315.jpg",
        "publishedAt": "2021-01-08T15:13:21Z",
        "content": null
    }
]
```

_Response ( 500 - Internal Server Error )_
```
{
    "message": "Internal server error"
}
```

---
### GET /news/:category 
---
> Get list headline news in indonesia from http://newsapi.org by category (business entertainment health science sports technology)

_Request Headers_
```
params.category = business / entertainment / health / science / sports / technology
```

_Request Body_
```
Not Needed
```

_Response( 200 )_
```
[
    {
        "source": {
            "id": null,
            "name": "Gamedaim.com"
        },
        "author": "https://www.facebook.com/felix10969",
        "title": "Fall Guys Hadirkan Skin Doom! - Gamedaim.com",
        "description": "Baru-baru ini, Fall Guys telah merilis sebuah trailer yang menandakan bahwa siap kolaborasi dengan Doom. Kolaborasi ini hadirkan skin doom....",
        "url": "https://gamedaim.com/berita/fall-guys-skin-doom/",
        "urlToImage": "https://gamedaim.com/wp-content/uploads/2021/01/Fall-Guys-Hadirkan-Skin-Doom-.jpg",
        "publishedAt": "2021-01-08T15:41:30Z",
        "content": "Popularitas Fall Guys memang tidak sebesar saat pertama kali rilis beberapa bulan lalu. Namun, tentu saja tidak membuat peredaran game besutan Mediatonic ini hilang begitu saja. Ini tentu tidak lepas… [+1631 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "Akurat.co"
        },
        "author": "Hidayat Salam",
        "title": "Resmi Perkenalkan Samsung Galaxy M02s, Cuman Dibanderol Rp1 Jutaan - Akurat.co",
        "description": "Resmi Perkenalkan Samsung Galaxy M02s, Cuman Dibanderol Rp1 Jutaan",
        "url": "https://akurat.co/iptek/id-1258876-read-resmi-perkenalkan-samsung-galaxy-m02s-cuman-dibanderol-rp1-jutaan",
        "urlToImage": "https://cdn.akurat.co/images/uploads/images/akurat_20210108060924_xp3zi4.jpg",
        "publishedAt": "2021-01-08T15:00:00Z",
        "content": "AKURAT.CO Memasuki awal 2021, Samsung terus meluncurkan perangkat terbarunya untuk seri terjangkau mereka. Kini pabrikan asal Korea Selatan tersebut akan meluncurkan Samsung Galaxy M02s di India.\r\nMe… [+1642 chars]"
    }
]
```

_Response ( 500 - Internal Server Error )_
```
{
    "message": "Internal server error"
}
```

---
### GET /covid/global 
---
> Get covid recent statistic globally from https://covid19.mathdro.id/api

_Request Headers_
```
not need
```

_Request Body_
```
Not Needed
```

_Response( 200 )_
```
{
    "confirmed": 88389886,
    "recovered": 49250228,
    "deaths": 1905159,
    "lastUpdate": "2021-01-08T17:22:35.000Z",
    "image": "https://covid19.mathdro.id/api/og"
}
```

_Response ( 500 - Internal Server Error )_
```
{
    "message": "Internal server error"
}
```

---
### GET /covid/indonesia 
---
> Get covid recent statistic globally from https://covid19.mathdro.id/api/countries/ID

_Request Headers_
```
not need
```

_Request Body_
```
Not Needed
```

_Response( 200 )_
```
{
    "confirmed": 808340,
    "recovered": 666883,
    "deaths": 23753,
    "lastUpdate": "2021-01-08T17:22:35.000Z"
}
```

_Response ( 500 - Internal Server Error )_
```
{
    "message": "Internal server error"
}
```