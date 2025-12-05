import { request, ResponseModel, SmsConfig } from "../utils";

/**
 * Response from the send by URL API
 */
export interface ReportLatestReceiveResponse {
  receiveReturnId: number;
  messageText: string;
  number: number;
  mobile: number;
  receivedDateTime: number;
}

/**
 * Creates a SendByURL function with pre-configured API credentials
 */
export const createReportLatestReceive = ({
  apiKey,
}: Pick<SmsConfig, "apiKey">) => {
  return async function reportLatestReceive(
    count?: number
  ): Promise<ResponseModel<ReportLatestReceiveResponse[]>> {
    const params = new URLSearchParams({
      ...(count && { count: count.toString() }),
    });

    return request<ReportLatestReceiveResponse[]>({
      input: `/v1/receive/latest?${params.toString()}`,
      init: {
        method: "GET",
      },
      apiKey,
    });
  };
};

