import { Parameters, request, ResponseModel, SmsConfig } from "../utils";

/**
 * Request body for sending verification code SMS
 */
export interface SendVerifyCodeBody {
  mobile: string;
  templateId: number;
  parameters: Array<Parameters>;
}

/**
 * Response from the send verification code API
 */
export interface SendVerifyCodeResponse {
  messageId: number;
  cost: number;
}

/**
 * Creates a SendVerifyCode function with pre-configured API credentials
 *
 * Sends a verification code SMS using a predefined template.
 * Templates are created in the SMS.ir panel and contain placeholders for dynamic values.
 *
 * @param config - SMS configuration containing apiKey (lineNumber not required for this operation)
 * @returns Async function to send verification code SMS
 *
 * @example
 * ```typescript
 * const sendVerifyCode = createSendVerifyCode({ apiKey: "your-api-key" });
 *
 * const result = await sendVerifyCode(
 *   "09123456789",
 *   12345, // Template ID from SMS.ir panel
 *   [
 *     { name: "Code", value: "123456" },
 *     { name: "Name", value: "Ali" }
 *   ]
 * );
 * // Returns: { messageId: 876240022, cost: 20 }
 * ```
 */
export const createSendVerifyCode = ({ apiKey }: Pick<SmsConfig, "apiKey">) => {
  /**
   * Sends a verification code SMS using a template
   *
   * @param mobile - The recipient's mobile number (e.g., "09123456789")
   * @param templateId - The template ID from your SMS.ir panel
   * @param parameters - Array of parameter objects with name-value pairs to fill template placeholders
   * @returns Promise resolving to the API response with messageId and cost
   */
  return async function sendVerifyCode(
    mobile: string,
    templateId: number,
    parameters: Array<Parameters>
  ): Promise<ResponseModel<SendVerifyCodeResponse>> {
    return request<SendVerifyCodeBody, SendVerifyCodeResponse>(
      "POST",
      "/v1/send/verify/",
      apiKey,
      {
        mobile,
        templateId,
        parameters,
      }
    );
  };
};

