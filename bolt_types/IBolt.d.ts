declare namespace Bolt {
  export interface IBolt {
    readonly apiCall: () => Promise<object> | void;
    readonly apiKey?: string;
    readonly createOrder: () => Promise<object> | void;
    readonly hostname?: string;
    readonly environment?: 'sandbox' | 'production';
    public readonly init: (params: Bolt.IBoltInitParams) => void;
    readonly isInitialized?: boolean;
    readonly version?: string;
  }
}
