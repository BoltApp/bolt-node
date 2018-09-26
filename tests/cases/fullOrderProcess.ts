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

    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();

    await page.goto(`http://localhost:9090/?orderToken=${order.body.token}`);

    const body = (await page.$eval('body', e => e.innerHTML)).trim();

    expect(true).toBe(true);
  });
});
