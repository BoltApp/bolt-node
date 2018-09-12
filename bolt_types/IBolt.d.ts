declare namespace Bolt {
  export interface IBolt {
    readonly apiKey?: string;
    readonly baseUrl?: string;
    readonly environment?: 'sandbox' | 'production';
    public readonly init: (params: Bolt.IBoltInitParams) => void;
    readonly isInitialized?: boolean;
  }
}
