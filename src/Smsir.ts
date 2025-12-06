import {
  createDeleteScheduled,
  createSendBulk,
  createSendByURL,
  createSendLikeToLike,
  createSendVerifyCode,
} from "./send";
import {
  createReportMessage,
  createReportDailyPack,
  createReportPackById,
  createReportTodayLive,
  createReportLatestReceive,
  createReportArchive,
  createReportReceiveLive,
  createReportReceiveArchive,
} from "./report";
import { createGetCredit, createGetLineNumbers } from "./settings";

/**
 * SMS.ir API Client Class
 * 
 * A class-based interface for interacting with the SMS.ir API.
 * Provides methods for sending SMS messages, retrieving reports, and managing account settings.
 * 
 * @class Smsir
 * 
 * @example
 * ```typescript
 * const smsClient = new Smsir("your-api-key", 30007732000000);
 * const result = await smsClient.sendBulk("Hello!", ["09123456789"]);
 * ```
 */
export class Smsir {
  private apiKey: string;
  private lineNumber: number;

  constructor(apiKey: string, lineNumber: number) {
    this.apiKey = apiKey;
    this.lineNumber = lineNumber;
  }

  sendBulk(messageText: string, mobiles: string[], sendDateTime?: number, customLineNumber?: number) {
    return createSendBulk({ apiKey: this.apiKey, lineNumber: this.lineNumber })(messageText, mobiles, sendDateTime, customLineNumber);
  }

  sendLikeToLike(messageTexts: string[], mobiles: string[], sendDateTime?: number, customLineNumber?: number) {
    return createSendLikeToLike({ apiKey: this.apiKey, lineNumber: this.lineNumber })(messageTexts, mobiles, sendDateTime, customLineNumber);
  }

  deleteScheduled(packId: string) {
    return createDeleteScheduled({ apiKey: this.apiKey })(packId);
  }

  sendVerifyCode(mobile: string, templateId: number, parameters: Array<{ name: string; value: string }>) {
    return createSendVerifyCode({ apiKey: this.apiKey })(mobile, templateId, parameters);
  }

  sendByURL(username: string, mobile: string, text: string, customLine?: number) {
    return createSendByURL({ apiKey: this.apiKey, lineNumber: this.lineNumber })(username, mobile, text, customLine);
  }

  reportMessage(messageId: string) {
    return createReportMessage({ apiKey: this.apiKey })(messageId);
  }

  reportDailyPack(pageNumber: number, pageSize: number) {
    return createReportDailyPack({ apiKey: this.apiKey })(pageNumber, pageSize);
  }

  reportPackById(packId: string) {
    return createReportPackById({ apiKey: this.apiKey })(packId);
  }

  reportTodayLive(pageNumber: number, pageSize: number) {
    return createReportTodayLive({ apiKey: this.apiKey })(pageNumber, pageSize);
  }

  reportLatestReceive(count: number) {
    return createReportLatestReceive({ apiKey: this.apiKey })(count);
  }

  reportArchive(fromDate: number, toDate: number, pageNumber: number, pageSize: number) {
    return createReportArchive({ apiKey: this.apiKey })(fromDate, toDate, pageNumber, pageSize);
  }

  reportReceiveLive(pageNumber: number, pageSize: number, sortByNewest: boolean) {
    return createReportReceiveLive({ apiKey: this.apiKey })(pageNumber, pageSize, sortByNewest);
  }

  reportReceiveArchive(fromDate: number, toDate: number, pageNumber: number, pageSize: number) {
    return createReportReceiveArchive({ apiKey: this.apiKey })(fromDate, toDate, pageNumber, pageSize);
  }

  getCredit() {
    return createGetCredit({ apiKey: this.apiKey })();
  }

  getLineNumbers() {
    return createGetLineNumbers({ apiKey: this.apiKey })();
  }

  /** @deprecated Use sendBulk instead */
  SendBulk(MessageText: string, Mobiles: string[], SendDateTime?: number, lineNumber?: number) {
    return this.sendBulk(MessageText, Mobiles, SendDateTime, lineNumber);
  }

  /** @deprecated Use sendLikeToLike instead */
  SendLikeToLike(MessageTexts: string[], Mobiles: string[], SendDateTime?: number, lineNumber?: number) {
    return this.sendLikeToLike(MessageTexts, Mobiles, SendDateTime, lineNumber);
  }

  /** @deprecated Use sendVerifyCode instead */
  SendVerifyCode(Mobile: string, TemplateId: number, Parameters: Array<{ name: string; value: string }>) {
    return this.sendVerifyCode(Mobile, TemplateId, Parameters);
  }

  /** @deprecated Use reportMessage instead */
  ReportMessage(MessageId: string) {
    return this.reportMessage(MessageId);
  }

  /** @deprecated Use reportPackById instead */
  ReportPack(PackId: string) {
    return this.reportPackById(PackId);
  }

  /** @deprecated Use reportTodayLive instead */
  ReportToday(pageSize: number = 10, pageNumber: number = 1) {
    return this.reportTodayLive(pageNumber, pageSize);
  }

  /** @deprecated Use reportArchive instead */
  ReportArchived(fromDate: number = 0, toDate: number = 0, pageSize: number = 10, pageNumber: number = 1) {
    return this.reportArchive(fromDate, toDate, pageNumber, pageSize);
  }

  /** @deprecated Use reportLatestReceive instead */
  ReportLatestReceived(count: number = 100) {
    return this.reportLatestReceive(count);
  }

  /** @deprecated Use reportReceiveLive instead */
  ReportTodayReceived(pageSize: number = 10, pageNumber: number = 1) {
    return this.reportReceiveLive(pageNumber, pageSize, true);
  }

  /** @deprecated Use reportReceiveArchive instead */
  ReportArchivedReceived(fromDate: number = 0, toDate: number = 0, pageSize: number = 10, pageNumber: number = 1) {
    return this.reportReceiveArchive(fromDate, toDate, pageNumber, pageSize);
  }
}
