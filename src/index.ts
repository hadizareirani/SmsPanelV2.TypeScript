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
import { SmsConfig } from "./utils";

/**
 * Creates an SMS client with all available SMS.ir API methods
 *
 * @param configs - Configuration object containing apiKey and lineNumber
 * @returns Object with all SMS operations (send, report, settings)
 *
 * @example
 * ```typescript
 * const sms = smsBuilder({
 *   apiKey: "your-api-key",
 *   lineNumber: 30007732000000
 * });
 *
 * // Send a bulk SMS
 * await sms.sendBulk("Hello!", ["09123456789"]);
 *
 * // Get account credit
 * const credit = await sms.getCredit();
 * ```
 */
export default function smsBuilder(configs: SmsConfig) {
  return {
    /**
     * Sends a bulk SMS message to multiple recipients
     *
     * @param messageText - The text message to send
     * @param mobiles - Array of mobile numbers (e.g., ["09123456789"])
     * @param sendDateTime - Optional Unix timestamp for scheduled sending
     * @param customLineNumber - Optional custom line number to override the default
     * @returns Promise with packId, messageIds, and cost
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
     * @param sendDateTime - Optional Unix timestamp for scheduled sending
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
     * @param packId - The pack identifier to delete
     * @returns Promise with returnedCreditCount and smsCount
     *
     * @example
     * ```typescript
     * await deleteScheduled("2b99e72c-9bf8-...");
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
     * ```
     */
    reportMessage: createReportMessage({ apiKey: configs.apiKey }),

    /**
     * Retrieves daily SMS pack reports with pagination
     *
     * @param pageNumber - Page number for pagination
     * @param pageSize - Number of items per page
     * @returns Promise with array of daily pack reports
     */
    reportDailyPack: createReportDailyPack({ apiKey: configs.apiKey }),

    /**
     * Retrieves all messages in a specific SMS pack
     *
     * @param packId - The pack identifier to retrieve messages for
     * @returns Promise with array of messages in the pack
     */
    reportPackById: createReportPackById({ apiKey: configs.apiKey }),

    /**
     * Retrieves today's sent SMS messages with live status
     *
     * @param pageNumber - Page number for pagination
     * @param pageSize - Number of items per page
     * @returns Promise with array of today's sent messages
     */
    reportTodayLive: createReportTodayLive({ apiKey: configs.apiKey }),

    /**
     * Retrieves the latest received SMS messages
     *
     * @param count - Number of messages to retrieve
     * @returns Promise with array of latest received messages
     */
    reportLatestReceive: createReportLatestReceive({ apiKey: configs.apiKey }),

    /**
     * Retrieves archived SMS messages within a date range
     *
     * @param fromDate - Start date (Unix timestamp)
     * @param toDate - End date (Unix timestamp)
     * @param pageNumber - Page number for pagination
     * @param pageSize - Number of items per page
     * @returns Promise with array of archived message reports
     */
    reportArchive: createReportArchive({ apiKey: configs.apiKey }),

    /**
     * Retrieves live received SMS messages with pagination and sorting
     *
     * @param pageNumber - Page number for pagination
     * @param pageSize - Number of items per page
     * @param sortByNewest - Sort by newest messages first
     * @returns Promise with array of live received messages
     */
    reportReceiveLive: createReportReceiveLive({ apiKey: configs.apiKey }),

    /**
     * Retrieves archived received SMS messages within a date range
     *
     * @param fromDate - Start date (Unix timestamp)
     * @param toDate - End date (Unix timestamp)
     * @param pageNumber - Page number for pagination
     * @param pageSize - Number of items per page
     * @returns Promise with array of archived received messages
     */
    reportReceiveArchive: createReportReceiveArchive({
      apiKey: configs.apiKey,
    }),

    /**
     * Retrieves the current account credit balance
     *
     * @returns Promise with the credit amount
     */
    getCredit: createGetCredit({ apiKey: configs.apiKey }),

    /**
     * Retrieves all available line numbers for the account
     *
     * @returns Promise with array of line numbers
     */
    getLineNumbers: createGetLineNumbers({ apiKey: configs.apiKey }),
  };
}

