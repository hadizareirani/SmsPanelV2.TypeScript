import ENDPOINT from "./constant";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export type APIKey = string;
export async function request<TBody, TResult>(
  method: RequestMethod,
  url: string,
  APIKey: APIKey,
  body?: TBody
): Promise<TResult> {
  const response = await fetch(`${ENDPOINT}${url}`, {
    method,
    headers: {
      "X-API-KEY": APIKey,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<TResult>;
}

