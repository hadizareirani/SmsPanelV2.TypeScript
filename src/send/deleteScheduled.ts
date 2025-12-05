import { PackId, request, SmsConfig } from "../utils";

/**
 * Request body for deleting a scheduled SMS pack
 */
export interface DeleteScheduledBody {
  packId: PackId;
}

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
  return async function deleteScheduled(packId: DeleteScheduledBody) {
    return request<DeleteScheduledBody, DeleteScheduledResponse>(
      "DELETE",
      `/v1/send/scheduled/${packId.packId}`,
      apiKey
    );
  };
};

