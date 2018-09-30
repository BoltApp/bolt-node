const http = require('http');
const { promisify } = require('util');
const globalAny: any = global;

/**
 * Switch script origin depending on dev / prod env
 */
globalAny.Bolt = globalAny.IS_DEV
  ? require('../dist_temp/index.js').default
  : require('../dist/index.js').default;

/**
 * Get secrets
 */

globalAny.Secrets = globalAny.IS_DEV
  ? require('../secrets.js')
  : require('../secrets.js');

/**
 * Init the object and run the test suites
 */
beforeAll(() => {
  /**
   * Init the SDK once for all tests
   */
  const targetAPIKey: string = globalAny.Secrets.apiKey;
  const targetPublicKey: string = globalAny.Secrets.publicKey;
  const targetEnvironment: string = globalAny.IS_DEV ? 'sandbox' : 'production';
  globalAny.Bolt.init({
    apiKey: targetAPIKey,
    environment: targetEnvironment,
    hookURL: `https://${globalAny.Secrets.ngrokURL}/hook`,
    publicKey: targetPublicKey,
    shippingURL: `https://${globalAny.Secrets.ngrokURL}/shipping`,
  });

  console.info(globalAny.Bolt);
});

require('./cases/initialization.ts');
require('./cases/fullOrderProcess.ts');
//import './cases/createOrder.ts';
//import './cases/sign.ts';
//import './cases/apiCalls.ts';
