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

    const getStatusVariant = (status: 'Scheduled' | 'Completed' | 'Cancelled') => {
        switch (status) {
            case 'Scheduled': return 'default';
            case 'Completed': return 'secondary';
            case 'Cancelled': return 'destructive';
            default: return 'outline';
        }
    }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
              <div>
                  <CardTitle>All Appointments</CardTitle>
                  <CardDescription>A list of all scheduled appointments.</CardDescription>
              </div>
              <Button onClick={() => setIsScheduling(true)}>
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  Schedule Appointment
              </Button>
          </div>
          <div className="flex items-center justify-between pt-4">
            <Input placeholder="Search by patient name..." className="max-w-sm" />
            {/* Add more filters here if needed, e.g., by date or status */}
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">{appointment.patientName}</TableCell>
                    <TableCell>{appointment.doctorName}</TableCell>
                    <TableCell>{appointment.service}</TableCell>
                    <TableCell>{appointment.date} at {appointment.time}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(appointment.status)}>{appointment.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Reschedule</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
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
