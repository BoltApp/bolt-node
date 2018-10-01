module.exports = {
  html: (
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
</body></html>`,
};
