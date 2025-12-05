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
 */
export const createSendBulk = ({ apiKey, lineNumber }: SmsConfig) => {
  return async function sendBulk(
    messageText: string,
    mobiles: string[],
    sendDateTime?: number,
    customLineNumber?: number
  ): Promise<ResponseModel<SendBulkResponse>> {
    return request<SendBulkResponse>({
      input: `/v1/send/bulk`,
      init: {
        method: "POST",
        body: JSON.stringify({
          lineNumber: customLineNumber ?? lineNumber,
          messageText,
          mobiles,
          ...(sendDateTime && { sendDateTime }),
        } as SendBulkBody),
      },
      apiKey,
    });
  };
};

