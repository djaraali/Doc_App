const Joi = require('@hapi/joi')

module.exports = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body);
        console.log("result", result)
        
        if (result.error) {
            return res.status(400).json(result.error);
        }
        req['body'] = result.value;
        next();
    }
}