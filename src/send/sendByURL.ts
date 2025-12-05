import { request, ResponseModel, SmsConfig } from "../utils";

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

    return request<SendByURLResponse>({
      input: `/v1/send?${params.toString()}`,
      init: {
        method: "GET",
      },
      apiKey,
    });
  };
};

