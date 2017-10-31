import { APNNotification } from './APNNotification';
import { TokenOptions } from './TokenOptions';
export interface APNProviderOptions {
    token: TokenOptions;
    production?: boolean;
}
export declare class APNPushProvider {
    private options;
    private authToken;
    private session;
    constructor(options: APNProviderOptions);
    private ensureConnected();
    send(notification: APNNotification, deviceTokens: string[] | string): Promise<{}[]>;
    private sendPostRequest(headers, payload);
    shutdown(): void;
}
