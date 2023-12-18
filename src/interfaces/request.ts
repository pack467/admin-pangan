export type BaseResponse<T = any> = {
  data: T;
  message?: string;
  code: number;
  "Content-Type": string;
  Path: string;
};
