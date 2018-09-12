/**
 * Switch script origin depending on dev / prod env
 */
export interface IExtendedGlobal {
  Bolt: object;
  IS_DEV: boolean;
}
declare var global: IExtendedGlobal;
global.Bolt = global.IS_DEV
  ? require('../dist_temp/index.js').default
  : require('../dist/index.js').default;

import './cases/initialization.ts';
