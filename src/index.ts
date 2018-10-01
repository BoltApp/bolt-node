import apiCall from 'src/utils/apiCall';
import authorize from 'src/methods/authorize';
import boltInit from 'src/methods/boltInit';
import createOrder from 'src/methods/createOrder';
import fetchTransaction from 'src/methods/fetchTransaction';
import onHookRequest from 'src/methods/onHookRequest';
import refund from 'src/methods/refund';
import review from 'src/methods/review';
import sign from 'src/methods/sign';
import voidTransaction from 'src/methods/voidTransaction';

const bolt: Bolt.IBolt = {
  apiCall,
  authorize,
  createOrder,
  fetchTransaction,
  init: (params: Bolt.IBoltInitParams): void => boltInit(bolt, params),
  isInitialized: false,
  onHookRequest,
  refund,
  review,
  sign,
  voidTransaction,
};

export default bolt;
