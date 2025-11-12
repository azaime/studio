
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, UserPlus, CalendarPlus } from 'lucide-react';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { RecentPatients } from '@/components/dashboard/recent-patients';
import { UpcomingAppointments } from '@/components/dashboard/upcoming-appointments';
import { RegisterPatientDialog } from '@/components/patients/register-patient-dialog';
import { ScheduleAppointmentDialog } from '@/components/appointments/schedule-appointment-dialog';
import { patients, doctors } from '@/lib/data';

export default function DashboardPage() {
  const [isRegisteringPatient, setIsRegisteringPatient] = useState(false);
  const [isSchedulingAppointment, setIsSchedulingAppointment] = useState(false);

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
            <p className="text-muted-foreground">
              Aperçu des activités de votre hôpital.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsRegisteringPatient(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Enregistrer un patient
            </Button>
            <Button onClick={() => setIsSchedulingAppointment(true)}>
              <CalendarPlus className="mr-2 h-4 w-4" />
              Nouveau rendez-vous
            </Button>
          </div>
        </div>

        <StatsCards />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <div className="lg:col-span-4">
            <UpcomingAppointments />
          </div>
          <div className="lg:col-span-3">
            <RecentPatients />
          </div>
        </div>
      </div>
      <RegisterPatientDialog open={isRegisteringPatient} onOpenChange={setIsRegisteringPatient} />
      <ScheduleAppointmentDialog open={isSchedulingAppointment} onOpenChange={setIsSchedulingAppointment} patients={patients} doctors={doctors} />
    </>
  );
}
