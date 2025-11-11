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
    case 'In Stock': return 'secondary';
    case 'Low Stock': return 'default';
    case 'Expired': return 'destructive';
    default: return 'outline';
  }
}

export default function PharmacyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pharmacy Stock Control</CardTitle>
        <CardDescription>
          Real-time inventory of medications and medical supplies.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Medication</TableHead>
              <TableHead>Stock Level</TableHead>
              <TableHead>Stock Status</TableHead>
              <TableHead>Expiration Date</TableHead>
              <TableHead className="text-right">Status</TableHead>
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
