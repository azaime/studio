
"use client"

import { useState } from 'react';
import { AppointmentList } from "@/components/appointments/appointment-list";
import { appointments as initialAppointments } from "@/lib/data";
import type { Appointment } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const { toast } = useToast();

  const addAppointment = (newAppointment: Omit<Appointment, 'id' | 'status'>) => {
    setAppointments(prev => [
        { 
            ...newAppointment, 
            id: `APP${Date.now()}`,
            status: 'Programmé'
        }, 
        ...prev
    ]);
  };

  const updateAppointment = (updatedAppointment: Appointment) => {
    setAppointments(prev => prev.map(app => app.id === updatedAppointment.id ? updatedAppointment : app));
  };

  const cancelAppointment = (appointmentId: string) => {
    setAppointments(prev => prev.map(app => 
        app.id === appointmentId ? { ...app, status: 'Annulé' } : app
    ));
    toast({
        title: "Rendez-vous annulé",
        description: "Le statut du rendez-vous a été mis à jour."
    })
  };

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold tracking-tight">Rendez-vous</h1>
        <p className="text-muted-foreground">
          Planifiez et gérez tous les rendez-vous des patients.
        </p>
      </div>
      <AppointmentList 
        appointments={appointments} 
        addAppointment={addAppointment}
        updateAppointment={updateAppointment} 
        cancelAppointment={cancelAppointment}
      />
    </div>
  );
}
