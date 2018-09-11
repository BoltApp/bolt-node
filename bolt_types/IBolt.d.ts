declare namespace Bolt {
  export interface IBolt {
    readonly apiKey?: string;
    readonly baseUrl?: string;
    public readonly init: () => void;
  }
}
