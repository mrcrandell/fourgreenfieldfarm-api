require('dotenv').config();

const httpPort = process.env.HTTP_PORT || process.env.PORT || 8080;
const http = require('http');

global.httpServer = http.createServer();
try {
  global.httpServer.on('request', require('./src/api'));
} catch (e) {
  console.error(e);
}
global.httpServer.listen(httpPort, () => {
  console.info(`HTTP: listening on *:${httpPort}`);
});
