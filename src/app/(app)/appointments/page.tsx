
"use client"

import { useState } from 'react';
import { AppointmentList } from "@/components/appointments/appointment-list";
import { appointments as initialAppointments } from "@/lib/data";
import type { Appointment } from '@/lib/types';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);

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

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold tracking-tight">Rendez-vous</h1>
        <p className="text-muted-foreground">
          Planifiez et gérez tous les rendez-vous des patients.
        </p>
      </div>
      <AppointmentList appointments={appointments} addAppointment={addAppointment} />
    </div>
  );
}
