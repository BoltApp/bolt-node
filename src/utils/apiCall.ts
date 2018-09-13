import bolt from 'src/index';
import https from 'https';
import http from 'http';
import crypto from 'crypto';

const apiCall = (
  callParams: Bolt.IAPICallParams,
  callBack?: (content: object) => void,
  method = callParams.method || 'GET',
  path = callParams.path,
  postData = callParams.postData || JSON.stringify(''),
): Promise<object> | void => {
  /**
   * Check params
   */
  if (!path) {
    throw new Error('To make an api call, you need to define a path.');
  }

  const options: http.RequestOptions = {
    hostname: bolt.hostname || '',
    method: method,
    path: `/${bolt.version}/${path}`,
    port: 443,
  };

  if (method !== 'GET') {
    options.headers = {
      'Content-Length': postData.length,
      'Content-Type': 'application/json',
      'X-Api-Key': bolt.apiKey,
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
