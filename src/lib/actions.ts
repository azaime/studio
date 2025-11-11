"use server";

import { getAppointmentSuggestions, type AppointmentSuggestionsInput } from "@/ai/flows/appointment-suggestions";
import { z } from "zod";

const schema = z.object({
  doctorId: z.string().min(1, "Doctor selection is required."),
  patientId: z.string().min(1, "Patient selection is required."),
  appointmentType: z.string().min(1, "Appointment type is required."),
  requestedDate: z.string().min(1, "Date is required."),
});

export async function fetchAppointmentSuggestions(input: AppointmentSuggestionsInput) {
  const validatedInput = schema.safeParse(input);

  if (!validatedInput.success) {
    return { error: "Invalid input.", details: validatedInput.error.flatten() };
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
    return { data: ['09:00', '11:00', '14:30'], error: "AI suggestion failed, providing default slots." };
  }
}
