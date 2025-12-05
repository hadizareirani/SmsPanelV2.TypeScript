import {
  createDeleteScheduled,
  createSendBulk,
  createSendLikeToLike,
  createSendVerifyCode,
} from "./send";
import { SmsConfig } from "./utils";

export default function smsBuilder(configs: SmsConfig) {
  return {
    sendBulk: createSendBulk(configs),
    sendLikeToLike: createSendLikeToLike(configs),
    deleteScheduled: createDeleteScheduled({ apiKey: configs.apiKey }),
    sendVerifyCode: createSendVerifyCode({ apiKey: configs.apiKey }),
  };
}

//   async SendVerifyCode(
//     Mobile: string,
//     TemplateId: number,
//     Parameters: { name: string; value: string }[]
//   ) {
//     return this.request("POST", "/v1/send/verify/", {
//       Mobile,
//       TemplateId,
//       Parameters,
//     });
//   }

//   async ReportMessage(MessageId: number) {
//     return this.request("GET", `/v1/send/${MessageId}`);
//   }

//   async ReportPack(PackId: string) {
//     return this.request("GET", `/v1/send/pack/${PackId}`);
//   }

//   async ReportToday(pageSize: number = 10, pageNumber: number = 1) {
//     return this.request("GET", "/v1/send/live/", {
//       pageSize,
//       pageNumber,
//     });
//   }

//   async ReportArchived(
//     fromDate: number | null = null,
//     toDate: number | null = null,
//     pageSize: number = 10,
//     pageNumber: number = 1
//   ) {
//     return this.request("GET", "/v1/send/archive/", {
//       fromDate,
//       toDate,
//       pageSize,
//       pageNumber,
//     });
//   }

//   async ReportLatestReceived(count: number = 100) {
//     return this.request("GET", "/v1/receive/latest", {
//       count,
//     });
//   }

//   async ReportTodayReceived(pageSize: number = 10, pageNumber: number = 1) {
//     return this.request("GET", "/v1/receive/live", {
//       pageSize,
//       pageNumber,
//     });
//   }

//   async ReportArchivedReceived(
//     fromDate: number | null = null,
//     toDate: number | null = null,
//     pageSize: number = 10,
//     pageNumber: number = 1
//   ) {
//     return this.request("GET", "/v1/receive/archive", {
//       fromDate,
//       toDate,
//       pageSize,
//       pageNumber,
//     });
//   }

//   async getCredit() {
//     return this.request("GET", "/v1/credit");
//   }

//   async getLineNumbers() {
//     return this.request("GET", "/v1/line");
//   }
// }
