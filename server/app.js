const express = require('express')
const app = express()
const PORT = 3000
const router = require('./routes/index')

// body parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(router)
// app.get('/', (req, res) => {
//   res.status(200).json({
//     msg: 'masuk di app.get'
//   })
// })

app.listen(PORT, ()=>{
  console.log('this app running on port:', PORT);
})