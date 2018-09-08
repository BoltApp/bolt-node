import { ICart } from "./cart";

export interface IOrder {
  cart: ICart;
  user_note: string;
}
