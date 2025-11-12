"use server";

import { getAppointmentSuggestions, type AppointmentSuggestionsInput } from "@/ai/flows/appointment-suggestions";
import { z } from "zod";

const schema = z.object({
  doctorId: z.string().min(1, "La sélection du médecin est requise."),
  patientId: z.string().min(1, "La sélection du patient est requise."),
  appointmentType: z.string().min(1, "Le type de rendez-vous est requis."),
  requestedDate: z.string().min(1, "La date est requise."),
});

export async function fetchAppointmentSuggestions(input: AppointmentSuggestionsInput) {
  const validatedInput = schema.safeParse(input);

  if (!validatedInput.success) {
    return { error: "Entrée invalide.", details: validatedInput.error.flatten() };
  }

  try {
    // In a real app, you would check for doctor's availability from a database here
    // before calling the AI model.
    
    const suggestions = await getAppointmentSuggestions(validatedInput.data);
    
    // Simulate a short delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (!suggestions.suggestedTimes || suggestions.suggestedTimes.length === 0) {
      return { data: ['09:00', '11:00', '14:30'] }; // fallback data
    }

    return { data: suggestions.suggestedTimes };
  } catch (e) {
    console.error(e);
    // Returning fallback data in case of an error with the AI model
    return { data: ['09:00', '11:00', '14:30'], error: "La suggestion de l'IA a échoué, fourniture de créneaux par défaut." };
  }
}
