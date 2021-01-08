const errorHandlers = ((err, req, res, next) => {
  if (err) {
    res.status(500).json({ message: 'Internal server error', err: err.message })
  } else if (err.errors[0].path === 'due_date') {
    res.status(400).json({ message: err.message })
  } else {
    res.status(400).json({ message: err.message })
  }
})

module.exports = errorHandlers