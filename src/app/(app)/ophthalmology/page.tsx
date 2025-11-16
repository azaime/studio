
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, PlusCircle, List } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScheduleAppointmentDialog } from '@/components/appointments/schedule-appointment-dialog';
import { patients, doctors } from '@/lib/data';
import type { Appointment } from '@/lib/types';

export default function OphthalmologyPage() {
  const { toast } = useToast();
  const [isScheduling, setIsScheduling] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleFeatureComingSoon = (feature: string) => {
    toast({
        title: "Fonctionnalité à venir",
        description: `La fonctionnalité '${feature}' sera bientôt disponible.`,
    });
  };

  const handleAppointmentScheduled = (newAppointment: Omit<Appointment, 'id' | 'status'>) => {
    const appointmentData: Appointment = {
      ...newAppointment,
      id: `APP-OPHT-${Date.now()}`,
      status: 'Programmé'
    };
    setAppointments(prev => [...prev, appointmentData]);
    toast({
      title: 'Rendez-vous planifié',
      description: `Le rendez-vous pour ${newAppointment.patientName} a été créé.`,
    });
  };

  return (
    <>
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Service d'Ophtalmologie</h1>
                <p className="text-muted-foreground">
                    Soins des yeux, traitements médicaux et chirurgicaux des maladies oculaires.
                </p>
            </div>
            <Button onClick={() => setIsScheduling(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nouvelle consultation
            </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Consultations à venir</CardTitle>
                    <CardDescription>Liste des prochains rendez-vous en ophtalmologie.</CardDescription>
                </CardHeader>
                <CardContent>
                    {appointments.length > 0 ? (
                        <ul>
                            {appointments.map(app => (
                                <li key={app.id}>{app.patientName} avec {app.doctorName} le {app.date}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>Aucune consultation à venir pour le moment.</p>
                    )}
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Actions rapides</CardTitle>
                    <CardDescription>Raccourcis pour les tâches courantes.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <Button variant="secondary" onClick={() => handleFeatureComingSoon('Gérer les tests de vision')}>
                        <Eye className="mr-2 h-4 w-4" />
                        Gérer les tests de vision
                    </Button>
                    <Button variant="outline" onClick={() => handleFeatureComingSoon('Voir la liste d\'attente chirurgicale')}>
                        <List className="mr-2 h-4 w-4" />
                        Voir la liste d'attente chirurgicale
                    </Button>
                </CardContent>
            </Card>
        </div>
    </div>
    <ScheduleAppointmentDialog
        open={isScheduling}
        onOpenChange={setIsScheduling}
        patients={patients}
        doctors={doctors}
        onAppointmentScheduled={handleAppointmentScheduled}
      />
    </>
  );
}
