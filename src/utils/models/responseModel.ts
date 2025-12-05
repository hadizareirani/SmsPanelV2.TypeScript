export interface ResponseModel<TResult> {
  status: number;
  message: string;
  data: TResult;
}

