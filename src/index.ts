import boltInit from './methods/boltInit';

const bolt: Bolt.IBolt = {
  apiKey: 'string',
  baseUrl: 'string',
  init: params => boltInit(bolt, params),
};

export default bolt;
