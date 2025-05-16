import { ZodError, ZodIssue } from 'zod';

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
};

export function successResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message: message || 'Operation successful',
  };
}

export function errorResponse(message: string, errors?: Record<string, string[]>): ApiResponse {
  return {
    success: false,
    message: message || 'Operation failed',
    errors,
  };
}

export function formatZodError(error: ZodError): Record<string, string[]> {
  const formattedErrors: Record<string, string[]> = {};
  
  error.issues.forEach((issue: ZodIssue) => {
    const path = issue.path.map(p => p.toString()).join('.');
    if (!formattedErrors[path]) {
      formattedErrors[path] = [];
    }
    formattedErrors[path].push(issue.message);
  });
  
  return formattedErrors;
}