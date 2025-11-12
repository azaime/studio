
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ultrasoundSchedule = [
    { time: "09:00", patient: "Fatou Kiné", exam: "Échographie abdominale" },
    { time: "09:45", patient: "Moussa Fall", exam: "Échographie pelvienne" },
    { time: "10:30", patient: "Astou Ndiaye", exam: "Échographie obstétricale T1" },
    { time: "11:15", patient: "Patient suivant...", exam: "En attente" },
]

export default function UltrasoundPage() {
  const { toast } = useToast();

  const handleAddExam = () => {
    toast({
        title: "Fonctionnalité à venir",
        description: "L'ajout d'examens d'échographie sera bientôt disponible.",
    });
  }

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Service d'Échographie</h1>
                <p className="text-muted-foreground">Agenda du jour pour les examens d'échographie médicale.</p>
            </div>
            <Button onClick={handleAddExam}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Ajouter un examen
            </Button>
        </div>
        <Card>
        <CardHeader>
            <CardTitle>Agenda du jour</CardTitle>
            <CardDescription>
            Liste des examens d'échographie pour aujourd'hui.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Heure</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Examen</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {ultrasoundSchedule.map((item) => (
                        <TableRow key={item.time}>
                            <TableCell className="font-medium">{item.time}</TableCell>
                            <TableCell>{item.patient}</TableCell>
                            <TableCell>{item.exam}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
        </Card>
    </div>
  );
}
