import { PackId, request, ResponseModel, SmsConfig } from "../utils";

/**
 * Response from the send by URL API
 */
export interface ReportTodayLiveResponse {
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
export const createReportTodayLive = ({
  apiKey,
}: Pick<SmsConfig, "apiKey">) => {
  return async function reportTodayLive(
    pageNumber?: number,
    pageSize?: number
  ): Promise<ResponseModel<ReportTodayLiveResponse[]>> {
    const params = new URLSearchParams({
      ...(pageNumber && { pageNumber: pageNumber.toString() }),
      ...(pageSize && { pageSize: pageSize.toString() }),
    });

    return request<ReportTodayLiveResponse[]>({
      input: `/v1/send/live?${params.toString()}`,
      init: {
        method: "GET",
      },
      apiKey,
    });
  };
};

