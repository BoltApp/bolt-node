import request from "request-promise-native";
import { IOrder } from "./model/order";

export class ApiClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(apiKey: string, env: "sandbox" | "production") {
    this.apiKey = apiKey;
    this.baseUrl = getBaseUrl(env);
  }

  public async createOrder(order: IOrder) {
    return request({
       url: `${this.baseUrl}merchant/orders`, 
       headers: this.createHeader(),
       body: order,
    });
  }

  private createHeader() {
    return {
      "X-Api-Key": this.apiKey,
      "X-Nonce": this.generateNonce(16),
      "Content-Type": "application/json",
    }
  }

  private generateNonce(size: number) {
    let nonce = "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < size; i++) {
      nonce += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return nonce;
  }
}

function getBaseUrl(env: "sandbox" | "production") {
  switch (env) {
    case "sandbox":
      return "http://api-sandbox.bolt.com/v1/";
    case "production":
      return "http://api.bolt.com/v1/";
    default:
      const _neverHappensInExhaustiveSwitch: never = env;
      return _neverHappensInExhaustiveSwitch;
  }
}