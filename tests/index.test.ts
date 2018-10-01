const url = require('url');
const http = require('http');

const baseHtmlResponse = require('./utils/baseHtmlResponse.js');
const shippingBaseResponse = require('./utils/shippingBaseResponse.js');

/**
 * Init the global object to be able to access
 */
const globalAny: any = global;
globalAny.IS_DEV = global['IS_DEV'];
globalAny.Bolt = global['IS_DEV']
  ? require('../dist_temp/index.js').default
  : require('../dist/index.js').default;
globalAny.Secrets = global['IS_DEV']
  ? require('../secrets.js')
  : require('../secrets.js');

/**
 * Init the object and run the test suites
 */
beforeAll(async done => {
  /**
   * Init a server to handle the Bolt requests
   */
  http
    .createServer(async (request, response) => {
      if (request.url === '/favicon.ico') return;

      if (request.url === '/hook') {
        const aa = await globalAny.Bolt.onHookRequest();

        console.log(aa);

        response.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        return response.end();
      }

      if (request.url === '/shipping') {
        response.writeHead(200, {
          'Content-Type': 'application/json',
        });
        return response.end(JSON.stringify(shippingBaseResponse.json()));
      }

      const URL = url.parse(request.url);
      const params = new url.URLSearchParams(URL.query);
      const environment = params.get('environment');
      const orderToken = params.get('orderToken');

      if (!orderToken) {
        response.writeHead(200, {
          'Content-Type': 'text/plain; charset=utf-8',
        });
        response.write(
          'You must have an orderToken param in your URL query. ie: /?orderToken=xxxx',
        );
        return response.end();
      }

      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      response.write(
        baseHtmlResponse.html(
          environment || 'sandbox',
          globalAny.Secrets.publicKey,
          orderToken,
        ),
      );
      response.end();
    })
    .listen(9090);

  /**
   * Init the SDK once for all tests
   */
  const targetAPIKey: string = globalAny.Secrets.apiKey;
  const targetPublicKey: string = globalAny.Secrets.publicKey;
  const targetEnvironment: string = globalAny.IS_DEV ? 'sandbox' : 'production';
  globalAny.Bolt.init({
    apiKey: targetAPIKey,
    environment: targetEnvironment,
    hookURL: `https://${globalAny.Secrets.ngrokURL}/hook`,
    publicKey: targetPublicKey,
    shippingURL: `https://${globalAny.Secrets.ngrokURL}/shipping`,
  });

  console.info(globalAny.Bolt);

  done();
});

require('./cases/initialization.ts');
//require('./cases/fullOrderProcess.ts');
//import './cases/createOrder.ts';
//import './cases/sign.ts';
//import './cases/apiCalls.ts';
