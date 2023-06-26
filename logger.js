/* eslint-disable no-nested-ternary */
const { createLogger, transports, format } = require('winston');
const morgan = require('morgan');

module.exports.logger = createLogger({
  level: process.env.LOG_LEVEL,
  exitOnError: false,
  format: format.simple(),
  transports: [new transports.Console()],
  exceptionHandlers: [new transports.Console()],
});

console.log = (...args) => module.exports.logger.debug(...args);
console.debug = (...args) => module.exports.logger.debug(...args);
console.info = (...args) => module.exports.logger.info(...args);
console.warn = (...args) => module.exports.logger.warn(...args);
console.error = (...args) => module.exports.logger.error(...args);

module.exports.apache = module.exports.logger.child({ kind: 'http' });
module.exports.apache.stream = {
  write(message) {
    module.exports.apache.debug(message);
  },
};

module.exports.express = () => {
  const ignoreRoutesDefault = ['/_healthz', '/_readyz', '/favicon.ico'];
  const ignoreRouteFinal = ignoreRoutesDefault.concat();
  return morgan('combined', {
    skip: (req) => ignoreRouteFinal.includes(req.url),
    stream: module.exports.apache.stream,
  });
};
