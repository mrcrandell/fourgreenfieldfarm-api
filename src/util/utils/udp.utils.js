/* eslint-disable no-underscore-dangle */
const dgram = require('dgram');
const util = require('util');

module.exports.client = (host, port) => {
  const client = dgram.createSocket('udp4');
  const returnObj = { client };
  const send = util.promisify(client.send).bind(client);
  returnObj.send = async (message) => {
    const messageBuffer = Buffer.from(message);
    return send(messageBuffer, 0, messageBuffer.length, port, host);
  };
  return returnObj;
};

module.exports.server = () => {
  const server = dgram.createSocket('udp4');

  server.bind(process.env.UDP_PORT || 3802);

  return server;
};

// const udpServer = module.exports.server();

// udpServer.on('message', function message(msg, rinfo) {
//   console.log(`UDP: message: ${msg.toString()} from ${rinfo.address}:${rinfo.port}`);
// });

// udpServer.on('error', function error(err) {
//   console.error(err.message);
//   //   udpServer.close();
// });

// udpServer.on('listening', function listening() {
//   const address = udpServer.address();
//   console.log(`UDP: server listening ${address.address}:${address.port}`);
// });
