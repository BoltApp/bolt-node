declare namespace Bolt {
  export interface ISecrets {
    readonly apiKey: string;
    readonly ngrokToken: string;
    readonly ngrokURL: string;
    readonly publicKey: string;
    readonly signingSecret: string;
  }
}
