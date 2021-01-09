// https://expressjs.com/en/guide/error-handling.html
/**
 * Express errorHandler works by passing the value into the final route,
 * THEREFORE -> errorHandler should be put into the final router, after other app.use()
 *           -> ANY errors that are encountered during the controller process will be passed with ie
 *              - next(err)
 *              - next({name: "resourceNotFound"})
 *  */

function errorsHandler (err, req, res, next) {
  // check whether an error occured
  if (err) {
    switch(err.name) {
      case "SequelizeValidationError":
        console.log('SequelizeValidationError',err);
        res.status(401).json(err)
        break;
      case "SequelizeUniqueConstraintError":
        res.status(401).json(err)
        break;
      default:
        res.status(500).json(err)
    } 
  }
}

module.exports = errorsHandler