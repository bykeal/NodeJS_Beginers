class CustomError extends Error{
    constructor(message, statuscode){
        super(message);
        this.name = 'customerError';
        this.status = statuscode || 400;
    }
}

module.exports = new CustomError();