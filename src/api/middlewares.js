/* eslint-disable global-require, import/no-dynamic-require */
const fs = require('fs');

const middlewares = {};
middlewares['validator'] = require('./middlewares/validator.middlewares');

module.exports = middlewares;
