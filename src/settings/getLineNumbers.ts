import { request, SmsConfig } from "../utils";

export const createGetLineNumbers = ({ apiKey }: Pick<SmsConfig, "apiKey">) => {
  return async function getLineNumbers() {
    return request<number[]>({
      input: `/v1/line`,
      init: {
        method: "GET",
      },
      apiKey,
    });
  };
};

