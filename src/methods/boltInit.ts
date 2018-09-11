const freezedPropertiesParametters = {
  configurable: false,
  enumerable: true,
  writable: false,
};

const init = (
  bolt: Bolt.IBolt,
  params: { apiKey: string; baseUrl: string },
): void => {
  //console.log(params);

  return Object.defineProperties(bolt, {
    apiKey: {
      ...freezedPropertiesParametters,
      value: params.apiKey,
    },
    baseUrl: {
      ...freezedPropertiesParametters,
      value: params.baseUrl,
    },
  });
};

export default init;
