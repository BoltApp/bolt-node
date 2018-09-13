Bolt node.js library

## Usage

### Call POST order API

```
var boltClient = require('boltpay')({
    apiKey: 'API_KEY',
    environment: 'sandbox'
});
boltClient.createOrder({
  "cart": {
    "order_reference": "12345",
    "currency": "USD",
    "total_amount": 3998,
    "items": [
      {
        "name": "Bolt shirt",
        "unit_price": 2999,
        "quantity": 2,
        "total_amount": 5998,
        "sku": "shirt123",
        "color": "Black",
        "size": "M",
        "image_url": "https://example.com/image"
      }
    ],
    "discounts": [{
      "amount": 2000,
      "description: "Code: 20OFF"
    }]
  }
}).then(function(response) {
  // handle response
}).catch(function(err) {
  // handle error
});
```

### Verify signature

```
var boltClient = require('boltpay')({
    signingSecret: 'SIGNING_SECRET',
});
var verified = boltClient.verifySignature(body, hmac);
```

## For SDK developpers

### Get started with the code

Clone the repo, `npm i` and then run two tasks:

- `npm run dev` to compile the project while developing.
- `npm run test:dev` to test on the fly while developping.

You can `ndb npm run test:dev` to get a better debugger

### Have the test running

To run the tests, you will need a `secrets.js` file at the root of your folder:

    /**
    * Credentials to test the application in dev mode
    *
    * /!\ Must not be commited /!\
    */
    module.exports = {
      apiKey: 'xxx',
      signingSecret:'xxx',
      publicKey:'xxx',
    };

Get the value for the credentials in you sandbox Bolt account: https://merchant-sandbox.bolt.com/settings
