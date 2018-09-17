const Bolt = global.Bolt;

/**
 * The Bolt.sign method should return a body like that one:
 *
 *  {
 *    merchant_user_id: 'xxxx',
 *    signature: 'xxxx',
 *    nonce: 'xxxx'
 *  }
 */
describe('Test the signing process.', async () => {
  test('Synchronous request sign', async () => {
    expect.assertions(5);
    const response = await Bolt.sign();

    expect(response.statusCode).toStrictEqual(200);
    expect(response).toHaveProperty('body');
    expect(response.body).toHaveProperty('merchant_user_id');
    expect(response.body).toHaveProperty('signature');
    expect(response.body).toHaveProperty('nonce');
  });
});
