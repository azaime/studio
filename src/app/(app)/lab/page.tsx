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
import { labRequests } from "@/lib/data"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'Terminé': return 'secondary';
    case 'En cours': return 'default';
    case 'En attente': return 'outline';
    default: return 'default';
  }
}

export default function LabPage() {
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
                      <DropdownMenuItem>Voir les résultats</DropdownMenuItem>
                      <DropdownMenuItem>Mettre à jour le statut</DropdownMenuItem>
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
