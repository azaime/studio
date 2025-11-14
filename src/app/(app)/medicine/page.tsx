
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { appointments, patients } from "@/lib/data";
import { format } from 'date-fns';
import { AddReportDialog } from '@/components/medicine/add-report-dialog';
import { ResourceDialog } from '@/components/medicine/resource-dialog';

export default function MedicinePage() {
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isResourceDialogOpen, setIsResourceDialogOpen] = useState(false);
  const [resourceContent, setResourceContent] = useState({ title: '', content: '' });

  const today = format(new Date(), 'yyyy-MM-dd');
  const dailyConsultations = appointments.filter(a => a.date === today).length;
  const waitingPatients = appointments.filter(a => a.date === today && a.status === 'Programmé').length;

  const handleResourceClick = (resourceName: string) => {
    if (resourceName === 'Protocoles cliniques') {
      setResourceContent({
        title: 'Protocoles cliniques',
        content: "1. Protocole de prise en charge du paludisme simple...\n2. Protocole de gestion de l'hypertension artérielle..."
      });
    } else {
      setResourceContent({
        title: 'Base de données médicaments',
        content: "Paracétamol: Antalgique, antipyrétique. Posologie standard: 500mg à 1g toutes les 4-6 heures...\nAmoxicilline: Antibiotique. Indication: infections bactériennes..."
      });
    }
    setIsResourceDialogOpen(true);
  };

  return (
    <>
      <div className="space-y-6">
          <div className="flex justify-between items-center">
              <div>
                  <h1 className="text-2xl font-bold tracking-tight">Service de Médecine Générale</h1>
                  <p className="text-muted-foreground">Prise en charge globale des patients et soins primaires.</p>
              </div>
              <Button onClick={() => setIsReportDialogOpen(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Ajouter un rapport
              </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
               <Card>
                <CardHeader>
                  <CardTitle>Consultations du jour</CardTitle>
                  <CardDescription>Aperçu des consultations en médecine générale.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{dailyConsultations}</div>
                  <p className="text-xs text-muted-foreground">Pour aujourd'hui</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Patients en attente</CardTitle>
                  <CardDescription>Patients attendant une consultation.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{waitingPatients}</div>
                   <p className="text-xs text-muted-foreground">Temps d'attente moyen: 15min</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Ressources</CardTitle>
                  <CardDescription>Liens rapides et outils pour le personnel.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <Button variant="outline" onClick={() => handleResourceClick('Protocoles cliniques')}>Protocoles cliniques</Button>
                  <Button variant="outline" onClick={() => handleResourceClick('Base de données médicaments')}>Base de données médicaments</Button>
                </CardContent>
              </Card>
          </div>
      </div>
      <AddReportDialog 
        open={isReportDialogOpen}
        onOpenChange={setIsReportDialogOpen}
        patients={patients}
      />
      <ResourceDialog
        open={isResourceDialogOpen}
        onOpenChange={setIsResourceDialogOpen}
        title={resourceContent.title}
        content={resourceContent.content}
      />
    </>
  );
}
