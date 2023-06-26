/* eslint-disable global-require, import/no-dynamic-require */
const fs = require('fs');

const models = {};
const associations = {};

fs.readdirSync(`${__dirname}/models`).forEach(function load(file) {
  console.log(`DATABASE: Loading model: ${file}`);
  const modelObject = require(`./models/${file}`);
  models[file.split('.')[0]] = modelObject.model;
  associations[file.split('.')[0]] = modelObject.applyAssociations;
});

Object.values(associations).forEach((association) => {
  if (typeof association === 'function') {
    association(models);
  }
});

module.exports = models;
