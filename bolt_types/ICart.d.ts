declare namespace Bolt {
  export interface ICart {
    // TODO: find type safe way
    cart_url?: string;
    currency: string;
    discounts?: Array<Bolt.IDiscount>;
    display_id?: string;
    items?: Array<Bolt.IItem>;
    order_reference: string;
    total_amount: number;
  }
}
