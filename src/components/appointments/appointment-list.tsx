"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, CalendarPlus } from "lucide-react";
import { appointments, patients, doctors } from "@/lib/data";
import { ScheduleAppointmentDialog } from './schedule-appointment-dialog';
import { cn } from '@/lib/utils';

export function AppointmentList() {
    const [isScheduling, setIsScheduling] = useState(false);

    const getStatusVariant = (status: 'Programmé' | 'Terminé' | 'Annulé') => {
        switch (status) {
            case 'Programmé': return 'default';
            case 'Terminé': return 'secondary';
            case 'Annulé': return 'destructive';
            default: return 'outline';
        }
    }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
              <div>
                  <CardTitle>Tous les rendez-vous</CardTitle>
                  <CardDescription>Une liste de tous les rendez-vous programmés.</CardDescription>
              </div>
              <Button onClick={() => setIsScheduling(true)}>
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  Planifier un rendez-vous
              </Button>
          </div>
          <div className="flex items-center justify-between pt-4">
            <Input placeholder="Rechercher par nom de patient..." className="max-w-sm" />
            {/* Add more filters here if needed, e.g., by date or status */}
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Docteur</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date & Heure</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">{appointment.patientName}</TableCell>
                    <TableCell>{appointment.doctorName}</TableCell>
                    <TableCell>{appointment.service}</TableCell>
                    <TableCell>{appointment.date} à {appointment.time}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(appointment.status)}>{appointment.status}</Badge>
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
                          <DropdownMenuItem>Voir les détails</DropdownMenuItem>
                          <DropdownMenuItem>Replanifier</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Annuler</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <ScheduleAppointmentDialog open={isScheduling} onOpenChange={setIsScheduling} patients={patients} doctors={doctors} />
    </>
  );
}
