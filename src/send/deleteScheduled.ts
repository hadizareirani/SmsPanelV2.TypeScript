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
 *
 * Deletes a scheduled SMS message pack before it's sent, returning credits to your account.
 *
 * @param config - SMS configuration containing apiKey (lineNumber not required for this operation)
 * @returns Async function to delete a scheduled SMS pack
 *
 * @example
 * ```typescript
 * const deleteScheduled = createDeleteScheduled({ apiKey: "your-api-key" });
 *
 * const result = await deleteScheduled({ packId: "2b99e72c-9bf8-4f2f-9bfe-3f1f2dc1bf6f1" });
 * // Returns: { returnedCreditCount: 20, smsCount: 2 }
 * ```
 */
export const createDeleteScheduled = ({
  apiKey,
}: Pick<SmsConfig, "apiKey">) => {
  /**
   * Deletes a scheduled SMS pack and returns credits
   *
   * @param packId - The pack identifier object containing the packId to delete
   * @returns Promise resolving to the API response with returned credit count and SMS count
   */
  return async function deleteScheduled(packId: DeleteScheduledBody) {
    return request<DeleteScheduledBody, DeleteScheduledResponse>(
      "DELETE",
      `/v1/send/scheduled/${packId.packId}`,
      apiKey
    );
  };
};

