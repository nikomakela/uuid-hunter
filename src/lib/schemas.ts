import { z } from 'zod';

export const UuidSchema = z.object({
  uuid: z.string().uuid({ message: 'Please enter a valid UUID format.' }),
});
