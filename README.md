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

To run the dev mode, you will need a `secrets.js` file at the root of your folder:

    /**
    * Credentials to test the application in dev mode
    *
    * /!\ Must not be commited /!\
    */
    module.exports = {
      apiKey: 'xxx',
      signingSecret:'xxx',
      publicKey:'xxx',
      ngrokURL: 'xxx',
      ngrokToken: 'xxx',
    };

Get the value for the credentials in you sandbox Bolt account: https://merchant-sandbox.bolt.com/settings

For your ngrok url and token:

- Create an account here : <https://dashboard.ngrok.com/user/signup>.
- Get your token here : <https://dashboard.ngrok.com/auth> for the ngrokToken.
- Get a payed account, go to <https://dashboard.ngrok.com/reserved> and setup a domain name (like `your-bolt-local-test-server.ngrok.io`) for the ngrokURL.
- Go to your bolt account settings : <https://merchant-sandbox.bolt.com/settings> and paste your full url (like `https://your-bolt-local-test-server.ngrok.io`)

> You can share it with other developpers. Once started, you can inspect the network on <http://127.0.0.1:4040/inspect/http>

### Run in dev

You will need 3 processes :

- Run `npm run ngrok` will launch the tunnel to expose your localhost to the web.
- Run
