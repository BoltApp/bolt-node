import Bolt from '../dist_temp/index.js';

Bolt.init({
  apiKey: 'a',
  baseUrl: 'b',
});

test('Must success', () => {
  expect(20).toBe(20);
});
