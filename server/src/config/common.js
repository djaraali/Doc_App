const joi = require('@hapi/joi')

const envVarsSchema = joi.object({
    NODE_ENV: joi.string()
        // .allow(['development', 'production', 'test', 'provision'])
        .required(),
    STATIC: joi.string()
        .required(),
}).unknown()
    .required()

const { error, value: envVars } = envVarsSchema.validate(process.env)
if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const config = {
    env: envVars.NODE_ENV,
    staticUrl: envVars.STATIC,
}

module.exports = config