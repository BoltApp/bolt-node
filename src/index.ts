import boltInit from 'src/methods/boltInit';
import apiCall from 'src/utils/apiCall';
import createOrder from 'src/methods/createOrder';
import sign from 'src/methods/sign';

const bolt: Bolt.IBolt = {
  apiCall,
  createOrder,
  init: (params: Bolt.IBoltInitParams): void => boltInit(bolt, params),
  isInitialized: false,
  sign,
};

export default bolt;
