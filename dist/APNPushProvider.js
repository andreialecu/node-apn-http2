"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("./Token");
const http2 = require("http2");
let AuthorityAddress = {
    production: "https://api.push.apple.com:443",
    development: "https://api.development.push.apple.com:443"
};
class APNPushProvider {
    constructor(options) {
        this.options = options;
        this.authToken = new Token_1.AuthToken(options.token);
        if (typeof options.production == 'undefined' || options.production === null) {
            options.production = process.env.NODE_ENV === "production";
        }
    }
    ensureConnected() {
        if (!this.session || this.session.destroyed) {
            this.session = http2.connect(this.options.production ? AuthorityAddress.production : AuthorityAddress.development);
        }
    }
    send(notification, deviceTokens) {
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
        }));
    }
    sendPostRequest(headers, payload) {
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
                    resolve({ status: status, body: data });
                });
            });
            req.on('error', (err) => {
                reject(err);
            });
            req.write(payload);
            req.end();
        });
    }
    shutdown() {
        this.session.destroy();
    }
}
exports.APNPushProvider = APNPushProvider;
//# sourceMappingURL=APNPushProvider.js.map