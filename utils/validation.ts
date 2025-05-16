import { ZodError } from 'zod';

export function formatZodError(error: ZodError) {
  return error.errors.reduce((acc, curr) => {
    acc[curr.path.join('.')] = curr.message;
    return acc;
  }, {} as Record<string, string>);
}

export function validateApiKey(apiKey: string): boolean {
  // Add your validation logic here
  return apiKey.length > 0;
}
