const http = require('http');
const localtunnel = require('localtunnel');

const createTunnel = () =>
  new Promise(resolve => {
    localtunnel(8090, function(err, tunnel) {
      resolve(tunnel);
    });
  });

(async () => {
  var tunnel = await createTunnel();

  tunnel.on('close', () => {
    console.log('close');
  });

  tunnel.on('request', (a, b, c) => {
    console.log('request');
    console.log(a, b, c);
  });

  tunnel.on('error', () => {
    console.log('error');
  });

  console.log(tunnel);

  const server = http
    .createServer((req, res) => {
      console.log(req);

      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.write('hello');
      res.end();
    })
    .listen(8090);
})();
