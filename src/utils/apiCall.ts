import bolt from 'src/index';
import https from 'https';
import http from 'http';
import crypto from 'crypto';

/**
 * Calls to the Bolt APIs
 *
 * @param {Bolt.IAPICallParams} callParams
 * @returns {(Promise<object> | void)}
 */
const apiCall = (
  callParams: Bolt.IAPICallParams,
  callBack?: (content: object) => void,
  method: string = callParams.method || 'GET',
  path: string = callParams.path,
  postData: string = callParams.postData || JSON.stringify(''),
  hmacToVerify: string | null = callParams.hmacToVerify || null,
): Promise<object> | void => {
  /**
   * Check params
   */
  if (!path) {
    throw new Error('To make an api call, you need to define a path.');
  }

  /**
   * Check that the data to post are valid
   */
  try {
    JSON.parse(postData);
  } catch {
    throw new Error(
      'You tried o make an api call with an invalid JSON payload.',
    );
  }

  /**
   * Build the call options
   */
  const options: http.RequestOptions = {
    hostname: bolt.hostname || '',
    method: method,
    path: `/${bolt.version}/${path}`,
    port: 443,
  };

  /**
   * Add headers and nonce if POST or PUT
   */
  if (method !== 'GET') {
    options.headers = {
      'Content-Length': postData.length,
      'Content-Type': 'application/json',
      'X-Api-Key': bolt.apiKey,
      'X-Nonce': crypto.randomBytes(7).toString('hex'),
    };
  }

  /**
   * If this is a verify call, add the Hmac in the headers
   */
  if (hmacToVerify) {
    options.headers = {
      'X-Api-Key': bolt.apiKey,
      'X-Bolt-Hmac-Sha256': hmacToVerify,
      'X-Nonce': crypto.randomBytes(7).toString('hex'),
    };
  }

  /**
   * Call with callback
   */
  if (callBack) {
    const req = https.request(options, originalResponse => {
      const response: Bolt.IAPIResponse = {
        body: '',
        headers: originalResponse.headers,
        statusCode: originalResponse.statusCode,
      };
      originalResponse.setEncoding('utf8');
      originalResponse.on('data', (chunk: string) => {
        response.body += chunk;
      });
      originalResponse.on('end', () => {
        try {
          response.body = JSON.parse(String(response.body));
        } catch {}
        callBack(response);
      });
    });
    req.on('error', (error: object) => {
      callBack(error);
    });
    req.write(postData);
    req.end();
    return;
  }

  /**
   * Call without callback
   */
  return new Promise((resolve, reject) => {
    const req = https.request(options, originalResponse => {
      const response: Bolt.IAPIResponse = {
        body: '',
        headers: originalResponse.headers,
        statusCode: originalResponse.statusCode,
      };
      originalResponse.setEncoding('utf8');
      originalResponse.on('data', (chunk: string) => {
        response.body += chunk;
      });
      originalResponse.on('end', () => {
        try {
          response.body = JSON.parse(String(response.body));
        } catch {}
        resolve(response);
      });
    });
    req.on('error', (error: object) => {
      reject(error);
    });
    req.write(postData);
    req.end();
  });
};

export default apiCall;
