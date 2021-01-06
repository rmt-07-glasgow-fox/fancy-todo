function errorHandler (err, req, res, next) {
  let { code, msg, origin } = err
  switch (code) {
    case 400 :
      res.status(code).json({ message: msg})
      break;
    case 401 :
      if (origin === 'authenticate') res.status(code).json({ message: "Please Login First"})
      else if (origin === 'user') res.status(code).json({ message: "Invalid Username / Password"})
      else res.status(code).json({ message: "Unauthorize Data" })
      break;
    case 404 :
      res.status(code).json({ message: "Data Not Found"})
      break;
    default :
      res.status(code).json({ message: "Internal Server Error"})
      break;
  }
}

module.exports = {
  errorHandler
}