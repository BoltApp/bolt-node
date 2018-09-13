const Bolt = global.Bolt;

console.log(Bolt);
console.log(Bolt.createOrder);
Bolt.createOrder();

describe('Test the order creation', () => {
  test('Return true.', () => {
    expect(true).toBe(true);
  });
});
