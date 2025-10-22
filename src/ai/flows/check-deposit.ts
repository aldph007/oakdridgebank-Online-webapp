// This file contains the Genkit flow for depositing checks using AI.
'use server';

/**
 * @fileOverview This file defines the check deposit flow using AI to extract check information.
 *
 * - `depositCheck`: A function that initiates the check deposit process.
 * - `CheckDepositInput`: The input type for the depositCheck function, including the check image.
 * - `CheckDepositOutput`: The return type for the depositCheck function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CheckDepositInputSchema = z.object({
  checkImageDataUri: z
    .string()
    .describe(
      'The check image as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
});
export type CheckDepositInput = z.infer<typeof CheckDepositInputSchema>;

const CheckDepositOutputSchema = z.object({
  accountNumber: z.string().describe('The account number to deposit into.'),
  routingNumber: z.string().describe('The routing number of the bank.'),
  checkNumber: z.string().describe('The check number.'),
  amount: z.number().describe('The amount to deposit, in USD.'),
  payee: z.string().describe('The payee on the check.'),
  date: z.string().describe('The date on the check.'),
});
export type CheckDepositOutput = z.infer<typeof CheckDepositOutputSchema>;

export async function depositCheck(input: CheckDepositInput): Promise<CheckDepositOutput> {
  return depositCheckFlow(input);
}

const checkDepositPrompt = ai.definePrompt({
  name: 'checkDepositPrompt',
  input: {schema: CheckDepositInputSchema},
  output: {schema: CheckDepositOutputSchema},
  prompt: `You are an AI trained to extract information from check images for deposit processing.

  Analyze the check image provided and extract the following information:
  - Account Number
  - Routing Number
  - Check Number
  - Amount (in USD)
  - Payee
  - Date

  Return the extracted information in JSON format.

  Check Image: {{media url=checkImageDataUri}}
  `,
});

const depositCheckFlow = ai.defineFlow(
  {
    name: 'depositCheckFlow',
    inputSchema: CheckDepositInputSchema,
    outputSchema: CheckDepositOutputSchema,
  },
  async input => {
    const {output} = await checkDepositPrompt(input);
    return output!;
  }
);
