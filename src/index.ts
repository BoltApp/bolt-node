import boltInit from 'src/methods/boltInit';
import apiCall from 'src/utils/apiCall';
import createOrder from 'src/methods/createOrder';

const bolt: Bolt.IBolt = {
  apiCall,
  createOrder,
  init: (params: Bolt.IBoltInitParams): void => boltInit(bolt, params),
  isInitialized: false,
};

export default bolt;
