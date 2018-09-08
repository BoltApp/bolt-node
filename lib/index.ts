import { IBoltConfig } from "./config";
import { ApiClient } from "./api/client";

const bolt = (config: IBoltConfig) => {
  return new ApiClient(config.apiKey, config.environment);
}

export default bolt;