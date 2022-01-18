class customError extends Error{
    constructor(message, statuscode){
        super(message);
        this.name = 'customerError';
        this.status = statuscode;
    }
}