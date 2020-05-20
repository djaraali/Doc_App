const jwt = require('jsonwebtoken');
const config = require('../config/config')

module.exports = (token) => {
    try{
        const decoded = jwt.verify(token, config.jwt.accessTokenSecret);
        return decoded;
    } catch (error) {
        console.log("TCL: error", error)
    };
}