/// <reference types="node" />
import { TokenOptions } from './TokenOptions';
export declare class AuthToken {
    private options;
    private keyData;
    constructor(options: TokenOptions);
    getKeyData(options: TokenOptions): string | Buffer;
    generate(): string;
}
