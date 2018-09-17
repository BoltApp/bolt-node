import values from 'src/configuration';

/**
 * Initialize Bolt node SDK
 *
 * @param bolt
 * @param params
 */
const init = (
  bolt: Bolt.IBolt,
  params: Bolt.IBoltInitParams,
  environment: string = (params || {}).environment || 'sandbox',
  version: string = 'v1',
  apiKey: string = (params || {}).apiKey,
  hookURL: string | null = (params || {}).hookURL || null,
  publicKey: string = (params || {}).publicKey,
): void => {
  /**
   * If the API has already been initialized, stops here.
   */
  if (bolt.isInitialized) {
    throw new Error('Bolt has already been initialized.');
  }

  /**
   * Force check the apiKey param
   */
  if (!apiKey || typeof apiKey !== 'string') {
    throw new Error('Bolt need a valid apiKey to initialize.');
  }

  /**
   * Force check the publicKey param
   */
  if (!publicKey || typeof publicKey !== 'string') {
    throw new Error('Bolt need a valid publicKey to initialize.');
  }

  return Object.defineProperties(bolt, {
    apiKey: {
      ...freezedPropertiesParametters,
      value: apiKey,
    },
    environment: {
      ...freezedPropertiesParametters,
      value: environment,
    },
    hookURL: {
      ...freezedPropertiesParametters,
      value: hookURL,
    },
    hostname: {
      ...freezedPropertiesParametters,
      value:
        environment === 'sandbox'
          ? values.SANDBOX_BASE_URL
          : values.PRODUCTION_BASE_URL,
    },
    isInitialized: {
      ...freezedPropertiesParametters,
      value: true,
    },
    publicKey: {
      ...freezedPropertiesParametters,
      value: publicKey,
    },
    version: {
      ...freezedPropertiesParametters,
      value: version,
    },
  });
};

export default init;

/**
 * The values are freezed at initialization
 */
const freezedPropertiesParametters = {
  configurable: false,
  enumerable: true,
  writable: false,
};
