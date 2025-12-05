import { request, ResponseModel, SmsConfig } from "../utils";

/**
 * Request parameters for sending SMS via URL (legacy method)
 */
export interface SendByURLBody {
  username: string;
  mobile: string;
  text: number;
  password?: string;
  Line?: number;
}

/**
 * Response from the send by URL API
 */
export interface SendByURLResponse {
  messageId: number;
  cost: number;
}

/**
 * Creates a SendByURL function with pre-configured API credentials
 *
 * Sends SMS using URL query parameters (legacy method for backward compatibility).
 * This method allows sending SMS through a simple GET request with query string parameters.
 *
 * @param config - SMS configuration containing apiKey and lineNumber
 * @returns Async function to send SMS via URL query parameters
 *
 * @example
 * ```typescript
 * const sendByUrl = createSendByURL({ apiKey: "your-api-key", lineNumber: 30005006007008 });
 *
 * const result = await sendByUrl(
 *   "my_username",
 *   "09123456789",
 *   "Your verification code is 123456",
 *   30001234567890 // Optional: Custom line number
 * );
 * // Returns: { messageId: 876240022, cost: 20 }
 * ```
 */
export const createSendByURL = ({ apiKey, lineNumber }: SmsConfig) => {
  /**
   * Sends an SMS message via URL query parameters
   *
   * @param username - Your SMS.ir panel username
   * @param mobile - The recipient's mobile number (e.g., "09123456789")
   * @param text - The message text to send
   * @param customLine - Optional custom line number to override the default
   * @returns Promise resolving to the API response with messageId and cost
   */
  return async function sendByUrl(
    username: string,
    mobile: string,
    text: string,
    customLine?: number
  ): Promise<ResponseModel<SendByURLResponse>> {
    const params = new URLSearchParams({
      username,
      password: apiKey,
      line: String(customLine ?? lineNumber),
      mobile,
      text,
    });

    return request<SendByURLBody, SendByURLResponse>(
      "GET",
      `/v1/send?${params.toString()}`,
      apiKey
    );
  };
};

