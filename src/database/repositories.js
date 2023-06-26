/* eslint-disable global-require, import/no-dynamic-require */
const fs = require('fs');

const repositories = {};

fs.readdirSync(`${__dirname}/repositories`).forEach(function load(file) {
  console.log(`DATABASE: Loading repository: ${file}`);
  const repositoryObject = require(`./repositories/${file}`);
  repositories[file.split('.')[0]] = repositoryObject;
});

module.exports = repositories;
