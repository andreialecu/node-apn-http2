"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const APNNotificationBase_1 = require("./APNNotificationBase");
class APNNotification extends APNNotificationBase_1.APNNotificationBase {
    constructor(payload = {}) {
        super();
        this.payload = payload;
        this.encoding = 'utf8';
        this.compiled = null;
        this.expiry = 0;
        this.priority = 10;
        this.topic = null;
        this.collapseId = null;
        this.id = null;
    }
    headers() {
        let headers = {};
        if (this.priority !== 10) {
            headers["apns-priority"] = this.priority;
        }
        if (this.id) {
            headers["apns-id"] = this.id;
        }
        if (this.expiry > 0) {
            headers["apns-expiration"] = this.expiry;
        }
        if (this.topic) {
            headers["apns-topic"] = this.topic;
        }
        if (this.collapseId) {
            headers["apns-collapse-id"] = this.collapseId;
        }
        return headers;
    }
    compile() {
        if (!this.compiled) {
            this.compiled = JSON.stringify(this);
        }
        return this.compiled;
    }
    apsPayload() {
        var aps = this.aps;
        return Object.keys(aps).find(key => aps[key] !== undefined) ? aps : undefined;
    }
    ;
    toJSON() {
        if (this.rawPayload != null) {
            return this.rawPayload;
        }
        if (typeof this._mdm === "string") {
            return { "mdm": this._mdm };
        }
        return Object.assign({}, this.payload, { aps: this.apsPayload() });
    }
    ;
}
exports.APNNotification = APNNotification;
//# sourceMappingURL=APNNotification.js.map