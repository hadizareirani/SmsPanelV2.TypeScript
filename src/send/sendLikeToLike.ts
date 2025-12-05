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
 */
export const createSendLikeToLike = ({ apiKey, lineNumber }: SmsConfig) => {
  return async function sendLikeToLike(
    messageTexts: string[],
    mobiles: string[],
    sendDateTime?: number,
    customLineNumber?: number
  ): Promise<ResponseModel<SendLikeToLikeResponse>> {
    return request<SendLikeToLikeResponse>({
      input: "/v1/send/liketolike",
      init: {
        method: "POST",
        body: JSON.stringify({
          lineNumber: customLineNumber ?? lineNumber,
          messageTexts,
          mobiles,
          ...(sendDateTime && { sendDateTime }),
        } as SendLikeToLikeBody),
      },
      apiKey,
    });
  };
};

