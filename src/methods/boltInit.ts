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
): void => {
  /**
   * If the API has already been initialized, stops here.
   */
  if (bolt.isInitialized) {
    throw new Error('Bolt has already been initialized.');
  }

  const { apiKey } = params;

  /**
   * Force check the apiKey param
   */
  if (!apiKey || typeof apiKey !== 'string') {
    throw new Error('Bolt need a valid apiKey to initialize.');
  }

  return Object.defineProperties(bolt, {
    apiKey: {
      ...freezedPropertiesParametters,
      value: apiKey,
    },
    baseURL: {
      ...freezedPropertiesParametters,
      value:
        environment === 'sandbox'
          ? values.SANDBOX_BASE_URL
          : values.PRODUCTION_BASE_URL,
    },
    environment: {
      ...freezedPropertiesParametters,
      value: environment,
    },
    isInitialized: {
      ...freezedPropertiesParametters,
      value: true,
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
