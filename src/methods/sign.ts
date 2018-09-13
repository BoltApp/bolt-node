import apiCall from 'src/utils/apiCall';
import bolt from 'src/index';

/**
 * When the user wants to create an order server side
 *
 * @param orderData
 * @param callback
 */
const sign = async (callback: () => object) => {
  /**
   * Call options
   */
  const options: Bolt.IAPICallParams = {
    method: 'POST',
    path: 'merchant/sign',
    postData: JSON.stringify({
      merchant_user_id: bolt.apiKey,
    }),
  };

  /**
   * Call with callback
   * will return async callback
   */
  if (callback) return apiCall(options, callback);

  /**
   * Call without callback
   * will return synchrounousely the call response
   */
  const call = await apiCall(options);
  return call;
};

export default sign;
