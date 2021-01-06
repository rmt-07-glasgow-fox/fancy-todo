const errorandlers = (err, req, res, next)=> {
    let status = err.status || 500
    let msg = err.msg || 'Internal Server Error'
    console.log(err);
    if (err.name=== 'SequelizeValidationError'){
        let errors = []
        console.log(err);
        err.errors.forEach(el => {
            errors.push(el.message)
        });
        status = 400
        msg = errors
    }else if(err.name ==='SequelizeUniqueConstraintError'){
        let errors = []
        
        err.errors.forEach(el => {
            if(el.message == 'email must be unique'){
                errors.push('Email already exists')
            }
        });
        status = 400
        console.log(errors);
        msg = errors
    }else if(err.msg ==='Not Authorize'){
        msg = err.msg
        status = 401
    }
    else if(err.msg ==='Authentication failed'){
        msg = err.msg
        status = 401
    }
    else if(err.msg ==='Content Not Found'){
        msg = 'Not Found'
        status = 404
    }
    
    res.status(status).json({
        msg
    })
}

module.exports = errorandlers