const customError = require("../utils/custom.error");

module.exports = (schema) => async (req,res,next)=>{
    const errors = validate(req.body || {}, schema);
    if(errors && errors.length > 0){
        throw new customError(errors[0]);
    }
    next(errors)
}


const validate = (data, schema) => {
    const {error} = schema.validate(data);
    if(!error) return;
    return error.details[0];
}