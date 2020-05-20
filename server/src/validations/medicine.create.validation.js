const Joi = require('@hapi/joi')

const schema = Joi.object().keys({
    medicine_name: Joi.string().required(),
    medicine_type: Joi.string().required(),
    strength: Joi.array().items(Joi.string()).optional(),
    image: Joi.string().optional().allow('')
})

module.exports = schema;