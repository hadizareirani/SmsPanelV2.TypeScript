import { request, ResponseModel, SmsConfig } from "../utils";

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
    return request<ReportMessageResponse>({
      input: `/v1/send/${messageId}`,
      init: {
        method: "GET",
      },
      apiKey,
    });
  };
};

