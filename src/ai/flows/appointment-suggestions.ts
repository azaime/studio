// src/ai/flows/appointment-suggestions.ts
'use server';
/**
 * @fileOverview Fournit des suggestions basées sur l'IA pour les heures de rendez-vous optimales.
 *
 * - `getAppointmentSuggestions` - Une fonction qui suggère des heures de rendez-vous en fonction de la disponibilité du médecin, de l'historique du patient et du type de rendez-vous.
 * - `AppointmentSuggestionsInput` - Le type d'entrée pour la fonction `getAppointmentSuggestions`.
 * - `AppointmentSuggestionsOutput` - Le type de retour pour la fonction `getAppointmentSuggestions`.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AppointmentSuggestionsInputSchema = z.object({
  doctorId: z.string().describe('L\'ID du médecin.'),
  patientId: z.string().describe('L\'ID du patient.'),
  appointmentType: z.string().describe('Le type de rendez-vous (par exemple, consultation, suivi).'),
  requestedDate: z.string().describe('La date pour laquelle le rendez-vous est demandé (AAAA-MM-JJ).'),
});
export type AppointmentSuggestionsInput = z.infer<typeof AppointmentSuggestionsInputSchema>;

const AppointmentSuggestionsOutputSchema = z.object({
  suggestedTimes: z.array(
    z.string().describe('Une liste d\'heures de rendez-vous suggérées (HH:mm).')
  ).describe('Heures de rendez-vous suggérées en fonction de la disponibilité et de l\'historique du patient.'),
});
export type AppointmentSuggestionsOutput = z.infer<typeof AppointmentSuggestionsOutputSchema>;

export async function getAppointmentSuggestions(input: AppointmentSuggestionsInput): Promise<AppointmentSuggestionsOutput> {
  return appointmentSuggestionsFlow(input);
}

const appointmentSuggestionsPrompt = ai.definePrompt({
  name: 'appointmentSuggestionsPrompt',
  input: {schema: AppointmentSuggestionsInputSchema},
  output: {schema: AppointmentSuggestionsOutputSchema},
  prompt: `Vous êtes un assistant IA spécialisé dans la planification de rendez-vous pour un hôpital.

  En vous basant sur la disponibilité du médecin, l'historique du patient et le type et la date de rendez-vous demandés, suggérez trois heures de rendez-vous optimales.

  ID du médecin: {{{doctorId}}}
  ID du patient: {{{patientId}}}
  Type de rendez-vous: {{{appointmentType}}}
  Date demandée: {{{requestedDate}}}

  Tenez compte des durées de rendez-vous typiques pour le type de rendez-vous donné et évitez la double réservation du médecin.

  Retournez uniquement les heures suggérées au format HH:mm.`,
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
