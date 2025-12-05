import { PackId, request } from "../utils";
import { SmsConfig } from "../utils/models/smsConfig";

/**
 * Creates a SendBulk function with pre-configured API credentials
 *
 * @param config - SMS configuration containing apiKey and lineNumber
 * @returns An async function to send bulk SMS messages
 *
 * @example
 * ```typescript
 * const sendBulk = createSendBulk({ apiKey: "your-api-key", lineNumber: 30005006007008 });
 *
 * const result = await sendBulk(
 *   "Hello World",
 *   ["09123456789", "09987654321"],
 *   Date.now() + 3600000, // Send in 1 hour
 *   30001234567890 // Optional custom line number
 * );
 * ```
 */
export const createSendBulk = ({ apiKey, lineNumber }: SmsConfig) => {
  /**
   * Sends a bulk SMS message to multiple recipients
   *
   * @param MessageText - The text message to send
   * @param Mobiles - Array of mobile numbers (e.g., ["09123456789"])
   * @param SendDateTime - Optional timestamp for scheduled sending (Unix timestamp in milliseconds)
   * @param customLineNumber - Optional custom line number to override the default
   * @returns Promise resolving to the API response
   */
  return async function sendBulk(
    MessageText: string,
    Mobiles: string[],
    SendDateTime?: number,
    customLineNumber?: number
  ) {
    return request<SendBulkBody, SendBulkResponse>(
      "POST",
      "/v1/send/bulk",
      apiKey,
      {
        lineNumber: customLineNumber ?? lineNumber,
        MessageText,
        Mobiles,
        ...(SendDateTime && { SendDateTime }),
      }
    );
  };
};
3;

export interface SendBulkBody {
  lineNumber: number;
  MessageText: string;
  Mobiles: string[];
  SendDateTime?: number;
}

export interface SendBulkResponse {
  packId: PackId;
  messageIds: Array<number>;
  cost: number;
}

