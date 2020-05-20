const jwt = require("jsonwebtoken");
const config = require('../config/config')

/**
 * returns the jwt token
 * 
 * @returns {string} the jwt token
 */
module.exports = (user) => {
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        config.jwt.accessTokenSecret,
        {
            expiresIn: config.jwt.accessTokenLife
        }
    );

    return token;
}