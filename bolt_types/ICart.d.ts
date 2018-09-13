declare namespace Bolt {
  export interface ICart {
    // Alpha - numeric e - commerce unique cart id(required).Must be less than 25 characters.
    order_reference: string;
    // Alpha - numeric e - commerce unique order id that is displayed to the user
    display_id?: string;
    // A valid URL to the cart.
    cart_url?: string;
    // Total amount of the whole order
    total_amount: number;
    // Total tax amount
    tax_amount?: number;
    // 3 letter ISO currency code
    currency: string;

    // Array of discounts applied to the cart
    discounts: Array<Bolt.IDiscount>;

    // Array of shopping cart items
    items: Array<Bolt.IItem>;

    // Billing address
    billing_address?: Bolt.IClientAdress;

    // Array of shipments
    shipments: Array<{
      // Total weight of the shipment
      total_weight?: number;
      // Weight unit
      total_weight_unit?: string;
      // of the following (Unknown - 0, digital - 1, physical - 2)
      shipping_method?: 0 | 1 | 2;
      // Shipping carrier(USPS, FedEx ...)
      carrier?: string;
      // Shipping service(Priority Shipping, Ground shipping ...)
      service?: string;
      // Total cost
      cost?: number;
      // Package Type
      package_type?: number;
      // Package Width
      package_width?: number;
      // Package Height
      package_heigth?: number;
      // Package Depth
      package_depth?: number;
      // Package Dimension Unit
      package_dimension_unit?: string;
      // Package Weight
      package_weight?: number;
      // Package Weight Unit
      package_weight_unit?: string;

      // Shipping Address Object
      shipping_address?: Bolt.IClientAdress;
    }>;
  }
}
