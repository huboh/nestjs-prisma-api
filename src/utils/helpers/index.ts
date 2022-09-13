import { Response } from 'express';
import { STATUS_CODES } from "http";
import { SendJsonProps } from '../../types';

export const sendJson = (response: Response, jsonData: SendJsonProps) => {
  const statusCode = jsonData.statusCode || 200;
  const message = jsonData.message || STATUS_CODES[statusCode];
  const status = jsonData.status || (statusCode >= 500 ? "error" : "success");

  response.status(statusCode);
  response.json({
    statusCode: statusCode,
    message: message,
    status: status,
    data: jsonData.data,
    error: !jsonData.error ? undefined : {
      stack: jsonData.error.stack,
      cause: jsonData.error.cause,
      name: jsonData.error.name,
      message: jsonData.error.message,
    },
  });
};