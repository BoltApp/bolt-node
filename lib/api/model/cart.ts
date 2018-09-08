import { IDiscount } from "./discount";
import { IItem } from "./item";

export interface ICart {
  order_reference: string;
  display_id?: string;
  cart_url?: string;
  // TODO: find type safe way
  currency: string;
  total_amount: number;
  items?: IItem[];
  discounts?: IDiscount[];
}