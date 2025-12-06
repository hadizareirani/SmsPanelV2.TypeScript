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
 * SMS.ir API Client Class
 * 
 * A class-based interface for interacting with the SMS.ir API.
 * Provides methods for sending SMS messages, retrieving reports, and managing account settings.
 * 
 * @class Smsir
 * 
 * @example
 * ```typescript
 * // Create a new instance
 * const smsClient = new Smsir("your-api-key", 30007732000000);
 * 
 * // Send bulk SMS
 * const result = await smsClient.sendBulk(
 *   "Hello World",
 *   ["09123456789", "09987654321"]
 * );
 * 
 * // Send verification code
 * await smsClient.sendVerifyCode(
 *   "09123456789",
 *   12345,
 *   [{ name: "Code", value: "123456" }]
 * );
 * 
 * // Get account credit
 * const credit = await smsClient.getCredit();
 * ```
 */
export class Smsir {
  private apiKey: string;
  private lineNumber: number;

  /**
   * Creates a new SMS.ir API client instance
   * 
   * @param apiKey - Your SMS.ir API key for authentication
   * @param lineNumber - Your default line number for sending messages
   * 
   * @example
   * ```typescript
   * const sms = new Smsir("your-api-key", 30007732000000);
   * ```
   */
  constructor(apiKey: string, lineNumber: number) {
    this.apiKey = apiKey;
    this.lineNumber = lineNumber;
  }

  // Send methods
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
   * const result = await sms.sendBulk("Hello!", ["09123456789"]);
   * ```
   */
  sendBulk(
    messageText: string,
    mobiles: string[],
    sendDateTime?: number,
    customLineNumber?: number
  ) {
    return createSendBulk({ 
      apiKey: this.apiKey, 
      lineNumber: this.lineNumber 
    })(messageText, mobiles, sendDateTime, customLineNumber);
  }

  /**
   * Sends multiple different messages to multiple recipients in pairs
   * 
   * @param messageTexts - Array of messages (must match length of mobiles array)
   * @param mobiles - Array of mobile numbers (must match length of messageTexts array)
   * @param sendDateTime - Optional Unix timestamp for scheduled sending
   * @param customLineNumber - Optional custom line number
   * @returns Promise with packId, messageIds, and cost
   * 
   * @example
   * ```typescript
   * await sms.sendLikeToLike(
   *   ["Hello Ali", "Hello Sara"],
   *   ["09123456789", "09987654321"]
   * );
   * ```
   */
  sendLikeToLike(
    messageTexts: string[],
    mobiles: string[],
    sendDateTime?: number,
    customLineNumber?: number
  ) {
    return createSendLikeToLike({ 
      apiKey: this.apiKey, 
      lineNumber: this.lineNumber 
    })(messageTexts, mobiles, sendDateTime, customLineNumber);
  }

  /**
   * Deletes a scheduled SMS pack
   * 
   * @param packId - The pack identifier to delete
   * @returns Promise with returnedCreditCount and smsCount
   * 
   * @example
   * ```typescript
   * await sms.deleteScheduled("2b99e72c-9bf8-...");
   * ```
   */
  deleteScheduled(packId: string) {
    return createDeleteScheduled({ 
      apiKey: this.apiKey 
    })(packId);
  }

  /**
   * Sends a verification code SMS using a predefined template
   * 
   * @param mobile - Recipient's mobile number (e.g., "09123456789")
   * @param templateId - Template ID from your SMS.ir panel
   * @param parameters - Array of {name, value} pairs to fill template placeholders
   * @returns Promise with messageId and cost
   * 
   * @example
   * ```typescript
   * await sms.sendVerifyCode(
   *   "09123456789",
   *   12345,
   *   [{ name: "Code", value: "123456" }]
   * );
   * ```
   */
  sendVerifyCode(
    mobile: string,
    templateId: number,
    parameters: Array<{ name: string; value: string }>
  ) {
    return createSendVerifyCode({ 
      apiKey: this.apiKey 
    })(mobile, templateId, parameters);
  }

  /**
   * Sends SMS using URL query parameters (legacy method)
   * 
   * @param username - Your SMS.ir panel username
   * @param mobile - Recipient's mobile number
   * @param text - The message text to send
   * @param customLine - Optional custom line number
   * @returns Promise with messageId and cost
   */
  sendByURL(
    username: string,
    mobile: string,
    text: string,
    customLine?: number
  ) {
    return createSendByURL({ 
      apiKey: this.apiKey, 
      lineNumber: this.lineNumber 
    })(username, mobile, text, customLine);
  }

  // Report methods
  /**
   * Gets the delivery status and details of a sent message
   * 
   * @param messageId - The message ID to get report for
   * @returns Promise with message details
   * 
   * @example
   * ```typescript
   * const report = await sms.reportMessage("876240022");
   * ```
   */
  reportMessage(messageId: string) {
    return createReportMessage({ 
      apiKey: this.apiKey 
    })(messageId);
  }

  /**
   * Retrieves daily SMS pack reports with pagination
   * 
   * @param pageNumber - Page number for pagination
   * @param pageSize - Number of items per page
   * @returns Promise with array of daily pack reports
   */
  reportDailyPack(pageNumber: number, pageSize: number) {
    return createReportDailyPack({ 
      apiKey: this.apiKey 
    })(pageNumber, pageSize);
  }

  /**
   * Retrieves all messages in a specific SMS pack
   * 
   * @param packId - The pack identifier to retrieve messages for
   * @returns Promise with array of messages in the pack
   */
  reportPackById(packId: string) {
    return createReportPackById({ 
      apiKey: this.apiKey 
    })(packId);
  }

  /**
   * Retrieves today's sent SMS messages with live status
   * 
   * @param pageNumber - Page number for pagination
   * @param pageSize - Number of items per page
   * @returns Promise with array of today's sent messages
   */
  reportTodayLive(pageNumber: number, pageSize: number) {
    return createReportTodayLive({ 
      apiKey: this.apiKey 
    })(pageNumber, pageSize);
  }

  /**
   * Retrieves the latest received SMS messages
   * 
   * @param count - Number of messages to retrieve
   * @returns Promise with array of latest received messages
   */
  reportLatestReceive(count: number) {
    return createReportLatestReceive({ 
      apiKey: this.apiKey 
    })(count);
  }

  /**
   * Retrieves archived SMS messages within a date range
   * 
   * @param fromDate - Start date (Unix timestamp)
   * @param toDate - End date (Unix timestamp)
   * @param pageNumber - Page number for pagination
   * @param pageSize - Number of items per page
   * @returns Promise with array of archived message reports
   */
  reportArchive(
    fromDate: number,
    toDate: number,
    pageNumber: number,
    pageSize: number
  ) {
    return createReportArchive({ 
      apiKey: this.apiKey 
    })(fromDate, toDate, pageNumber, pageSize);
  }

  /**
   * Retrieves live received SMS messages with pagination
   * 
   * @param pageNumber - Page number for pagination
   * @param pageSize - Number of items per page
   * @param sortByNewest - Sort by newest messages first
   * @returns Promise with array of live received messages
   */
  reportReceiveLive(
    pageNumber: number,
    pageSize: number,
    sortByNewest: boolean
  ) {
    return createReportReceiveLive({ 
      apiKey: this.apiKey 
    })(pageNumber, pageSize, sortByNewest);
  }

  /**
   * Retrieves archived received SMS messages within a date range
   * 
   * @param fromDate - Start date (Unix timestamp)
   * @param toDate - End date (Unix timestamp)
   * @param pageNumber - Page number for pagination
   * @param pageSize - Number of items per page
   * @returns Promise with array of archived received messages
   */
  reportReceiveArchive(
    fromDate: number,
    toDate: number,
    pageNumber: number,
    pageSize: number
  ) {
    return createReportReceiveArchive({ 
      apiKey: this.apiKey 
    })(fromDate, toDate, pageNumber, pageSize);
  }

  // Settings methods
  /**
   * Retrieves the current account credit balance
   * 
   * @returns Promise with the credit amount
   * 
   * @example
   * ```typescript
   * const credit = await sms.getCredit();
   * console.log(credit.data); // Credit amount
   * ```
   */
  getCredit() {
    return createGetCredit({ 
      apiKey: this.apiKey 
    })();
  }

  /**
   * Retrieves all available line numbers for the account
   * 
   * @returns Promise with array of line numbers
   * 
   * @example
   * ```typescript
   * const lines = await sms.getLineNumbers();
   * console.log(lines.data); // Array of line numbers
   * ```
   */
  getLineNumbers() {
    return createGetLineNumbers({ 
      apiKey: this.apiKey 
    })();
  }
}

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
export function smsBuilder(configs: SmsConfig) {
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

// Default export for backward compatibility
export default smsBuilder;

// Re-export all types for convenience
export * from "./send";
export * from "./report";
export * from "./settings";
export * from "./utils/models";

