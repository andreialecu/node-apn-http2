export declare class APNNotificationBase {
    aps: {
        alert: {
            title?: string;
            subtitle?: string;
            action?: string;
            body: string;
        };
        category: string;
        badge: number;
        sound: string;
    };
    _mdm: any;
    alert: any;
    body: string;
    locKey: any;
    locArgs: any;
    title: any;
    subtitle: any;
    titleLocKey: any;
    titleLocArgs: any;
    action: any;
    actionLocKey: any;
    launchImage: any;
    badge: any;
    sound: any;
    contentAvailable: any;
    mutableContent: any;
    mdm: any;
    urlArgs: any;
    category: any;
    threadId: any;
    prepareAlert(): void;
}
