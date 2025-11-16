
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

type QueueItem = {
    id: string;
    patientName: string;
    examType: string;
    arrivalTime: string;
    status: 'En attente' | 'En cours' | 'Terminé';
};

const initialQueueData: QueueItem[] = [
  { id: 'Q1', patientName: 'Moussa Diop', examType: 'Scanner (CT)', arrivalTime: '10:15', status: 'En attente' },
  { id: 'Q2', patientName: 'Aminata Sow', examType: 'Radiographie pulmonaire', arrivalTime: '10:30', status: 'En attente' },
  { id: 'Q3', patientName: 'Daouda Ndiaye', examType: 'IRM', arrivalTime: '10:45', status: 'En attente' },
];

const getStatusBadgeVariant = (status: QueueItem['status']) => {
    switch (status) {
        case 'Terminé': return 'secondary';
        case 'En cours': return 'default';
        case 'En attente': return 'outline';
        default: return 'outline';
    }
};

export default function RadiographyQueuePage() {
  const [queue, setQueue] = useState<QueueItem[]>(initialQueueData);
  const { toast } = useToast();

  const handleViewDetails = (item: QueueItem) => {
    toast({
      title: `Détails pour ${item.patientName}`,
      description: `Examen: ${item.examType}, Arrivée: ${item.arrivalTime}, Statut: ${item.status}`,
    });
  };

  const handleUpdateStatus = (itemId: string, newStatus: QueueItem['status']) => {
    setQueue(prevQueue => prevQueue.map(item =>
        item.id === itemId ? { ...item, status: newStatus } : item
    ));
    toast({
        title: "Statut mis à jour",
        description: `Le statut de l'examen a été mis à jour à "${newStatus}".`,
    });
  };


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
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {queue.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.patientName}</TableCell>
                  <TableCell>{item.examType}</TableCell>
                  <TableCell>{item.arrivalTime}</TableCell>
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
                            <DropdownMenuItem onClick={() => handleUpdateStatus(item.id, 'En cours')}>Passer à 'En cours'</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateStatus(item.id, 'Terminé')}>Marquer comme 'Terminé'</DropdownMenuItem>
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
