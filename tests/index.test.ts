import Bolt from '../dist_temp/index.js';

Bolt.addTen(10);

test('Must success', () => {
  expect(Bolt.addTen(10)).toBe(20);
});
