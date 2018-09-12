import boltInit from './methods/boltInit';

const bolt: Bolt.IBolt = {
  apiKey: 'string',
  baseUrl: 'string',
  init: (params: Bolt.IBoltInitParams): void => boltInit(bolt, params),
  isInitialized: false,
};

export default bolt;
