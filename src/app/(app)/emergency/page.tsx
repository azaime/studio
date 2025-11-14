
"use client"
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { emergencyTriage as initialEmergencyTriage } from "@/lib/data"
import type { EmergencyTriage } from "@/lib/types";
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast";

type UrgencyLevel = 'Critique' | 'Urgent' | 'Standard' | 'Non-Urgent';
type TriageStatus = 'En attente' | 'En traitement' | 'Sorti';

const getUrgencyBadge = (urgency: UrgencyLevel) => {
    switch (urgency) {
        case 'Critique': return 'destructive';
        case 'Urgent': return 'default';
        default: return 'secondary';
    }
}

export default function EmergencyPage() {
  const [triageQueue, setTriageQueue] = useState<EmergencyTriage[]>(initialEmergencyTriage);
  const [patientName, setPatientName] = useState('');
  const [urgency, setUrgency] = useState<UrgencyLevel | ''>('');
  const { toast } = useToast();

  const handleAddToQueue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urgency || !patientName) {
        toast({
            title: "Formulaire incomplet",
            description: "Veuillez entrer le nom du patient et le niveau d'urgence.",
            variant: "destructive"
        });
        return;
    }

    const newTriageEntry: EmergencyTriage = {
        id: `TRI${Date.now()}`,
        patientName,
        arrivalTime: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        urgency: urgency as 'Critique' | 'Urgent' | 'Non-Urgent',
        status: 'En attente'
    };

    setTriageQueue(prev => [newTriageEntry, ...prev]);

    // Reset form
    setPatientName('');
    setUrgency('');
    
    toast({
        title: "Patient ajouté à la file d'attente",
        description: `${patientName} a été ajouté à la file d'attente des urgences.`,
    });
  }
  
  const handleUpdateStatus = (patientId: string, newStatus: TriageStatus) => {
    setTriageQueue(prev => prev.map(p => p.id === patientId ? { ...p, status: newStatus } : p));
    toast({
        title: "Statut mis à jour",
        description: `Le statut du patient a été mis à jour à "${newStatus}".`
    });
  }

  const handleViewDetails = (patient: EmergencyTriage) => {
    toast({
        title: `Détails pour ${patient.patientName}`,
        description: `Arrivée: ${patient.arrivalTime}, Urgence: ${patient.urgency}, Statut: ${patient.status}`
    });
  }


  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <form onSubmit={handleAddToQueue}>
            <CardHeader>
            <CardTitle>Triage d'urgence</CardTitle>
            <CardDescription>
                Enregistrez et classez rapidement les patients en fonction de l'urgence.
            </CardDescription>
            </CardHeader>
            <CardContent>
            
                <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Nom du patient</Label>
                    <Input id="name" placeholder="Entrez le nom du patient ou 'Inconnu'" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="urgency">Niveau d'urgence</Label>
                    <Select onValueChange={(value) => setUrgency(value as UrgencyLevel)} value={urgency}>
                    <SelectTrigger id="urgency">
                        <SelectValue placeholder="Sélectionnez l'urgence (ex: Échelle de Manchester)" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="Critique">Niveau 1: Critique</SelectItem>
                        <SelectItem value="Urgent">Niveau 2: Urgent</SelectItem>
                        <SelectItem value="Standard">Niveau 3: Standard</SelectItem>
                        <SelectItem value="Non-Urgent">Niveau 4: Non-urgent</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                </div>
            
            </CardContent>
            <CardFooter className="flex justify-end">
            <Button type="submit">Ajouter à la file d'attente</Button>
            </CardFooter>
        </form>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>File d'attente des urgences</CardTitle>
            <CardDescription>Liste en temps réel des patients aux urgences.</CardDescription>
        </CardHeader>
        <CardContent>
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Urgence</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Arrivée</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {triageQueue.map(patient => (
                <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.patientName}</TableCell>
                    <TableCell><Badge variant={getUrgencyBadge(patient.urgency as UrgencyLevel)}>{patient.urgency}</Badge></TableCell>
                    <TableCell><Badge variant={patient.status === 'En traitement' ? 'outline' : 'secondary'}>{patient.status}</Badge></TableCell>
                    <TableCell>{patient.arrivalTime}</TableCell>
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
                                <DropdownMenuItem onClick={() => handleViewDetails(patient)}>Voir les détails</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleUpdateStatus(patient.id, 'En traitement')}>Passer à 'En traitement'</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleUpdateStatus(patient.id, 'Sorti')}>Marquer comme 'Sorti'</DropdownMenuItem>
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
  )
}
