
"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, ListOrdered, FileSearch, PlusCircle, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { RequestExamDialog } from '@/components/radiography/request-exam-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { radiographyRequests as initialRadiographyRequests } from "@/lib/data";
import type { RadiographyRequest } from '@/lib/types';

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'Terminé': return 'secondary';
    case 'En cours': return 'default';
    case 'Annulé': return 'destructive';
    case 'En attente': return 'outline';
    default: return 'default';
  }
}


export default function RadiographyPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isRequestingExam, setIsRequestingExam] = useState(false);
  const [radiographyRequests, setRadiographyRequests] = useState<RadiographyRequest[]>(initialRadiographyRequests);
  const [editingRequest, setEditingRequest] = useState<RadiographyRequest | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "Ordonnance téléchargée",
        description: `Le fichier "${file.name}" a été sélectionné.`,
      });
    }
  };

  const handleExamRequested = (data: Omit<RadiographyRequest, 'id' | 'requestDate' | 'status'> & { id?: string }) => {
    if (editingRequest) { // Editing
      setRadiographyRequests(prev => prev.map(req => req.id === editingRequest.id ? { ...req, ...data } : req));
      toast({
        title: "Demande mise à jour",
        description: `La demande pour ${data.patientName} a été mise à jour.`,
      });
    } else { // Creating
      const newRequest: RadiographyRequest = {
          ...data,
          id: `RAD${Date.now()}`,
          requestDate: new Date().toISOString().split('T')[0],
          status: 'En attente'
      };
      setRadiographyRequests(prev => [newRequest, ...prev]);
      toast({
        title: "Demande d'examen créée",
        description: `Une demande pour ${data.patientName} (${data.examType}) a été créée.`,
      });
    }
    handleDialogClose(false);
  };
  
  const handleViewDetails = (request: RadiographyRequest) => {
    toast({
        title: `Détails pour ${request.patientName}`,
        description: `Examen: ${request.examType} | Statut: ${request.status} | Demandé le: ${request.requestDate}`
    });
  };

  const handleUpdateRequest = (requestId: string, status: RadiographyRequest['status']) => {
    setRadiographyRequests(prev => prev.map(req => req.id === requestId ? { ...req, status } : req));
    toast({
        title: "Statut mis à jour",
        description: `La demande ${requestId} est maintenant ${status}.`
    });
  };
  
  const handleOpenEditDialog = (request: RadiographyRequest) => {
    setEditingRequest(request);
    setIsRequestingExam(true);
  };

  const handleOpenCreateDialog = () => {
    setEditingRequest(null);
    setIsRequestingExam(true);
  };
  
  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setEditingRequest(null);
    }
    setIsRequestingExam(open);
  }

  return (
    <>
      <div className="space-y-6">
          <div className="flex justify-between items-center">
              <div>
                  <h1 className="text-2xl font-bold tracking-tight">Service de Radiographie</h1>
                  <p className="text-muted-foreground">Gestion des examens d'imagerie par rayons X.</p>
              </div>
              <Button onClick={handleOpenCreateDialog}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nouvelle demande
              </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Demandes d'examen</CardTitle>
              <CardDescription>Liste de toutes les demandes de radiographie.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Demande</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Type d'examen</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {radiographyRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>{request.patientName}</TableCell>
                      <TableCell>{request.examType}</TableCell>
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
                            <DropdownMenuItem onClick={() => handleViewDetails(request)}>Voir les détails</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleOpenEditDialog(request)}>Modifier</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateRequest(request.id, 'En cours')}>Marquer comme 'En cours'</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateRequest(request.id, 'Terminé')}>Marquer comme 'Terminé'</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => handleUpdateRequest(request.id, 'Annulé')}>Annuler la demande</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Actions rapides</CardTitle>
                    <CardDescription>Autres outils et archives.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <Button className="w-full justify-start" onClick={handleUploadClick}>
                        <Upload className="mr-2 h-4 w-4" />
                        Télécharger une ordonnance
                    </Button>
                    <Input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*,.pdf"
                    />
                    <Button variant="secondary" className="w-full justify-start" onClick={() => router.push('/radiography/queue')}>
                        <ListOrdered className="mr-2 h-4 w-4" />
                        Gérer la file d'attente
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/radiography/archives')}>
                        <FileSearch className="mr-2 h-4 w-4" />
                        Rechercher dans les archives
                    </Button>
                </CardContent>
            </Card>
          </div>
      </div>
      <RequestExamDialog 
        open={isRequestingExam}
        onOpenChange={handleDialogClose}
        onExamRequested={handleExamRequested}
        request={editingRequest}
      />
    </>
  );
}
