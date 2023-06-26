/* eslint-disable global-require, import/no-dynamic-require */
module.exports = {};

module.exports.util = require('util');

module.exports['auth'] = require(`./utils/auth.utils`);
module.exports['jwt'] = require(`./utils/jwt.utils`);
module.exports['udp'] = require(`./utils/udp.utils`);
module.exports['validator'] = require(`./utils/validator.utils`);
