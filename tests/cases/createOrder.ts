const Bolt = global.Bolt;

describe('Test the order creation', async () => {
  test('Synchronous order creation', async () => {
    expect.assertions(1);
    const response = await Bolt.createOrder(sampleOrderData);
    expect(response.statusCode).toStrictEqual(200);
  });

  // test('Promise.', () => {
  //   expect.assertions(1);
  //   return expect(Bolt.createOrder(sampleOrderData)).resolves.toEqual('salut');
  // });

  test('Asynchronous order creation', done => {
    function callback(response) {
      expect(response.statusCode).toStrictEqual(200);
      done();
    }
    Bolt.createOrder(sampleOrderData, callback);
  });
});

/**
 * Sample data for an order
 */
const sampleOrderData = JSON.stringify({
  cart: {
    currency: 'USD',
    discounts: [
      {
        amount: 1000,
        description: '10 dollars off',
        details_url: 'http://example.com/info/discount-10',
        reference: 'DISCOUNT-10',
      },
    ],
    display_id: '100104040',
    external_inputs: {},
    items: [
      {
        image_url: 'https://images.example.com/dress.jpg',
        name: 'Beaded Long Dress',
        quantity: 1,
        reference: '123ABC',
        total_amount: 50000,
        type: 'physical',
        unit_price: 50000,
      },
    ],
    order_reference: '4200',
    shipments: [
      {
        shipping_address: {
          country_code: 'US',
          first_name: 'John',
          last_name: 'Doe',
          locality: 'San Francisco',
          postal_code: '94550',
          region: 'California',
          street_address1: '123 Baker Street',
        },
      },
    ],
    tax_amount: 1000,
    total_amount: 50000,
  },
  user_note: 'Please include box',
});
