declare namespace Bolt {
  export interface IBoltInitParams {
    readonly apiKey: string;
    readonly environment: 'sandbox' | 'production';
  }
}
