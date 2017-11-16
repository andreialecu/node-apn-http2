"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const fs = require("fs");
class AuthToken {
    constructor(options) {
        this.options = options;
        this.keyData = this.getKeyData(options);
    }
    getKeyData(options) {
        if (!options.key) {
            return options.key;
        }
        if (typeof options.key === 'string' && /-----BEGIN ([A-Z\s*]+)-----/.test(options.key)) {
            return options.key;
        }
        else if (Buffer.isBuffer(options.key)) {
            return options.key;
        }
        else {
            return fs.readFileSync(options.key);
        }
    }
    generate() {
        return jwt.sign({}, this.keyData, {
            algorithm: "ES256",
            issuer: this.options.teamId,
            header: { kid: this.options.keyId }
        });
    }
}
exports.AuthToken = AuthToken;
//# sourceMappingURL=Token.js.map