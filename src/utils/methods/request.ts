import { ENDPOINT } from "./constant";
import { ApiKey, ResponseModel } from "../models";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

/**
 * Makes an HTTP request to the SMS.ir API
 *
 * @template TBody - The type of the request body
 * @template TResult - The type of the expected response data
 *
 * @param method - HTTP method (GET, POST, PUT, DELETE)
 * @param url - API endpoint path (will be appended to base URL)
 * @param apiKey - SMS.ir API key for authentication
 * @param body - Optional request body (will be JSON stringified)
 *
 * @returns Promise resolving to the parsed JSON response
 * @throws Error if the HTTP response is not ok (status >= 400)
 *
 * @example
 * ```typescript
 * const result = await request<SendBulkBody, ApiResponse>(
 *   "POST",
 *   "/v1/send/bulk",
 *   "your-api-key",
 *   { MessageText: "Hello", Mobiles: ["09123456789"] }
 * );
 * ```
 */
export async function request<TBody, TResult>(
  method: RequestMethod,
  url: string,
  apiKey: ApiKey,
  body?: TBody
): Promise<ResponseModel<TResult>> {
  const response = await fetch(`${ENDPOINT}${url}`, {
    method,
    headers: {
      "X-API-KEY": apiKey,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<ResponseModel<TResult>>;
}

