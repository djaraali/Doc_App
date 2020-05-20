const Joi = require('@hapi/joi')

const schema = Joi.object().keys({
    specialist: Joi.string(),
    about: Joi.string(),
    firstname: Joi.string(),
    lastname: Joi.string(),
    profile: Joi.string(),
})

module.exports = schema;