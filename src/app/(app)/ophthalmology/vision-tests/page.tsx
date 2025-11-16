
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AddVisionTestDialog } from '@/components/ophthalmology/add-vision-test-dialog';
import { patients } from '@/lib/data';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type VisionTest = {
    id: string;
    patientName: string;
    date: string;
    result: string;
};

const initialVisionTests: VisionTest[] = [
    { id: 'VT001', patientName: 'Awa Gueye', date: '2024-07-20', result: '20/20 OD, 20/25 OS' },
    { id: 'VT002', patientName: 'Mamadou Diallo', date: '2024-07-19', result: '20/30 OD, 20/30 OS' },
];

export default function VisionTestsPage() {
    const { toast } = useToast();
    const [visionTests, setVisionTests] = useState<VisionTest[]>(initialVisionTests);
    const [isAddTestDialogOpen, setIsAddTestDialogOpen] = useState(false);
    const [editingTest, setEditingTest] = useState<VisionTest | null>(null);

    const handleOpenCreateDialog = () => {
        setEditingTest(null);
        setIsAddTestDialogOpen(true);
    };
    
    const handleOpenEditDialog = (test: VisionTest) => {
        setEditingTest(test);
        setIsAddTestDialogOpen(true);
    };

    const handleDialogClose = (open: boolean) => {
        if (!open) {
            setEditingTest(null);
        }
        setIsAddTestDialogOpen(open);
    }

    const handleTestSaved = (testData: Omit<VisionTest, 'id'> & { id?: string }) => {
        if (testData.id) { // Editing existing test
            setVisionTests(prev => prev.map(t => t.id === testData.id ? { ...t, ...testData } as VisionTest : t));
            toast({
                title: "Test de vision mis à jour",
                description: `Le test pour ${testData.patientName} a été mis à jour.`,
            });
        } else { // Creating new test
             const testToAdd: VisionTest = {
                ...testData,
                id: `VT${Date.now()}`,
            };
            setVisionTests(prev => [testToAdd, ...prev]);
            toast({
                title: "Test de vision ajouté",
                description: `Le test pour ${testData.patientName} a été ajouté.`,
            });
        }
    };
    
    const handleViewDetails = (test: VisionTest) => {
        toast({
            title: `Détails pour ${test.patientName}`,
            description: `Date: ${test.date}, Résultat: ${test.result}`
        });
    }

    return (
        <>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Tests de Vision</h1>
                        <p className="text-muted-foreground">Consultez et gérez les résultats des tests de vision.</p>
                    </div>
                    <Button onClick={handleOpenCreateDialog}>
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
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {visionTests.map(test => (
                                    <TableRow key={test.id}>
                                        <TableCell className="font-medium">{test.patientName}</TableCell>
                                        <TableCell>{test.date}</TableCell>
                                        <TableCell>{test.result}</TableCell>
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
                                                    <DropdownMenuItem onClick={() => handleViewDetails(test)}>Voir les détails</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleOpenEditDialog(test)}>Modifier</DropdownMenuItem>
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
            <AddVisionTestDialog
                open={isAddTestDialogOpen}
                onOpenChange={handleDialogClose}
                patients={patients}
                onTestSaved={handleTestSaved}
                test={editingTest}
            />
        </>
    );
}
