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
 * Run the test suites
 */
import './cases/initialization.ts';
import './cases/createOrder.ts';
import './cases/sign.ts';
