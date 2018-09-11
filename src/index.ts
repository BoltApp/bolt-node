const ten: number = 10;

const addTen: (x: number) => number = (x: number): number => ten + x;

const testItem: Bolt.IItem = {
  description: 'a',
  quantity: 1,
  total_amount: 10,
  unit_price: 10,
};

module.exports = {
  addTen,
  ten,
};
