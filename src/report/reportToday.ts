import { PackId, request, ResponseModel, SmsConfig } from "../utils";

/**
 * Response from the send by URL API
 */
export interface ReportTodayResponse {
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
export const createReportToday = ({ apiKey }: Pick<SmsConfig, "apiKey">) => {
  return async function reportToday(
    pageNumber?: number,
    pageSize?: number
  ): Promise<ResponseModel<ReportTodayResponse[]>> {
    const params = new URLSearchParams({
      pageNumber: String(pageNumber ?? 1),
      pageSize: String(pageSize ?? 100),
    });

    return request<ReportTodayResponse[]>({
      input: `/v1/send?${params.toString()}`,
      init: {
        method: "GET",
      },
      apiKey,
    });
  };
};

