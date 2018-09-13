declare namespace Bolt {
  export interface IDiscount {
    // Discount Amount
    amount: number;
    // Discount Description
    description?: string;
    // A valid URL to the discount
    details_url?: string;
    // A unique discount identifier
    reference?: string;
  }
}
