const errorHandlers = ((err, req, res, next) => {
  if (err) {
    // console.log(err.message)
    if (err.errors[0].path === 'due_date') {
      res.status(400).json({ message: err.message })
    } else {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
})

module.exports = errorHandlers