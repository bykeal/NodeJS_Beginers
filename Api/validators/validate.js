const customError = require("../utils/custom.error");

module.exports = (schema) => async (req,res,next)=>{
    const {title, description} = req.body;
    const user = res.locals.author;
    console.log("user...............",user);
    const errors = validate({title:title, author: user, description: description} || {}, schema);
    if(errors && errors.length > 0){
        throw new customError(errors);
    }
    next()
}


const validate = (data, schema) => {
    const {error} = schema.validate(data);
    if(!error) return;
    return error.details[0];
}