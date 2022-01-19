class CustomError extends Error{
    constructor(message, statuscode){
        super(message);
        this.name = this.constructor.name;
        this.status = statuscode || 400;
    }
}

module.exports = new CustomError();