Bolt node.js library

## Usage

### Call POST order API

```
var boltClient = require('boltpay')({
    apiKey: 'API_KEY',
    environment: 'sandbox'
});
var orderToken = boltClient.createOrder({
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
});
```

### Verify signature

```
var boltClient = require('boltpay')({
    signingSecret: 'SIGNING_SECRET',
});
var verified = boltClient.verifySignature(body, hmac);
```
