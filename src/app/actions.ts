'use server';

import type { z } from 'zod';
import { validateUuidGuess } from '@/ai/flows/validate-uuid-guess';
import type { UuidSchema } from '@/lib/schemas';

// The secret UUID to be guessed. Use environment variable or a default.
const TARGET_UUID =
  process.env.TARGET_UUID || 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';

type GuessResult = {
  success: boolean;
  message: string;
};

export async function guessUuidAction(
  data: z.infer<typeof UuidSchema>
): Promise<GuessResult> {
  // Simulate delay for basic brute-force mitigation
  await new Promise(resolve => setTimeout(resolve, 1000));

  const { uuid } = data;

  // Use GenAI to perform an advanced validation of the UUID format
  try {
    const aiValidationResult = await validateUuidGuess({ uuid });
    if (!aiValidationResult.isValid) {
      return {
        success: false,
        message: `Invalid UUID: ${
          aiValidationResult.reason || 'Does not appear to be a valid UUID.'
        }`,
      };
    }
  } catch (error) {
    console.error('AI validation failed:', error);
    // Proceed without AI validation if the service fails
  }

  // Compare the user's guess with the target UUID
  if (uuid.toLowerCase() === TARGET_UUID.toLowerCase()) {
    return {
      success: true,
      message: "Congratulations! You've found the correct UUID!",
    };
  }

  return {
    success: false,
    message: 'Incorrect UUID. Keep hunting!',
  };
}
