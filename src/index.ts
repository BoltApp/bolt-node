import boltInit from 'src/methods/boltInit';
import createOrder from 'src/methods/createOrder';

const bolt: Bolt.IBolt = {
  apiKey: 'string',
  baseUrl: 'string',
  createOrder,
  init: (params: Bolt.IBoltInitParams): void => boltInit(bolt, params),
  isInitialized: false,
};

export default bolt;
