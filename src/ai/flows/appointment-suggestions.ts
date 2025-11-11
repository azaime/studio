// src/ai/flows/appointment-suggestions.ts
'use server';
/**
 * @fileOverview Provides AI-powered suggestions for optimal appointment times.
 *
 * - `getAppointmentSuggestions` - A function that suggests appointment times based on doctor availability, patient history, and appointment type.
 * - `AppointmentSuggestionsInput` - The input type for the `getAppointmentSuggestions` function.
 * - `AppointmentSuggestionsOutput` - The return type for the `getAppointmentSuggestions` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AppointmentSuggestionsInputSchema = z.object({
  doctorId: z.string().describe('The ID of the doctor.'),
  patientId: z.string().describe('The ID of the patient.'),
  appointmentType: z.string().describe('The type of appointment (e.g., consultation, follow-up).'),
  requestedDate: z.string().describe('The date for which the appointment is requested (YYYY-MM-DD).'),
});
export type AppointmentSuggestionsInput = z.infer<typeof AppointmentSuggestionsInputSchema>;

const AppointmentSuggestionsOutputSchema = z.object({
  suggestedTimes: z.array(
    z.string().describe('A list of suggested appointment times (HH:mm).')
  ).describe('Suggested appointment times based on availability and patient history.'),
});
export type AppointmentSuggestionsOutput = z.infer<typeof AppointmentSuggestionsOutputSchema>;

export async function getAppointmentSuggestions(input: AppointmentSuggestionsInput): Promise<AppointmentSuggestionsOutput> {
  return appointmentSuggestionsFlow(input);
}

const appointmentSuggestionsPrompt = ai.definePrompt({
  name: 'appointmentSuggestionsPrompt',
  input: {schema: AppointmentSuggestionsInputSchema},
  output: {schema: AppointmentSuggestionsOutputSchema},
  prompt: `You are an AI assistant specialized in scheduling appointments for a hospital.

  Based on the doctor's availability, the patient's history, and the requested appointment type and date, suggest three optimal appointment times.

  Doctor ID: {{{doctorId}}}
  Patient ID: {{{patientId}}}
  Appointment Type: {{{appointmentType}}}
  Requested Date: {{{requestedDate}}}

  Consider typical appointment durations for the given appointment type and avoid double-booking the doctor.

  Return only the suggested times in the format HH:mm.`,
});

const appointmentSuggestionsFlow = ai.defineFlow(
  {
    name: 'appointmentSuggestionsFlow',
    inputSchema: AppointmentSuggestionsInputSchema,
    outputSchema: AppointmentSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await appointmentSuggestionsPrompt(input);
    return output!;
  }
);
