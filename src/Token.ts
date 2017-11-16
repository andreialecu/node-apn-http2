import { TokenOptions } from './TokenOptions';
import * as jwt from "jsonwebtoken";
import * as fs from 'fs';

export class AuthToken {
  private keyData: string | Buffer;

  constructor(private options: TokenOptions) {
    this.keyData = this.getKeyData(options);
  }

  getKeyData(options: TokenOptions) {
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