class CustomError extends Error{
    constructor(message, statuscode){
        super(message);
        this.name = 'CustomError';
        this.status = statuscode || 400;
    }
}

module.exports = new CustomError();