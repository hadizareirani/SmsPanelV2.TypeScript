import { PackId, request, SmsConfig } from "../utils";

/**
 * Response from the delete scheduled SMS API
 */
export interface DeleteScheduledResponse {
  returnedCreditCount: number;
  smsCount: number;
}

/**
 * Creates a DeleteScheduled function with pre-configured API credentials
 */
export const createDeleteScheduled = ({
  apiKey,
}: Pick<SmsConfig, "apiKey">) => {
  return async function deleteScheduled(packId: PackId) {
    return request<DeleteScheduledResponse>({
      input: `/v1/send/scheduled/${packId}`,
      init: {
        method: "DELETE",
      },
      apiKey,
    });
  };
};

