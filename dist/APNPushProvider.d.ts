import { APNNotification } from './APNNotification';
import { TokenOptions } from './TokenOptions';
export interface APNProviderOptions {
    token: TokenOptions;
    production?: boolean;
    hideExperimentalHttp2Warning?: boolean;
}
export interface APNSendResult {
    sent: Array<string>;
    failed: Array<{
        device: string;
        status?: string;
        response?: any;
        error?: any;
    }>;
}
export declare class APNPushProvider {
    private options;
    private authToken;
    private session;
    private _lastToken;
    private _lastTokenTime;
    constructor(options: APNProviderOptions);
    private ensureConnected();
    private getAuthToken();
    send(notification: APNNotification, deviceTokens: string[] | string): Promise<APNSendResult>;
    private sendPostRequest(headers, payload, deviceToken);
    shutdown(): void;
}
