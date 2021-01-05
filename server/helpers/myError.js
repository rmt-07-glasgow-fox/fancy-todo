class MyError extends Error {
    constructor(args, customName) {
        super(args, customName) 
        this.name = customName;
    }
}

module.exports = {
    MyError
};