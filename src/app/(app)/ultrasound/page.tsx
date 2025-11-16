
"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const ultrasoundSchedule = [
    { id: "ULT001", time: "09:00", patient: "Fatou Kiné", exam: "Échographie abdominale", status: "Terminé" },
    { id: "ULT002", time: "09:45", patient: "Moussa Fall", exam: "Échographie pelvienne", status: "En cours" },
    { id: "ULT003", time: "10:30", patient: "Astou Ndiaye", exam: "Échographie obstétricale T1", status: "En attente" },
    { id: "ULT004", time: "11:15", patient: "Patient suivant...", exam: "En attente", status: "À venir" },
];

type UltrasoundExam = typeof ultrasoundSchedule[0];

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case 'Terminé': return 'secondary';
        case 'En cours': return 'default';
        case 'En attente': return 'outline';
        case 'À venir': return 'outline';
        default: return 'default';
    }
}

export default function UltrasoundPage() {
    const { toast } = useToast();

    const handleFeatureComingSoon = (feature: string) => {
        toast({
            title: "Fonctionnalité à venir",
            description: `La fonctionnalité '${feature}' sera bientôt disponible.`,
        });
    };

    const handleViewDetails = (exam: UltrasoundExam) => {
        toast({
            title: `Détails de l'examen pour ${exam.patient}`,
            description: `Heure: ${exam.time}, Examen: ${exam.exam}, Statut: ${exam.status}`
        });
    }

    const handleEdit = (exam: UltrasoundExam) => {
        handleFeatureComingSoon(`La modification de l'examen pour ${exam.patient}`);
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Service d'Échographie</h1>
                    <p className="text-muted-foreground">Agenda du jour pour les examens d'échographie médicale.</p>
                </div>
                <Button onClick={() => handleFeatureComingSoon('Ajouter un examen')}>
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
                                <TableHead>Statut</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ultrasoundSchedule.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.time}</TableCell>
                                    <TableCell>{item.patient}</TableCell>
                                    <TableCell>{item.exam}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusBadgeVariant(item.status)}>{item.status}</Badge>
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
                                                <DropdownMenuItem onClick={() => handleViewDetails(item)}>Voir les détails</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleEdit(item)}>Modifier</DropdownMenuItem>
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
    );
}
