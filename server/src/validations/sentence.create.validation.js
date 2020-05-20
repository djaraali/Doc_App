const Joi = require('@hapi/joi')

const schema = Joi.object().keys({
    sentence: Joi.string().required(),
})

module.exports = schema;