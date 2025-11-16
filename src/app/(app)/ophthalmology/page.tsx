
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, PlusCircle, List, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScheduleAppointmentDialog } from '@/components/appointments/schedule-appointment-dialog';
import { patients, doctors } from '@/lib/data';
import type { Appointment } from '@/lib/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';

export default function OphthalmologyPage() {
  const { toast } = useToast();
  const [isScheduling, setIsScheduling] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);


  const handleFeatureComingSoon = (feature: string) => {
    toast({
        title: "Fonctionnalité à venir",
        description: `La fonctionnalité '${feature}' sera bientôt disponible.`,
    });
  };

  const handleAppointmentScheduled = (newAppointment: Omit<Appointment, 'id' | 'status'> & { id?: string }) => {
    if (editingAppointment) {
      setAppointments(prev => prev.map(app => app.id === editingAppointment.id ? { ...app, ...newAppointment } as Appointment : app));
      toast({
        title: 'Rendez-vous mis à jour',
        description: `Le rendez-vous pour ${newAppointment.patientName} a été mis à jour.`,
      });
    } else {
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
    }
    handleDialogClose(false);
  };
  
  const handleOpenEditDialog = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setIsScheduling(true);
  };

  const handleOpenCreateDialog = () => {
    setEditingAppointment(null);
    setIsScheduling(true);
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setEditingAppointment(null);
    }
    setIsScheduling(open);
  }
  
  const handleViewDetails = (appointment: Appointment) => {
    toast({
        title: "Détails du rendez-vous",
        description: `Patient: ${appointment.patientName}, Docteur: ${appointment.doctorName}, le ${appointment.date} à ${appointment.time}. Statut: ${appointment.status}`
    })
  }

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
            <Button onClick={handleOpenCreateDialog}>
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
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Patient</TableHead>
                              <TableHead>Docteur</TableHead>
                              <TableHead>Date & Heure</TableHead>
                              <TableHead>Statut</TableHead>
                              <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {appointments.map(app => (
                                <TableRow key={app.id}>
                                    <TableCell>{app.patientName}</TableCell>
                                    <TableCell>{app.doctorName}</TableCell>
                                    <TableCell>{app.date} à {app.time}</TableCell>
                                    <TableCell><Badge variant="default">{app.status}</Badge></TableCell>
                                    <TableCell>
                                      <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                          <Button aria-haspopup="true" size="icon" variant="ghost">
                                              <MoreHorizontal className="h-4 w-4" />
                                              <span className="sr-only">Menu</span>
                                          </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent align="end">
                                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                              <DropdownMenuItem onClick={() => handleViewDetails(app)}>Voir les détails</DropdownMenuItem>
                                              <DropdownMenuItem onClick={() => handleOpenEditDialog(app)}>Modifier</DropdownMenuItem>
                                          </DropdownMenuContent>
                                      </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                    ) : (
                        <p className="text-center text-muted-foreground">Aucune consultation à venir pour le moment.</p>
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
        onOpenChange={handleDialogClose}
        patients={patients}
        doctors={doctors}
        onAppointmentScheduled={handleAppointmentScheduled}
        appointment={editingAppointment || undefined}
      />
    </>
  );
}
