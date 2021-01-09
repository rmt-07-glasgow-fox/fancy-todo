# fancy-todo
Membuat website untuk mencatat hal - hal menarik untuk dilakukan

notes lecture 
- creating folder
- initiate package.json
npm init => isi manual description nya 
npm init -y => default

install => express, sequelize, pg
kalau mau autorestart server bisa pakai nodemon di local => https://www.npmjs.com/package/nodemon

- creating driver file (app.js / index.js)
- require express => http://expressjs.com/en/starter/hello-world.html

- start bikin routingan => bisa mulai dengan buat folder routes
- bikin file index.js, require router
const router = require('express').Router()

- bikin endpoints
contoh: 
router.get('/assets',  assetController.getAsset)
router.post('/assets', assetController.createAsset)
router.delete('/assets/:id', assetController.deleteAset)

- bikin controller

NOTES: 
kirim data dari body 
- json  => app.use(express.json())
- urlencoded => app.use(express.urlencoded({extended:true}))


request : 
req.body => body 
req.params => url params
'/assets/:id' => params id

req.query => query params

req.headers => put headers


documentation template : 
https://gist.github.com/iros/3426278
https://github.com/Sursev07/documentation-example