
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Syringe, ToyBrick, PlusCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';
import { RegisterPatientDialog } from '@/components/patients/register-patient-dialog';
import type { Patient } from '@/lib/types';
import { patients as initialPatients } from '@/lib/data';

export default function PediatricsPage() {
    const { toast } = useToast();
    const [isRegisteringPatient, setIsRegisteringPatient] = useState(false);
    const [patients, setPatients] = useState<Patient[]>(initialPatients);

    const addPatient = (newPatient: Omit<Patient, 'id' | 'lastVisit'>) => {
        setPatients(prev => [
            { 
                ...newPatient, 
                id: `PAT${Date.now()}`,
                lastVisit: new Date().toISOString().split('T')[0]
            }, 
            ...prev
        ]);
      };

    const handleManageVaccines = () => {
        toast({
            title: "Fonctionnalité à venir",
            description: "La gestion des vaccins sera bientôt disponible.",
        });
    }

    const handleFeatureComingSoon = (featureName: string) => {
        toast({
            title: "Fonctionnalité à venir",
            description: `La section '${featureName}' sera bientôt disponible.`,
        });
    }

  return (
    <>
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Service de Pédiatrie</h1>
                    <p className="text-muted-foreground">Soins spécialisés pour les enfants et les nourrissons.</p>
                </div>
                <Button onClick={() => setIsRegisteringPatient(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Ajouter un patient
                </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                <CardHeader>
                    <CardTitle>Occupation des lits</CardTitle>
                    <CardDescription>Taux d'occupation actuel en pédiatrie.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">85%</div>
                    <Progress value={85} className="mt-2"/>
                    <p className="text-xs text-muted-foreground mt-1">17 lits occupés sur 20</p>
                </CardContent>
                </Card>
                <Card>
                <CardHeader>
                    <CardTitle>Calendrier de vaccination</CardTitle>
                    <CardDescription>Suivi des campagnes de vaccination.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <div className="flex justify-between"><span>BCG</span> <Badge variant="secondary">À jour</Badge></div>
                    <div className="flex justify-between"><span>Polio</span> <Badge>En cours</Badge></div>
                    <div className="flex justify-between"><span>Rougeole</span> <Badge variant="outline">À venir</Badge></div>
                    <Button size="sm" className="mt-2" onClick={handleManageVaccines}><Syringe className="mr-2 h-4 w-4"/> Gérer les vaccins</Button>
                </CardContent>
                </Card>
                <Card>
                <CardHeader>
                    <CardTitle>Ressources rapides</CardTitle>
                    <CardDescription>Accès rapide aux dossiers et salles.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <Button variant="outline" onClick={() => handleFeatureComingSoon('Dossiers pédiatriques')}><FileText className="mr-2 h-4 w-4"/> Dossiers pédiatriques</Button>
                    <Button variant="outline" onClick={() => handleFeatureComingSoon('Gestion de la salle de jeux')}><ToyBrick className="mr-2 h-4 w-4"/> Gérer la salle de jeux</Button>
                </CardContent>
                </Card>
            </div>
        </div>
        <RegisterPatientDialog open={isRegisteringPatient} onOpenChange={setIsRegisteringPatient} onPatientRegistered={addPatient} />
    </>
  );
}
