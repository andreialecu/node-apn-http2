import { APNNotificationBase } from './APNNotificationBase';
export declare class APNNotification extends APNNotificationBase {
    private payload;
    encoding: string;
    compiled: string;
    expiry: number;
    priority: number;
    topic: string;
    collapseId: string;
    id: string;
    badge: number;
    sound: string;
    rawPayload: any;
    constructor(payload?: any);
    headers(): {};
    compile(): string;
    private apsPayload();
    toJSON(): any;
}
