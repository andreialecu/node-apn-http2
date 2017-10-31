import { APNNotification } from './APNNotification';
import { AuthToken } from './Token';
import { TokenOptions } from './TokenOptions';
import { Http2Session, ClientHttp2Session } from 'http2';
import * as http2 from 'http2';

export interface APNProviderOptions {
  token: TokenOptions,
  production?: boolean
}

let AuthorityAddress = {
  production: "https://api.push.apple.com:443",
  development: "https://api.development.push.apple.com:443"
};

export class APNPushProvider {
  private authToken: AuthToken;
  private session: ClientHttp2Session;

  constructor(private options: APNProviderOptions) {
    this.authToken = new AuthToken(options.token);
    if (typeof options.production == 'undefined' || options.production === null) {
      options.production = process.env.NODE_ENV === "production";
    }
  }

  private ensureConnected() {
    if (!this.session || this.session.destroyed) {
      this.session = http2.connect(this.options.production ? AuthorityAddress.production : AuthorityAddress.development);
    }
  }
  
  send(notification: APNNotification, deviceTokens: string[] | string) {
    this.ensureConnected();

    if (!Array.isArray(deviceTokens)) {
      deviceTokens = [deviceTokens];
    }

    return Promise.all(deviceTokens.map(deviceToken => {
      var headers = {
        ':method': 'POST',
        ':path': '/3/device/' + deviceToken,
        'authorization': 'bearer ' + this.authToken.generate(),
      };

      headers = Object.assign(headers, notification.headers());

      return this.sendPostRequest(headers, notification.compile());
    }))
  }

  private sendPostRequest(headers, payload) {
    return new Promise((resolve, reject) => {
      var req = this.session.request(headers);

      req.setEncoding('utf8');

      req.on('response', (headers) => {
        let status = headers[http2.constants.HTTP2_HEADER_STATUS];
        // ...
        let data = '';
        req.on('data', (chunk) => {
          data += chunk;
        });
        req.on('end', () => {
          resolve({status: status, body: data});
        })
      });

      req.on('error', (err) => {
        reject(err);
      })
  
      req.write(payload);
      req.end();
    });
  }

  shutdown() {
    this.session.destroy();
  }
}