module.exports = {
  json: () => ({
    shipping_options: [
      {
        cost: 100,
        reference: '1',
        service: 'slow boat',
        tax_amount: 7,
      },
      {
        cost: 300,
        reference: '2',
        service: 'fast boat',
        tax_amount: 21,
      },
    ],
    tax_result: {
      amount: 72,
      items: [
        {
          amount: 72,
          rate: 720,
        },
      ],
      rate: 720,
      rate_shipping: 720,
    },
  }),
};
