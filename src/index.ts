import {
  createDeleteScheduled,
  createSendBulk,
  createSendByURL,
  createSendLikeToLike,
  createSendVerifyCode,
} from "./send";
import { createReportMessage } from "./report";
import { SmsConfig } from "./utils";

export default function smsBuilder(configs: SmsConfig) {
  return {
    /**
     * Sends a bulk SMS message to multiple recipients
     *
     * @param messageText - The text message to send
     * @param mobiles - Array of mobile numbers (e.g., ["09123456789"])
     * @param sendDateTime - Optional timestamp for scheduled sending (Unix timestamp in milliseconds)
     * @param customLineNumber - Optional custom line number to override the default
     * @returns Promise resolving to the API response with packId, messageIds, and cost
     *
     * @example
     * ```typescript
     * const result = await sendBulk(
     *   "Hello World",
     *   ["09123456789", "09987654321"],
     *   Date.now() + 3600000 // Schedule for 1 hour later
     * );
     * ```
     */
    sendBulk: createSendBulk(configs),

    /**
     * Sends multiple different messages to multiple recipients in pairs (1-to-1 mapping)
     *
     * First message goes to first mobile, second to second mobile, etc.
     *
     * @param messageTexts - Array of messages (must match length of mobiles array)
     * @param mobiles - Array of mobile numbers (must match length of messageTexts array)
     * @param sendDateTime - Optional timestamp for scheduled sending
     * @param customLineNumber - Optional custom line number
     * @returns Promise with packId, messageIds, and cost
     *
     * @example
     * ```typescript
     * await sendLikeToLike(
     *   ["Hello Ali", "Hello Sara"],
     *   ["09123456789", "09987654321"]
     * );
     * ```
     */
    sendLikeToLike: createSendLikeToLike(configs),

    /**
     * Deletes a scheduled SMS pack and returns credits to your account
     *
     * @param packId - The pack identifier object containing the packId to delete
     * @returns Promise with returnedCreditCount and smsCount
     *
     * @example
     * ```typescript
     * await deleteScheduled({ packId: "2b99e72c-9bf8-..." });
     * ```
     */
    deleteScheduled: createDeleteScheduled({ apiKey: configs.apiKey }),

    /**
     * Sends a verification code SMS using a predefined template
     *
     * Templates are created in the SMS.ir panel with placeholders for dynamic values.
     *
     * @param mobile - Recipient's mobile number (e.g., "09123456789")
     * @param templateId - Template ID from your SMS.ir panel
     * @param parameters - Array of {name, value} pairs to fill template placeholders
     * @returns Promise with messageId and cost
     *
     * @example
     * ```typescript
     * await sendVerifyCode(
     *   "09123456789",
     *   12345,
     *   [{ name: "Code", value: "123456" }]
     * );
     * ```
     */
    sendVerifyCode: createSendVerifyCode({ apiKey: configs.apiKey }),

    /**
     * Sends SMS using URL query parameters (legacy method)
     *
     * @param username - Your SMS.ir panel username
     * @param mobile - Recipient's mobile number
     * @param text - The message text to send
     * @param customLine - Optional custom line number
     * @returns Promise with messageId and cost
     */
    sendByURL: createSendByURL(configs),

    /**
     * Gets the delivery status and details of a sent message
     *
     * @param messageId - The message ID to get report for
     * @returns Promise with message details including delivery state, cost, and timestamps
     *
     * @example
     * ```typescript
     * const report = await reportMessage("876240022");
     * // Returns: { messageId, mobile, messageText, deliveryState, cost, ... }
     * ```
     */
    reportMessage: createReportMessage({ apiKey: configs.apiKey }),
  };
}

// const t = smsBuilder({
//   apiKey: "your_api_key",
//   lineNumber: 30001234567890,
// });

// t.reportMessage("876240022");

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

