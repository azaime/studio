

"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Baby, BedDouble, Stethoscope, PlusCircle, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RegisterPatientDialog } from '@/components/patients/register-patient-dialog';
import type { Patient, UpcomingDelivery } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EditDeliveryDialog } from '@/components/maternity/edit-delivery-dialog';


const maternityData = {
    stats: [
        { title: "Patientes actuelles", value: "12", icon: BedDouble },
        { title: "Naissances aujourd'hui", value: "3", icon: Baby },
        { title: "Consultations prénatales", value: "25", icon: Stethoscope },
    ],
    upcomingDeliveries: [
        { patient: "Aïssatou Ba", term: "39 sem.", status: "Programmé" as UpcomingDelivery['status'] },
        { patient: "Marième Fall", term: "40 sem.", status: "Observation" as UpcomingDelivery['status'] },
        { patient: "Ndeye Diop", term: "38 sem.", status: "Programmé" as UpcomingDelivery['status'] },
    ]
}

export default function MaternityPage() {
  const [isRegisteringPatient, setIsRegisteringPatient] = useState(false);
  const [deliveries, setDeliveries] = useState<UpcomingDelivery[]>(maternityData.upcomingDeliveries);
  const [editingDelivery, setEditingDelivery] = useState<UpcomingDelivery | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const handlePatientRegistered = (newPatient: Omit<Patient, 'id' | 'lastVisit'>) => {
    // In a real application, you would likely add this patient to a global state
    // or refetch the patient list. For now, we'll just show a confirmation.
    console.log("New patient registered in maternity:", newPatient);
     toast({
        title: "Patiente ajoutée",
        description: `${newPatient.name} a été enregistrée dans le service de maternité.`,
    });
  };

  const handleOpenEditDialog = (delivery: UpcomingDelivery) => {
    setEditingDelivery(delivery);
    setIsEditDialogOpen(true);
  };

  const handleDeliverySaved = (updatedDelivery: UpcomingDelivery) => {
    setDeliveries(prev => prev.map(d => d.patient === updatedDelivery.patient ? updatedDelivery : d));
    toast({
      title: "Statut mis à jour",
      description: `Le statut pour ${updatedDelivery.patient} est maintenant "${updatedDelivery.status}".`,
    });
  };

  const getStatusBadgeVariant = (status: UpcomingDelivery['status']) => {
    switch (status) {
        case "Observation": return "destructive";
        case "Admis": return "default";
        default: return "secondary";
    }
  }

  const handleViewDetails = (delivery: UpcomingDelivery) => {
    toast({
        title: `Détails pour ${delivery.patient}`,
        description: `Terme: ${delivery.term}, Statut: ${delivery.status}`
    });
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
                          <TableHead><span className="sr-only">Actions</span></TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {deliveries.map(delivery => (
                          <TableRow key={delivery.patient}>
                              <TableCell className="font-medium">{delivery.patient}</TableCell>
                              <TableCell>{delivery.term}</TableCell>
                              <TableCell>
                                  <Badge variant={getStatusBadgeVariant(delivery.status)}>{delivery.status}</Badge>
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
                                        <DropdownMenuItem onClick={() => handleViewDetails(delivery)}>Voir les détails</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleOpenEditDialog(delivery)}>Modifier</DropdownMenuItem>
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
      <RegisterPatientDialog 
        open={isRegisteringPatient} 
        onOpenChange={setIsRegisteringPatient} 
        onPatientSaved={handlePatientRegistered} 
      />
      <EditDeliveryDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        delivery={editingDelivery}
        onDeliverySaved={handleDeliverySaved}
      />
    </>
  );
}
