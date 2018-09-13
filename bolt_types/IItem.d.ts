declare namespace Bolt {
  export interface IItem {
    // Brand
    brand?: string;
    // Color
    color?: string;
    // Item description
    description?: string;
    // Image thumbnail URL
    image_url?: string;
    // ISBN(International Standard Book Number) code
    isbn?: string;
    // Manufacturer
    manufacturer?: string;
    // Item name
    name: string;
    // Miscellaneous options(ex.Limited edition)
    options?: string;
    // Quantity
    quantity: number;
    // Unique cart item id
    reference?: string;
    // Size
    size?: string;
    // SKU
    sku?: string;
    // Unit Price * quantity
    total_amount: number;
    // Type of the item(physical or digital)
    type?: 'digital' | 'physical';
    // Cost of a single item
    unit_price: number;
    // UOM(Unit of Measure) Code
    uom?: string;
    // UPC(Universal Product Code)
    upc?: string;
    // Weight Unit
    weight_unit?: string;
    // Weight as an integer
    weight?: number;
  }
}
