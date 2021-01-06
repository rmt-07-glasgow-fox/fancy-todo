const errorHandlers = ((err, req, res, next) => {
  if (err) {
    res.status(400).json({ message: err.message })
  } else if(err.errors[0].path === 'due_date') {
    res.status(400).json({ message: err.message })
  }
})

module.exports = errorHandlers