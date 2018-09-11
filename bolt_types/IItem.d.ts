declare namespace Bolt {
  export interface IItem {
    brand?: string;
    category?: string;
    color?: string;
    description: string;
    image_url?: string;
    isbn?: string;
    manufacturer?: string;
    name?: string;
    options?: string;
    quantity: number;
    reference?: string;
    size?: string;
    sku?: string;
    tags?: string;
    total_amount: number;
    type?: 'digital' | 'physical';
    unit_price: number;
    uom?: string;
    upc?: string;
    weight_unit?: string;
    weight?: number;
  }
}
