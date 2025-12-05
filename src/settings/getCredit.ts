import { request, SmsConfig } from "../utils";

export const createGetCredit = ({ apiKey }: Pick<SmsConfig, "apiKey">) => {
  return async function getCredit() {
    return request<number>({
      input: `/v1/credit`,
      init: {
        method: "GET",
      },
      apiKey,
    });
  };
};

