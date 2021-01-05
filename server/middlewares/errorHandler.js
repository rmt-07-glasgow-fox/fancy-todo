function errorHandler (err, req, res, next) {
    switch (err.code) {
        case 400:
            let msg = [];

            err.msg.errors.forEach(e => {
                msg.push(e.message);
            });
            return res.status(400).json({ name: err.name, msg: msg });
        case 404:
            return res.status(404).json({ msg: err.msg });
        case 500:
            res.status(500).json('Server Error');
    }
}

module.exports = errorHandler;