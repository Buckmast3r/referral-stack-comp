import { z } from 'zod';

export const createApiKeySchema = z.object({
  key_name: z.string().min(1, 'Key name is required'),
  permissions: z.record(z.string(), z.boolean()).optional(),
  expires_at: z.string().optional(),
});
