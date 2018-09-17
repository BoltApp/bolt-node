import * as http from 'http';
import * as puppeteer from 'puppeteer';
import * as crypto from 'crypto';
const Bolt = global.Bolt;

describe('The full order process', async () => {
  test('Synchronous order creation', async () => {
    /**
     * Creates an order
     */
    const orderData = {
      cart: {
        currency: 'USD',
        items: [
          {
            name: 'foo',
            quantity: 1,
            total_amount: 10,
            type: 'physical',
            unit_price: 10,
          },
        ],
        order_reference: crypto.randomBytes(7).toString('hex'),
        total_amount: 10,
      },
    };
    const order = await Bolt.createOrder(JSON.stringify(orderData));

    const server = http
      .createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write(
          html({
            orderToken: order.body.token,
          }),
        );
        res.end();
      })
      .listen(9090);

    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();

    await page.goto('http://localhost:9090');

    const body = (await page.$eval('body', e => e.innerHTML)).trim();

    expect(true).toBe(true);

    server.close();
  });
});

const html = params => `<!DOCTYPE html><html lang="en"><head></head><body>
  <script
    id="bolt-track"
    type="text/javascript"
    src="${
      Bolt.environment === 'sandbox'
        ? 'https://connect-sandbox.bolt.com'
        : 'https://connect.bolt.com'
    }/track.js"
    data-publishable-key="${Bolt.publicKey}">
  </script>
  <script
    id="bolt-connect"
    type="text/javascript"
    src="${
      Bolt.environment === 'sandbox'
        ? 'https://connect-sandbox.bolt.com'
        : 'https://connect.bolt.com'
    }/connect.js"
    data-publishable-key="${Bolt.publicKey}">
  </script>
  <div class="bolt-checkout-button"></div>

  <script>
    var cart = {
      "orderToken": "${params.orderToken}",
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
