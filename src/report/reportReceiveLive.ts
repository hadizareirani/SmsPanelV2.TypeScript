import { request, ResponseModel, SmsConfig } from "../utils";

/**
 * Response from the send by URL API
 */
export interface ReportReceiveLiveResponse {
  messageText: string;
  number: number;
  mobile: number;
  receivedDateTime: number;
}

/**
 * Creates a SendByURL function with pre-configured API credentials
 */
export const createReportReceiveLive = ({
  apiKey,
}: Pick<SmsConfig, "apiKey">) => {
  return async function reportReceiveLive(
    pageNumber?: number,
    pageSize?: number,
    sortByNewest?: boolean
  ): Promise<ResponseModel<ReportReceiveLiveResponse[]>> {
    const params = new URLSearchParams({
      ...(pageNumber && { pageNumber: pageNumber.toString() }),
      ...(pageSize && { pageSize: pageSize.toString() }),
      ...(sortByNewest !== undefined && {
        sortByNewest: sortByNewest ? "true" : "false",
      }),
    });

    return request<ReportReceiveLiveResponse[]>({
      input: `/v1/receive/live?${params.toString()}`,
      init: {
        method: "GET",
      },
      apiKey,
    });
  };
};

