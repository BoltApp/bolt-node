declare namespace Bolt {
  export interface IBoltConfig {
    apiKey: string;
    environment: 'sandbox' | 'production';
    signingSecret: string;
  }
}
