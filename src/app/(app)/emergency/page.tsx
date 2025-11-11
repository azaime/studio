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

const getUrgencyBadge = (urgency: 'Critical' | 'Urgent' | 'Non-Urgent') => {
    switch (urgency) {
        case 'Critical': return 'destructive';
        case 'Urgent': return 'default';
        case 'Non-Urgent': return 'secondary';
    }
}

export default function EmergencyPage() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Emergency Triage</CardTitle>
          <CardDescription>
            Quickly register and classify patients based on urgency.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Patient Name</Label>
                <Input id="name" placeholder="Enter patient name or 'Unknown'" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="urgency">Urgency Level</Label>
                <Select>
                  <SelectTrigger id="urgency">
                    <SelectValue placeholder="Select urgency (e.g., Manchester Scale)" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="critical">Level 1: Critical</SelectItem>
                    <SelectItem value="urgent">Level 2: Urgent</SelectItem>
                    <SelectItem value="standard">Level 3: Standard</SelectItem>
                    <SelectItem value="non-urgent">Level 4: Non-urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Add to Queue</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Emergency Queue</CardTitle>
            <CardDescription>Real-time list of patients in the emergency room.</CardDescription>
        </CardHeader>
        <CardContent>
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Arrival</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {emergencyTriage.map(patient => (
                <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.patientName}</TableCell>
                    <TableCell><Badge variant={getUrgencyBadge(patient.urgency)}>{patient.urgency}</Badge></TableCell>
                    <TableCell><Badge variant={patient.status === 'In Treatment' ? 'outline' : 'secondary'}>{patient.status}</Badge></TableCell>
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
