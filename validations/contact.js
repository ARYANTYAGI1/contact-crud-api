const Joi = require('joi')

module.exports = {
    addContact: Joi.object({
        name : Joi.string().optional().allow(''),
        email : Joi.string().optional().allow(''),
        mobileNumber : Joi.string().required()
    })
}