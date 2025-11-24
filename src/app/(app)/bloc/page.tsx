
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { ScheduleAppointmentDialog } from '@/components/appointments/schedule-appointment-dialog';
import { patients as initialPatients, doctors } from '@/lib/data';
import type { Appointment, Patient } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type SurgeryStatus = 'Planifiée' | 'Terminée';

const plannedSurgeriesData = [
    { id: "SURG-001", patientName: "Mamadou Diallo", patientId: "PAT002", surgery: "Appendicectomie", date: "2024-08-15", time: "08:00", doctorName: "Dr. Fall", status: "Planifiée" as SurgeryStatus },
    { id: "SURG-002", patientName: "Awa Gueye", patientId: "PAT005", surgery: "Chirurgie de la cataracte", date: "2024-08-16", time: "10:00", doctorName: "Dr. Diop", status: "Planifiée" as SurgeryStatus },
    { id: "SURG-003", patientName: "Ibrahima Camara", patientId: "PAT004", surgery: "Hernie inguinale", date: "2024-08-14", time: "13:00", doctorName: "Dr. Fall", status: "Terminée" as SurgeryStatus },
]

type PlannedSurgery = typeof plannedSurgeriesData[0];

export default function BlocPage() {
  const [isScheduling, setIsScheduling] = useState(false);
  const [editingSurgery, setEditingSurgery] = useState<Appointment | null>(null);
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [plannedSurgeries, setPlannedSurgeries] = useState(plannedSurgeriesData);
  const { toast } = useToast();

  const handleOpenCreateDialog = () => {
    setEditingSurgery(null);
    setIsScheduling(true);
  };

  const handleOpenEditDialog = (surgery: PlannedSurgery) => {
    const appointmentToEdit: Appointment = {
      id: surgery.id,
      patientId: surgery.patientId,
      patientName: surgery.patientName,
      doctorName: surgery.doctorName,
      service: surgery.surgery,
      date: surgery.date,
      time: surgery.time,
      status: 'Programmé' // Status from Appointment type
    };
    setEditingSurgery(appointmentToEdit);
    setIsScheduling(true);
  };
  
  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setEditingSurgery(null);
    }
    setIsScheduling(open);
  };

  const handleSurgeryScheduled = (newSurgery: Omit<Appointment, 'id' | 'status'> & { id?: string }) => {
     if (editingSurgery) { // Editing
      setPlannedSurgeries(prev => prev.map(s => s.id === editingSurgery.id ? { ...s, patientName: newSurgery.patientName, patientId: newSurgery.patientId, surgery: newSurgery.service, date: newSurgery.date, time: newSurgery.time, doctorName: newSurgery.doctorName } : s));
      toast({
        title: "Intervention mise à jour",
        description: `L'intervention pour ${newSurgery.patientName} a été mise à jour.`,
      });
    } else { // Creating
      const surgeryEntry: PlannedSurgery = {
          id: `SURG-${Date.now()}`,
          patientName: newSurgery.patientName,
          patientId: newSurgery.patientId,
          surgery: newSurgery.service,
          date: newSurgery.date,
          time: newSurgery.time,
          doctorName: newSurgery.doctorName,
          status: 'Planifiée'
      };
      setPlannedSurgeries(prev => [surgeryEntry, ...prev]);
      toast({
        title: "Intervention planifiée",
        description: `L'intervention pour ${newSurgery.patientName} a été ajoutée.`,
      });
    }
  };

  const handleUpdateStatus = (surgeryId: string) => {
      setPlannedSurgeries(prev => prev.map(s => s.id === surgeryId ? {...s, status: s.status === 'Planifiée' ? 'Terminée' : 'Planifiée' } : s));
      toast({
          title: "Statut mis à jour",
          description: `Le statut de l'intervention a été modifié.`
      });
  }
  
  const handleViewDetails = (surgery: PlannedSurgery) => {
      toast({
          title: `Détails pour ${surgery.patientName}`,
          description: `${surgery.surgery} par ${surgery.doctorName} le ${surgery.date} à ${surgery.time}.`
      })
  }

  return (
    <>
      <div className="space-y-6">
          <div className="flex justify-between items-center">
              <div>
                  <h1 className="text-2xl font-bold tracking-tight">Bloc Opératoire</h1>
                  <p className="text-muted-foreground">Planification et gestion des interventions chirurgicales.</p>
              </div>
              <Button onClick={handleOpenCreateDialog}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Planifier une intervention
              </Button>
          </div>
          <Card>
              <CardHeader>
                  <CardTitle>Programme du bloc opératoire</CardTitle>
                  <CardDescription>Liste des interventions planifiées.</CardDescription>
              </CardHeader>
              <CardContent>
                  <Table>
                      <TableHeader>
                          <TableRow>
                              <TableHead>Patient</TableHead>
                              <TableHead>Intervention</TableHead>
                              <TableHead>Date & Heure</TableHead>
                              <TableHead>Chirurgien</TableHead>
                              <TableHead>Statut</TableHead>
                              <TableHead><span className="sr-only">Actions</span></TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {plannedSurgeries.map((surgery) => (
                              <TableRow key={surgery.id}>
                                  <TableCell className="font-medium">{surgery.patientName}</TableCell>
                                  <TableCell>{surgery.surgery}</TableCell>
                                  <TableCell>{surgery.date} à {surgery.time}</TableCell>
                                  <TableCell>{surgery.doctorName}</TableCell>
                                  <TableCell>
                                      <Badge variant={surgery.status === 'Terminée' ? 'secondary' : 'default'}>
                                          {surgery.status}
                                      </Badge>
                                  </TableCell>
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
                                            <DropdownMenuItem onClick={() => handleViewDetails(surgery)}>Voir les détails</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleOpenEditDialog(surgery)}>Modifier</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleUpdateStatus(surgery.id)}>
                                                {surgery.status === 'Planifiée' ? "Marquer comme terminée" : "Marquer comme planifiée"}
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </CardContent>
          </Card>
      </div>
       <ScheduleAppointmentDialog
        open={isScheduling}
        onOpenChange={handleDialogClose}
        patients={patients}
        doctors={doctors}
        onAppointmentScheduled={handleSurgeryScheduled}
        appointment={editingSurgery || undefined}
      />
    </>
  );
}
