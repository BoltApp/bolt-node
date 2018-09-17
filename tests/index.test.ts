/**
 * Switch script origin depending on dev / prod env
 */
global.Bolt = global.IS_DEV
  ? require('../dist_temp/index.js').default
  : require('../dist/index.js').default;
const Bolt = global.Bolt;

/**
 * Get secrets
 */
global.Secrets = global.IS_DEV
  ? require('../secrets.js')
  : require('../secrets.js');

/**
 * Init the object and run the test suites
 */
const localtunnel = require('localtunnel');
const createTunnel = () =>
  new Promise(resolve => {
    localtunnel(7575, (err, tunnel) => {
      resolve(tunnel);
    });
  });

const http = require('http');

beforeAll(async () => {
  /**
   * Init the SDK once for all tests
   */
  return createTunnel().then(tunnel => {
    console.log(tunnel);
    const targetAPIKey: string = global.Secrets.apiKey;
    const targetPublicKey: string = global.Secrets.publicKey;
    const targetEnvironment: string = global.IS_DEV ? 'sandbox' : 'production';
    Bolt.init({
      apiKey: targetAPIKey,
      environment: targetEnvironment,
      hookURL: tunnel.url,
      publicKey: targetPublicKey,
    });

    return console.log(Bolt);
  });
});

require('./cases/initialization.ts');

//import './cases/fullOrderProcess.ts';
//import './cases/createOrder.ts';
//import './cases/sign.ts';
//import './cases/apiCalls.ts';
