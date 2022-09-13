export type ResponseStatus = "success" | "error";

export interface ResponseError {
  message: string;
  name?: string;
  cause?: Error;
  stack?: string;
}

export interface SendJsonProps {
  statusCode?: number;
  message?: string;
  status?: ResponseStatus;
  error?: ResponseError;
  data?: any;
}