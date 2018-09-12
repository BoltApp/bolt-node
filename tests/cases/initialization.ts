const Bolt = global.Bolt;

describe('Test the initialization function', () => {
  /**
   * The SDK must throw errors when improper
   * parametters are passed on initialization
   */
  test('Init with no apiKey or non string apiKey.', () => {
    const errorInitNoKey = () => Bolt.init({});
    expect(errorInitNoKey).toThrow(Error);

    const errorInitWrongKey = () => Bolt.init({ apiKey: 10 });
    expect(errorInitWrongKey).toThrow(Error);
  });

  /**
   * Init the SDK once for all tests
   */
  Bolt.init({
    apiKey: '1234',
  });

  /**
   * Check the values after init
   */
  test('Check initialization values.', () => {
    expect(Bolt.apiKey).toBe('1234');
    expect(Bolt.environment).toBe('sandbox');
  });

  /**
   * The user cannot init the SDK more than once
   */
  test('Check initialization unicity.', () => {
    const tryInitAgain = () => Bolt.init({ apiKey: '12345' });
    expect(tryInitAgain).toThrow(Error);
  });

  /**
   * The values passed during init cannot be changed
   */
  test('Check initialization values imutability.', () => {
    const tryRedefineProp1 = () => {
      Bolt.apiKey = '5678';
    };
    expect(tryRedefineProp1).toThrow(TypeError);

    const tryRedefineProp2 = () => {
      Object.defineProperty(Bolt, 'apiKey', { value: '5678' });
    };
    expect(tryRedefineProp2).toThrow(TypeError);

    const tryRedefineProp3 = () => {
      Bolt.environment = 'production';
    };
    expect(tryRedefineProp3).toThrow(TypeError);

    const tryRedefineProp4 = () => {
      Object.defineProperty(Bolt, 'environment', { value: 'production' });
    };
    expect(tryRedefineProp4).toThrow(TypeError);

    expect(Bolt.apiKey).toBe('1234');
    expect(Bolt.environment).toBe('sandbox');
  });
});
