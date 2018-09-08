export interface IItem {
  reference?: string;
  name?: string;
  description: string;
  total_amount: number;
  unit_price: number;
  quantity: number;
  uom?: string;
  upc?: string;
  sku?: string;
  isbn?: string;
  brand?: string;
  manufacturer?: string;
  category?: string;
  options?: string;
  tags?: string;
  type?: "digital" | "physical";
  color?: string;
  size?: string;
  weight?: number;
  weight_unit?: string;
  image_url?: string;
}