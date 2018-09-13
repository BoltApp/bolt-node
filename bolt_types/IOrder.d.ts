declare namespace Bolt {
  export interface IOrder {
    cart: Bolt.ICart;

    // A json object containing additional data that you want to associate with the order.You can use this to send us any additional fraud signals that may help us improve your order approval rate.Ex: any unique user identifications.
    external_inputs?: object;

    // User provided note regarding order
    user_note?: string;
  }
}
