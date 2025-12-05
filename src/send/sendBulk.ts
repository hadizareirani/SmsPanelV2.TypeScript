import { PackId, request, ResponseModel } from "../utils";
import { SmsConfig } from "../utils/models/smsConfig";

/**
 * Request body for sending bulk SMS messages
 */
export interface SendBulkBody {
  lineNumber: number;
  messageText: string;
  mobiles: Array<string>;
  sendDateTime?: number;
}

/**
 * Response from the bulk SMS send API
 */
export interface SendBulkResponse {
  packId: PackId;
  messageIds: Array<number>;
  cost: number;
}

/**
 * Creates a SendBulk function with pre-configured API credentials
 *
 * @param config - SMS configuration containing apiKey and lineNumber
 * @returns Async function to send bulk SMS messages to multiple recipients
 *
 * @example
 * ```typescript
 * const sendBulk = createSendBulk({ apiKey: "your-api-key", lineNumber: 30005006007008 });
 *
 * const result = await sendBulk(
 *   "Hello World",
 *   ["09123456789", "09987654321"],
 *   Date.now() + 3600000, // Optional: Schedule for 1 hour later
 *   30001234567890 // Optional: Use custom line number
 * );
 * ```
 */
export const createSendBulk = ({ apiKey, lineNumber }: SmsConfig) => {
  /**
   * Sends a bulk SMS message to multiple recipients
   *
   * @param messageText - The text message to send
   * @param mobiles - Array of mobile numbers (e.g., ["09123456789"])
   * @param sendDateTime - Optional timestamp for scheduled sending (Unix timestamp in milliseconds)
   * @param customLineNumber - Optional custom line number to override the default
   * @returns Promise resolving to the API response with packId, messageIds, and cost
   */
  return async function sendBulk(
    messageText: string,
    mobiles: string[],
    sendDateTime?: number,
    customLineNumber?: number
  ): Promise<ResponseModel<SendBulkResponse>> {
    return request<SendBulkBody, SendBulkResponse>(
      "POST",
      "/v1/send/bulk",
      apiKey,
      {
        lineNumber: customLineNumber ?? lineNumber,
        messageText,
        mobiles,
        ...(sendDateTime && { sendDateTime }),
      }
    );
  };
};

