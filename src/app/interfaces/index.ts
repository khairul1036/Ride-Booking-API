/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';

interface IModuleRoutes {
  path: string;
  element: Router;
}

interface SendEmailOptions {
  to: string;
  subject: string;
  templateName: string;
  templateData?: Record<string, any>;
  attachments?: {
    filename: string;
    content: Buffer | string;
    contentType: string;
  }[];
}

interface IMeta {
  page: number;
  limit: number;
  totalPage: number;
  total: number;
}

interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: IMeta;
}

interface AuthTokens {
  accessToken?: string;
  refreshToken?: string;
}

export { IModuleRoutes, SendEmailOptions, IResponse, AuthTokens };
