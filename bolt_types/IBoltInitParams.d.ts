declare namespace Bolt {
  export interface IBoltInitParams {
    readonly apiKey: string;
    readonly environment: 'sandbox' | 'production';
    readonly hookURL?: string;
    readonly publicKey: string;
    readonly shippingURL: string;
    readonly version?: string;
  }
}
