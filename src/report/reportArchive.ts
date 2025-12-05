import { request, ResponseModel, SmsConfig } from "../utils";

/**
 * Response from the send by URL API
 */
export interface ReportArchiveResponse {
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
export const createReportArchive = ({ apiKey }: Pick<SmsConfig, "apiKey">) => {
  return async function reportArchive(
    fromDate?: number,
    toDate?: number,
    pageNumber?: number,
    pageSize?: number
  ): Promise<ResponseModel<ReportArchiveResponse[]>> {
    const params = new URLSearchParams({
      ...(fromDate && { fromDate: fromDate.toString() }),
      ...(toDate && { toDate: toDate.toString() }),
      ...(pageNumber && { pageNumber: pageNumber.toString() }),
      ...(pageSize && { pageSize: pageSize.toString() }),
    });

    return request<ReportArchiveResponse[]>({
      input: `/v1/send/archive?${params.toString()}`,
      init: {
        method: "GET",
      },
      apiKey,
    });
  };
};

