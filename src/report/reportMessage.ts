import { request, ResponseModel, SmsConfig } from "../utils";

/**
 * Request body for getting message report
 */
export interface ReportMessageBody {
  messageId: string;
}

/**
 * Response from the message report API
 */
export interface ReportMessageResponse {
  messageId: number;
  mobile: number;
  messageText: string;
  sendDateTime: number;
  lineNumber: number;
  cost: number;
  deliveryState: number;
  deliveryDateTime: number;
}

/**
 * Creates a ReportMessage function with pre-configured API credentials
 */
export const createReportMessage = ({ apiKey }: Pick<SmsConfig, "apiKey">) => {
  return async function reportMessage(
    messageId: string
  ): Promise<ResponseModel<ReportMessageResponse>> {
    return request("GET", `/v1/send/${messageId}`, apiKey);
  };
};

