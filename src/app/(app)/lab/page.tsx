
"use client";

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { labRequests as initialLabRequests, LabRequest } from "@/lib/data"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useToast } from '@/hooks/use-toast';

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'Terminé': return 'secondary';
    case 'En cours': return 'default';
    case 'En attente': return 'outline';
    default: return 'default';
  }
}

export default function LabPage() {
  const [labRequests, setLabRequests] = useState<LabRequest[]>(initialLabRequests);
  const { toast } = useToast();

  const handleViewResults = (request: LabRequest) => {
    toast({
        title: `Résultats pour ${request.patientName}`,
        description: request.status === 'Terminé' 
            ? `Les résultats pour "${request.test}" sont disponibles. Ex: Hémoglobine: 14 g/dL.`
            : `Les résultats pour "${request.test}" ne sont pas encore disponibles.`,
    });
  };
  
  const handleUpdateStatus = (requestId: string, status: LabRequest['status']) => {
    setLabRequests(prev => prev.map(req => req.id === requestId ? { ...req, status } : req));
    toast({
        title: "Statut mis à jour",
        description: `Le statut de la demande a été mis à jour à "${status}".`
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demandes de laboratoire</CardTitle>
        <CardDescription>
          Gérez et suivez toutes les demandes d'analyses médicales.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Demande</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Type de test</TableHead>
              <TableHead>Date de demande</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {labRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.id}</TableCell>
                <TableCell>{request.patientName}</TableCell>
                <TableCell>{request.test}</TableCell>
                <TableCell>{request.requestDate}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(request.status)}>{request.status}</Badge>
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
                      <DropdownMenuItem onClick={() => handleViewResults(request)}>Voir les résultats</DropdownMenuItem>
                       <DropdownMenuSub>
                          <DropdownMenuSubTrigger>Mettre à jour le statut</DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(request.id, 'En attente')}>En attente</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(request.id, 'En cours')}>En cours</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(request.id, 'Terminé')}>Terminé</DropdownMenuItem>
                              </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                      </DropdownMenuSub>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
