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
 */
export const createSendByURL = ({ apiKey, lineNumber }: SmsConfig) => {
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

