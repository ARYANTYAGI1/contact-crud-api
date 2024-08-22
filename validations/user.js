const Joi = require('joi');

module.exports = {
    registerValidation: Joi.object({
        name: Joi.string().optional().allow(''),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(8).required()
    }),
    loginValidation: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
}