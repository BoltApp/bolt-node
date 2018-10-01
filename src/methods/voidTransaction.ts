import apiCall from 'src/utils/apiCall';

/**
 * When the user wants to void a transaction
 *
 * @param orderData
 * @param callback
 */
const voidTransaction = async (orderData: string, callback?: () => object) => {
  /**
   * Call options
   */
  const options: Bolt.IAPICallParams = {
    method: 'POST',
    path: 'merchant/transactions/void',
    postData: orderData,
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

export default voidTransaction;
