const http = require('http');
const url = require('url');
const secrets = require('../secrets.js');

let server = http
  .createServer((req, res) => {
    if (req.url === '/favicon.ico') return;

    if (req.url === '/shipping') {
      res.writeHead(200, {
        'Content-Type': 'application/jon',
      });
      return res.end(JSON.stringify(shippingResponse));
    }

    const URL = url.parse(req.url);
    const params = new url.URLSearchParams(URL.query);
    const environment = params.get('environment');
    const orderToken = params.get('orderToken');

    if (!orderToken) {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.write(
        'You must have an orderToken param in your URL query. ie: /?orderToken=xxxx',
      );
      return res.end();
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write(html(environment || 'sandbox', secrets.publicKey, orderToken));
    res.end();
  })
  .listen(9090);

const shippingResponse = {
  shipping_options: [
    {
      cost: 100,
      reference: '1',
      service: 'slow boat',
      tax_amount: 7,
    },
    {
      cost: 300,
      reference: '2',
      service: 'fast boat',
      tax_amount: 21,
    },
  ],
  tax_result: {
    amount: 72,
    items: [
      {
        amount: 72,
        rate: 720,
      },
    ],
    rate: 720,
    rate_shipping: 720,
  },
};

const html = (
  environment,
  publicKey,
  orderToken,
) => `<!DOCTYPE html><html lang="en"><head></head><body>
  <script
    id="bolt-track"
    type="text/javascript"
    src="${
      environment === 'sandbox'
        ? 'https://connect-sandbox.bolt.com'
        : 'https://connect.bolt.com'
    }/track.js"
    data-publishable-key="${publicKey}">
  </script>
  <script
    id="bolt-connect"
    type="text/javascript"
    src="${
      environment === 'sandbox'
        ? 'https://connect-sandbox.bolt.com'
        : 'https://connect.bolt.com'
    }/connect.js"
    data-publishable-key="${publicKey}">
  </script>
  <div class="bolt-checkout-button"></div>

  <script>
    var cart = {
      "orderToken": "${orderToken}",
      "authcapture": true
    };

    var hints = {
        prefill: {
          firstName: "Bolt",
          lastName: "User",
          email: "email@example.com",
          phone: "1112223333",
          addressLine1: "1235 Howard St",
          addressLine2: "Unit D",
          city: "San Francisco",
          state: "California",
          zip: "94103",
          country: "US"
        }
    };

    var callbacks = {
      check: function() {
        // This function is called just before the checkout form loads.
        // This is a hook to determine whether Bolt can actually proceed
        // with checkout at this point. This function MUST return a boolean.
        return true;
      },

      onCheckoutStart: function() {
        // This function is called after the checkout form is presented to the user.
      },

      onShippingDetailsComplete: function() {
        // This function is called when the user proceeds to the shipping options page.
        // This is applicable only to multi-step checkout.
      },

      onShippingOptionsComplete: function() {
        // This function is called when the user proceeds to the payment details page.
        // This is applicable only to multi-step checkout.
      },

      onPaymentSubmit: function() {
        // This function is called after the user clicks the pay button.
      },

      success: function(transaction, callback) {
        // This function is called when the Bolt checkout transaction is successful.

        // ... Add your code here ...

        // **IMPORTANT** callback must be executed at the end of this function if 'success'
        // is defined.
        callback();
      },

      close: function() {
        // This function is called when the Bolt checkout modal is closed.
      }
    };

    BoltCheckout.configure(cart, hints, callbacks);
  </script>
</body></html>`;
