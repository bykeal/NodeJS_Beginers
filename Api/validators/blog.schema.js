const Joi = require('joi');

const blogSchema = Joi.object({
    title : Joi.string().required(),
    description : Joi.string().required(),
    author: Joi.string().required()
});

module.exports = {
    blogSchema
}