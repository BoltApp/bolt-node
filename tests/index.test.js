const Bolt = require('../dist_temp/index.js').Bolt;

test('Must success', () => {
  expect(Bolt.addTen(10)).toBe(20);
});
