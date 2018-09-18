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
beforeAll(async () => {
  /**
   * Init the SDK once for all tests
   */
  const targetAPIKey: string = global.Secrets.apiKey;
  const targetPublicKey: string = global.Secrets.publicKey;
  const targetEnvironment: string = global.IS_DEV ? 'sandbox' : 'production';
  Bolt.init({
    apiKey: targetAPIKey,
    environment: targetEnvironment,
    // Manually enter your URL: run `npx lt --port 7575`
    // TODO: make the init auto
    hookURL: 'https://tricky-badger-74.localtunnel.me',
    publicKey: targetPublicKey,
  });
});

require('./cases/initialization.ts');
require('./cases/fullOrderProcess.ts');
//import './cases/createOrder.ts';
//import './cases/sign.ts';
//import './cases/apiCalls.ts';
