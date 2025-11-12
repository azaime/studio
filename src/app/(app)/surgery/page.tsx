import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const plannedSurgeries = [
    { id: "SURG-001", patient: "Mamadou Diallo", surgery: "Appendicectomie", date: "2024-08-15", surgeon: "Dr. Fall", status: "Planifiée" },
    { id: "SURG-002", patient: "Awa Gueye", surgery: "Chirurgie de la cataracte", date: "2024-08-16", surgeon: "Dr. Diop", status: "Planifiée" },
    { id: "SURG-003", patient: "Ibrahima Camara", surgery: "Hernie inguinale", date: "2024-08-14", surgeon: "Dr. Fall", status: "Terminée" },
]

export default function SurgeryPage() {
  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Département de Chirurgie</h1>
                <p className="text-muted-foreground">Planification et gestion des interventions chirurgicales.</p>
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Planifier une intervention
            </Button>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Bloc opératoire</CardTitle>
                <CardDescription>Liste des interventions planifiées.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Patient</TableHead>
                            <TableHead>Intervention</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Chirurgien</TableHead>
                            <TableHead>Statut</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {plannedSurgeries.map((surgery) => (
                            <TableRow key={surgery.id}>
                                <TableCell className="font-medium">{surgery.patient}</TableCell>
                                <TableCell>{surgery.surgery}</TableCell>
                                <TableCell>{surgery.date}</TableCell>
                                <TableCell>{surgery.surgeon}</TableCell>
                                <TableCell>
                                    <Badge variant={surgery.status === 'Terminée' ? 'secondary' : 'default'}>
                                        {surgery.status}
                                    </Badge>
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
