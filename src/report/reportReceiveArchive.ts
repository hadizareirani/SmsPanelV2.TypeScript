import { request, ResponseModel, SmsConfig } from "../utils";

/**
 * Response from the send by URL API
 */
export interface ReportReceiveArchiveResponse {
  receiveReturnId: number;
  messageText: string;
  number: number;
  mobile: number;
  receivedDateTime: number;
}

/**
 * Creates a SendByURL function with pre-configured API credentials
 */
export const createReportReceiveArchive = ({
  apiKey,
}: Pick<SmsConfig, "apiKey">) => {
  return async function reportReceiveArchive(
    fromDate?: number,
    toDate?: number,
    pageNumber?: number,
    pageSize?: number
  ): Promise<ResponseModel<ReportReceiveArchiveResponse[]>> {
    const params = new URLSearchParams({
      ...(fromDate && { fromDate: fromDate.toString() }),
      ...(toDate && { toDate: toDate.toString() }),
      ...(pageNumber && { pageNumber: pageNumber.toString() }),
      ...(pageSize && { pageSize: pageSize.toString() }),
    });

    return request<ReportReceiveArchiveResponse[]>({
      input: `/v1/receive/archive?${params.toString()}`,
      init: {
        method: "GET",
      },
      apiKey,
    });
  };
};

