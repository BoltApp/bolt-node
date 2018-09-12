/**
 * Switch script origin depending on dev / prod env
 */
global.Bolt = global.IS_DEV
  ? require('../dist_temp/index.js').default
  : require('../dist/index.js').default;

import './cases/initialization.ts';
