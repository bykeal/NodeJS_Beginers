class CustomError extends Error{
    constructor(message, statusCode){
        super(message);
        this.name = this.constructor.name;
        this.status = statusCode || 400;
    }
}

module.exports = CustomError;