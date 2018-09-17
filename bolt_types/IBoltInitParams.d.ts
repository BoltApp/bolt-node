declare namespace Bolt {
  export interface IBoltInitParams {
    readonly apiKey: string;
    readonly version?: string;
    readonly environment: 'sandbox' | 'production';
    readonly publicKey: string;
  }
}
