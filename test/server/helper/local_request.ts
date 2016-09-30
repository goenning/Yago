import * as request from "request";
import { IncomingMessage } from "http";

export interface HttpResult {
  body: any;
  response: IncomingMessage;
}

export function post(url: string, data?: {}): Promise<HttpResult> {
  return new Promise<HttpResult>((resolve, reject) => {
    request.post(`http://localhost:8888${url}`, { json: data }, (err, response, body) => {
      if (err)
        reject(err);
      return resolve({ response, body });
    });
  });
}