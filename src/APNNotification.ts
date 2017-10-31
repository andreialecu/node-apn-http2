import { APNNotificationBase } from './APNNotificationBase';

export class APNNotification extends APNNotificationBase {
  encoding = 'utf8';
  compiled: string = null;
  expiry = 0;
  priority = 10;
  topic: string = null;
  collapseId: string = null;
  id: string = null;

  badge: number;
  sound: string;

  rawPayload: any;

  constructor(private payload: any = {}) {
    super();
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

  private apsPayload() {
    var aps = this.aps;

    return Object.keys(aps).find(key => aps[key] !== undefined) ? aps : undefined;
  };

  toJSON() {
    if (this.rawPayload != null) {
      return this.rawPayload;
    }

    if (typeof this._mdm === "string") {
      return { "mdm": this._mdm };
    }

    return Object.assign({}, this.payload, { aps: this.apsPayload() });
  };
}