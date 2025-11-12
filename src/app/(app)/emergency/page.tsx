"use client"
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
import { emergencyTriage } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const getUrgencyBadge = (urgency: 'Critique' | 'Urgent' | 'Non-Urgent') => {
    switch (urgency) {
        case 'Critique': return 'destructive';
        case 'Urgent': return 'default';
        case 'Non-Urgent': return 'secondary';
    }
}

export default function EmergencyPage() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Triage d'urgence</CardTitle>
          <CardDescription>
            Enregistrez et classez rapidement les patients en fonction de l'urgence.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nom du patient</Label>
                <Input id="name" placeholder="Entrez le nom du patient ou 'Inconnu'" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="urgency">Niveau d'urgence</Label>
                <Select>
                  <SelectTrigger id="urgency">
                    <SelectValue placeholder="Sélectionnez l'urgence (ex: Échelle de Manchester)" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="critical">Niveau 1: Critique</SelectItem>
                    <SelectItem value="urgent">Niveau 2: Urgent</SelectItem>
                    <SelectItem value="standard">Niveau 3: Standard</SelectItem>
                    <SelectItem value="non-urgent">Niveau 4: Non-urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Ajouter à la file d'attente</Button>
        </CardFooter>
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
                </TableRow>
            </TableHeader>
            <TableBody>
                {emergencyTriage.map(patient => (
                <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.patientName}</TableCell>
                    <TableCell><Badge variant={getUrgencyBadge(patient.urgency)}>{patient.urgency}</Badge></TableCell>
                    <TableCell><Badge variant={patient.status === 'En traitement' ? 'outline' : 'secondary'}>{patient.status}</Badge></TableCell>
                    <TableCell>{patient.arrivalTime}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  )
}
