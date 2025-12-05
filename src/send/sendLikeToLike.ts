import { PackId, request, ResponseModel, SmsConfig } from "../utils";

/**
 * Request body for sending like-to-like SMS messages
 */
export interface SendLikeToLikeBody {
  lineNumber: number;
  messageTexts: Array<string>;
  mobiles: Array<string>;
  sendDateTime?: number;
}

/**
 * Response from the like-to-like SMS send API
 */
export interface SendLikeToLikeResponse {
  packId: PackId;
  messageIds: Array<number>;
  cost: number;
}

/**
 * Creates a SendLikeToLike function with pre-configured API credentials
 *
 * Sends multiple different messages to multiple recipients in pairs (1-to-1 mapping).
 * First message goes to first mobile, second message to second mobile, etc.
 *
 * @param config - SMS configuration containing apiKey and lineNumber
 * @returns Async function to send paired SMS messages to multiple recipients
 *
 * @example
 * ```typescript
 * const sendLikeToLike = createSendLikeToLike({ apiKey: "your-api-key", lineNumber: 30005006007008 });
 *
 * const result = await sendLikeToLike(
 *   ["Hello Ali", "Hello Sara", "Hello Reza"],
 *   ["09123456789", "09987654321", "09111111111"],
 *   Date.now() + 3600000, // Optional: Schedule for 1 hour later
 *   30001234567890 // Optional: Use custom line number
 * );
 * ```
 */
export const createSendLikeToLike = ({ apiKey, lineNumber }: SmsConfig) => {
  /**
   * Sends multiple SMS messages to multiple recipients in pairs
   *
   * @param messageTexts - Array of messages (must match length of mobiles array)
   * @param mobiles - Array of mobile numbers (must match length of messageTexts array)
   * @param sendDateTime - Optional timestamp for scheduled sending (Unix timestamp in milliseconds)
   * @param customLineNumber - Optional custom line number to override the default
   * @returns Promise resolving to the API response with packId, messageIds, and cost
   */
  return async function sendLikeToLike(
    messageTexts: string[],
    mobiles: string[],
    sendDateTime?: number,
    customLineNumber?: number
  ): Promise<ResponseModel<SendLikeToLikeResponse>> {
    return request<SendLikeToLikeBody, SendLikeToLikeResponse>(
      "POST",
      "/v1/send/liketolike",
      apiKey,
      {
        lineNumber: customLineNumber ?? lineNumber,
        messageTexts,
        mobiles,
        ...(sendDateTime && { sendDateTime }),
      }
    );
  };
};

