module.exports = {
    errorHandler: (err, req, res, next) => {
        let errors = err;

        switch(errors.name) {
            case "SequelizeValidationError":
                res.status(400).json({ message: 'Validation error' });
            break;

            case "SequelizeUniqueConstraintError":
                res.status(400).json({ message: 'Validation error' });
            break;
            
            case "InvalidEmailPassword":
                res.status(400).json({ message: errors.message })
            break;

            case "JsonWebTokenError":
                res.status(400).json({message: errors.message})
            break

            case "InvalidPassword":
                res.status(400).json({message: errors.message})
            break;
            
            case "IdNotFound":
                res.status(404).json({message: errors.message});
            break;

            case "SequelizeDatabaseError":
                res.status(500).json({ message: "Internal server error" });
            break

            default:
                res.status(500).json({ message: "Error" });
        }
    }
}       
  