import { Parameters, request, ResponseModel, SmsConfig } from "../utils";

/**
 * Request body for sending verification code SMS
 */
export interface SendVerifyCodeBody {
  mobile: string;
  templateId: number;
  parameters: Array<Parameters>;
}

/**
 * Response from the send verification code API
 */
export interface SendVerifyCodeResponse {
  messageId: number;
  cost: number;
}

/**
 * Creates a SendVerifyCode function with pre-configured API credentials
 */
export const createSendVerifyCode = ({ apiKey }: Pick<SmsConfig, "apiKey">) => {
  return async function sendVerifyCode(
    mobile: string,
    templateId: number,
    parameters: Array<Parameters>
  ): Promise<ResponseModel<SendVerifyCodeResponse>> {
    return request<SendVerifyCodeResponse>({
      input: "/v1/send/verify/",
      init: {
        method: "POST",
        body: JSON.stringify({
          mobile,
          templateId,
          parameters,
        } as SendVerifyCodeBody),
      },
      apiKey,
    });
  };
};

