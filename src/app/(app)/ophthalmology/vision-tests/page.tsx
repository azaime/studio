
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialVisionTests = [
    { id: 'VT001', patientName: 'Awa Gueye', date: '2024-07-20', result: '20/20 OD, 20/25 OS' },
    { id: 'VT002', patientName: 'Mamadou Diallo', date: '2024-07-19', result: '20/30 OD, 20/30 OS' },
];

export default function VisionTestsPage() {
    const { toast } = useToast();

    const handleAddTest = () => {
        toast({
            title: "Fonctionnalité à venir",
            description: "L'ajout d'un nouveau test de vision sera bientôt disponible.",
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Tests de Vision</h1>
                    <p className="text-muted-foreground">Consultez et gérez les résultats des tests de vision.</p>
                </div>
                <Button onClick={handleAddTest}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Ajouter un test
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Résultats des tests</CardTitle>
                    <CardDescription>Liste des derniers tests de vision effectués.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Patient</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Résultat (OD/OS)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {initialVisionTests.map(test => (
                                <TableRow key={test.id}>
                                    <TableCell className="font-medium">{test.patientName}</TableCell>
                                    <TableCell>{test.date}</TableCell>
                                    <TableCell>{test.result}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
