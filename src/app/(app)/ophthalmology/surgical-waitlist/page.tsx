
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const surgicalWaitlist = [
    { id: 'SWL001', patientName: 'Ibrahima Fall', surgery: 'Cataracte', priority: 'Haute', dateAdded: '2024-07-15' },
    { id: 'SWL002', patientName: 'Ndeye Khady Diop', surgery: 'Glaucome', priority: 'Moyenne', dateAdded: '2024-07-18' },
    { id: 'SWL003', patientName: 'Cheikh Anta Sylla', surgery: 'Ptosis', priority: 'Basse', dateAdded: '2024-07-20' },
];

const getPriorityBadge = (priority: string) => {
    switch (priority) {
        case 'Haute': return 'destructive';
        case 'Moyenne': return 'default';
        case 'Basse': return 'secondary';
        default: return 'outline';
    }
}

export default function SurgicalWaitlistPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Liste d'attente chirurgicale</h1>
                <p className="text-muted-foreground">Patients en attente d'une intervention chirurgicale en ophtalmologie.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Liste d'attente</CardTitle>
                    <CardDescription>Gestion des priorités pour les interventions à venir.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Patient</TableHead>
                                <TableHead>Intervention</TableHead>
                                <TableHead>Priorité</TableHead>
                                <TableHead>Date d'ajout</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {surgicalWaitlist.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.patientName}</TableCell>
                                    <TableCell>{item.surgery}</TableCell>
                                    <TableCell>
                                        <Badge variant={getPriorityBadge(item.priority)}>{item.priority}</Badge>
                                    </TableCell>
                                    <TableCell>{item.dateAdded}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
