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
import { medications } from "@/lib/data"
import { Progress } from "@/components/ui/progress"

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'En stock': return 'secondary';
    case 'Stock bas': return 'default';
    case 'Expiré': return 'destructive';
    default: return 'outline';
  }
}

export default function PharmacyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contrôle des stocks de la pharmacie</CardTitle>
        <CardDescription>
          Inventaire en temps réel des médicaments et des fournitures médicales.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Médicament</TableHead>
              <TableHead>Niveau de stock</TableHead>
              <TableHead>État du stock</TableHead>
              <TableHead>Date d'expiration</TableHead>
              <TableHead className="text-right">Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medications.map((med) => (
              <TableRow key={med.id}>
                <TableCell className="font-medium">{med.name}</TableCell>
                <TableCell>{med.stock}</TableCell>
                <TableCell>
                    <Progress value={(med.stock / (med.minStock * 2)) * 100} className="w-[60%]" />
                </TableCell>
                <TableCell>{med.expirationDate}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={getStatusBadgeVariant(med.status)}>{med.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
