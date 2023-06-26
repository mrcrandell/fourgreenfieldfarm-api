/* const controllers = {};
controllers['user'] = require(`./controllers/user.controllers`);
controllers['email'] = require(`./controllers/email.controllers`);

module.exports = controllers;
 */

/* eslint-disable global-require, import/no-dynamic-require */
const fs = require('fs');

const controllers = {};
fs.readdirSync(`${__dirname}/controllers`).forEach(function load(file) {
  console.log(`API: Loading controller: ${file}`);
  controllers[file.split('.')[0]] = require(`./controllers/${file}`);
});

module.exports = controllers;
