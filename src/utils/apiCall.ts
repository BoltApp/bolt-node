import bolt from 'src/index';
import https from 'https';

const apiCall = () => {
  //console.log('apicall');

  const postData = JSON.stringify({
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

const options = {
  headers: {
    'Content-Length': postData.length,
    'Content-Type': 'application/json',
    'X-Api-Key': bolt.apiKey,
    'X-Nonce': 'POIUYTREDFGH',
  },
  hostname: 'api-sandbox.bolt.com',
  method: 'POST',
  path: '/v1/merchant/orders',
  port: 443,
};

  const req = https.request(options, res => {
    //console.log(`STATUS: ${res.statusCode}`);
    //console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', chunk => {
      //console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      //console.log('No more data in response.');
    });
  });

  req.on('error', e => {
    //console.log(`problem with request: ${e.message}`);
  });

  req.write(postData);
  req.end();

  return true;
};

export default apiCall;
