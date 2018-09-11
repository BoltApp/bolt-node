const a: number = 10;

const b: (x: number) => number = (x: number): number => a + x;

module.exports = {
  a,
  b,
};
