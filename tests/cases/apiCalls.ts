/**
 * The API call are tested with the simple sign method
 */
const Bolt = global.Bolt;

describe('Test the api calls, synchronous and asynchronous', async () => {
  test('Synchronous request sign', async () => {
    expect.assertions(5);
    const response = await Bolt.sign();

    expect(response.statusCode).toStrictEqual(200);
    expect(response).toHaveProperty('body');
    expect(response.body).toHaveProperty('merchant_user_id');
    expect(response.body).toHaveProperty('signature');
    expect(response.body).toHaveProperty('nonce');
  });

  test('With classic promise.', () => {
    expect.assertions(1);
    return expect(Bolt.sign()).resolves.toHaveProperty('body');
  });

  test('With callback', done => {
    function callback(response) {
      expect(response.statusCode).toStrictEqual(200);
      done();
    }
    Bolt.sign(callback);
  });
});
