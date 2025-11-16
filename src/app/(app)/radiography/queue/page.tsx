
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const queueData = [
  { id: 'Q1', patientName: 'Moussa Diop', examType: 'Scanner (CT)', arrivalTime: '10:15', status: 'En attente' },
  { id: 'Q2', patientName: 'Aminata Sow', examType: 'Radiographie pulmonaire', arrivalTime: '10:30', status: 'En attente' },
  { id: 'Q3', patientName: 'Daouda Ndiaye', examType: 'IRM', arrivalTime: '10:45', status: 'En attente' },
];

export default function RadiographyQueuePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">File d'attente de Radiographie</h1>
        <p className="text-muted-foreground">
          Liste en temps réel des patients attendant un examen.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Patients en attente</CardTitle>
          <CardDescription>
            Voici la liste des patients actuellement dans la file d'attente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Type d'examen</TableHead>
                <TableHead>Heure d'arrivée</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {queueData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.patientName}</TableCell>
                  <TableCell>{item.examType}</TableCell>
                  <TableCell>{item.arrivalTime}</TableCell>
                  <TableCell>
                    <Badge variant="default">{item.status}</Badge>
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
