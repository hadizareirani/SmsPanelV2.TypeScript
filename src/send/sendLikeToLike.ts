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

