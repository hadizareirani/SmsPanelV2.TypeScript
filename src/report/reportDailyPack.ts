import { PackId, request, ResponseModel, SmsConfig } from "../utils";

/**
 * Response from the send by URL API
 */
export interface ReportDailyPackResponse {
  packId: PackId;
  recipientCount: number;
  creationDateTime: number;
}

/**
 * Creates a SendByURL function with pre-configured API credentials
 */
export const createReportDailyPack = ({
  apiKey,
}: Pick<SmsConfig, "apiKey">) => {
  return async function reportDailyPack(
    pageNumber?: number,
    pageSize?: number
  ): Promise<ResponseModel<ReportDailyPackResponse[]>> {
    const params = new URLSearchParams({
      pageNumber: String(pageNumber ?? 1),
      pageSize: String(pageSize ?? 100),
    });

    return request<ReportDailyPackResponse[]>({
      input: `/v1/send?${params.toString()}`,
      init: {
        method: "GET",
      },
      apiKey,
    });
  };
};

