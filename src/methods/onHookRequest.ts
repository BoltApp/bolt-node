import apiCall from 'src/utils/apiCall';

/**
 * The method when the Bolt server send a request
 * to the e-commerce website
 */
export default async (hmacToVerify, payload) => {
  /**
   * At first, we verify the request with a short API call
   */
  const callOptions: Bolt.IAPICallParams = {
    hmacToVerify: hmacToVerify,
    method: 'GET',
    path: 'merchant/verify_signature',
  };
  const verify = await apiCall(callOptions);

  console.log(verify);
  console.log(hmacToVerify);
  console.log(payload);

  return 'toto';
};

// curl --header "Content-Type: application/json" --request POST --data '{"amount": "234","currency": "USD","display_id": "66666","id": "abcd","order": "1234","reference": "AAA-AAA-AAA-AAA","source_transaction_id": "mnhku","source_transaction_reference": "uujkg","status": "completed","type": "auth"}' http://localhost:9090/hook
