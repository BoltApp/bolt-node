const ten: number = 10;

const addTen: (x: number) => number = (x: number): number => ten + x;

module.exports = {
  addTen,
  ten,
};
