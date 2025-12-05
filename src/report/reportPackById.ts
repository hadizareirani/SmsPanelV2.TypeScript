import { PackId, request, ResponseModel, SmsConfig } from "../utils";

/**
 * Response from the send by URL API
 */
export interface ReportPackByIdResponse {
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
 * Creates a SendByURL function with pre-configured API credentials
 */
export const createReportPackById = ({ apiKey }: Pick<SmsConfig, "apiKey">) => {
  return async function reportPackById(
    packId: PackId
  ): Promise<ResponseModel<ReportPackByIdResponse[]>> {
    return request<ReportPackByIdResponse[]>({
      input: `/v1/send/pack/${packId}`,
      init: {
        method: "GET",
      },
      apiKey,
    });
  };
};

