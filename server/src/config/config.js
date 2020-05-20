// config/config.js
'use strict'

const common = require('./common')
const logger = require('./logger')
const db = require('./db')
const server = require('./server')
const jwt = require('./jwt')

module.exports = Object.assign({}, common, logger, db, server, jwt);
