declare namespace Bolt {
  export interface IAPICallParams {
    readonly method: 'GET' | 'POST' | 'PUT';
    readonly path: string;
    readonly postData?: string;
    readonly hmacToVerify?: string;
  }

  export interface IAPIResponse {
    readonly statusCode: IncomingHttpStatusHeader;
    readonly headers: IncomingHttpHeaders;
    body: string | JSON;
  }
}
