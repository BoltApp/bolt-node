const http = require('http');
const { promisify } = require('util');

/**
 * Switch script origin depending on dev / prod env
 */
global.Bolt = global.IS_DEV
  ? require('../dist_temp/index.js').default
  : require('../dist/index.js').default;

/**
 * Get secrets
 */

global.Secrets = global.IS_DEV
  ? require('../secrets.js')
  : require('../secrets.js');

/**
 * Get the tunnel URL from the local server
 */
const getTunnelURL = () =>
  new Promise((resolve, reject) => {
    http.get('http://localhost:9090/tunnel', (response, request) => {
      if (!response.headers['x-tunnelur']) reject();
      resolve(response.headers['x-tunnelur']);
    });
  });

/**
 * Init the object and run the test suites
 */
beforeAll(done => {
  http.get('http://localhost:9090/tunnel', response => {
    if (!response.headers['x-tunnelurl']) {
      throw Error(
        'Tunnel URL not found. Are your sure that you started the local server with "npm run localServer"?',
      );
    }

    /**
     * Init the SDK once for all tests
     */
    const targetAPIKey: string = global.Secrets.apiKey;
    const targetPublicKey: string = global.Secrets.publicKey;
    const targetEnvironment: string = global.IS_DEV ? 'sandbox' : 'production';
    global.Bolt.init({
      apiKey: targetAPIKey,
      environment: targetEnvironment,
      hookURL: response.headers['x-tunnelur'],
      publicKey: targetPublicKey,
    });

    console.info(global.Bolt);

    done();
  });
});

require('./cases/initialization.ts');
require('./cases/fullOrderProcess.ts');
//import './cases/createOrder.ts';
//import './cases/sign.ts';
//import './cases/apiCalls.ts';
