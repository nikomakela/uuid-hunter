// ValidateUUIDGuess flow
'use server';

/**
 * @fileOverview A UUID guess validation AI agent.
 *
 * - validateUuidGuess - A function that validates a UUID guess.
 * - ValidateUuidGuessInput - The input type for the validateUuidGuess function.
 * - ValidateUuidGuessOutput - The return type for the validateUuidGuess function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateUuidGuessInputSchema = z.object({
  uuid: z.string().describe('The UUID to validate.'),
});
export type ValidateUuidGuessInput = z.infer<typeof ValidateUuidGuessInputSchema>;

const ValidateUuidGuessOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the UUID is valid or not.'),
  reason: z.string().optional().describe('The reason why the UUID is invalid, if applicable.'),
});
export type ValidateUuidGuessOutput = z.infer<typeof ValidateUuidGuessOutputSchema>;

export async function validateUuidGuess(input: ValidateUuidGuessInput): Promise<ValidateUuidGuessOutput> {
  return validateUuidGuessFlow(input);
}

const validateUuidGuessPrompt = ai.definePrompt({
  name: 'validateUuidGuessPrompt',
  input: {schema: ValidateUuidGuessInputSchema},
  output: {schema: ValidateUuidGuessOutputSchema},
  prompt: `You are an expert UUID validator.

You will determine if the provided UUID is a valid UUID format.

If the UUID is valid, return isValid as true. If it's not valid, return isValid as false and provide a reason.

UUID: {{{uuid}}}`,
});

const validateUuidGuessFlow = ai.defineFlow(
  {
    name: 'validateUuidGuessFlow',
    inputSchema: ValidateUuidGuessInputSchema,
    outputSchema: ValidateUuidGuessOutputSchema,
  },
  async input => {
    const {output} = await validateUuidGuessPrompt(input);
    return output!;
  }
);
