import apiCall from 'src/utils/apiCall';

/**
 * When the user wants to fetch a transaction
 *
 * @param orderData
 * @param callback
 */
const fetchTransaction = async (reference: string, callback?: () => object) => {
  /**
   * Call options
   */
  const options: Bolt.IAPICallParams = {
    method: 'GET',
    path: `merchant/transactions/${reference}`,
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

export default fetchTransaction;
