
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Baby, BedDouble, Stethoscope, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RegisterPatientDialog } from '@/components/patients/register-patient-dialog';
import type { Patient } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const maternityData = {
    stats: [
        { title: "Patientes actuelles", value: "12", icon: BedDouble },
        { title: "Naissances aujourd'hui", value: "3", icon: Baby },
        { title: "Consultations prénatales", value: "25", icon: Stethoscope },
    ],
    upcomingDeliveries: [
        { patient: "Aïssatou Ba", term: "39 sem.", status: "Programmé" },
        { patient: "Marième Fall", term: "40 sem.", status: "Observation" },
        { patient: "Ndeye Diop", term: "38 sem.", status: "Programmé" },
    ]
}

export default function MaternityPage() {
  const [isRegisteringPatient, setIsRegisteringPatient] = useState(false);
  const { toast } = useToast();

  const handlePatientRegistered = (newPatient: Omit<Patient, 'id' | 'lastVisit'>) => {
    // In a real application, you would likely add this patient to a global state
    // or refetch the patient list. For now, we'll just show a confirmation.
    console.log("New patient registered in maternity:", newPatient);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Service de Maternité</h1>
            <p className="text-muted-foreground">Gestion des patientes, des naissances et des soins prénatals.</p>
          </div>
          <Button onClick={() => setIsRegisteringPatient(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter une patiente
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {maternityData.stats.map(stat => (
              <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                      <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
              </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
              <CardTitle>Accouchements à venir</CardTitle>
              <CardDescription>Liste des patientes proches de leur terme.</CardDescription>
          </CardHeader>
          <CardContent>
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead>Patiente</TableHead>
                          <TableHead>Terme</TableHead>
                          <TableHead>Statut</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {maternityData.upcomingDeliveries.map(delivery => (
                          <TableRow key={delivery.patient}>
                              <TableCell className="font-medium">{delivery.patient}</TableCell>
                              <TableCell>{delivery.term}</TableCell>
                              <TableCell>
                                  <Badge variant={delivery.status === "Observation" ? "destructive" : "default"}>{delivery.status}</Badge>
                              </TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </CardContent>
        </Card>
      </div>
      <RegisterPatientDialog 
        open={isRegisteringPatient} 
        onOpenChange={setIsRegisteringPatient} 
        onPatientRegistered={handlePatientRegistered} 
      />
    </>
  );
}
