
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Appointment } from "@/lib/types"
import Link from "next/link"
import { Button } from "../ui/button"
import { ArrowUpRight } from "lucide-react"

export function UpcomingAppointments({ appointments }: { appointments: Appointment[] }) {
    const upcomingAppointments = appointments.filter(a => a.status === 'Programmé').slice(0, 5);
  return (
    <Card>
        <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
                <CardTitle>Rendez-vous à venir</CardTitle>
                <CardDescription>
                Vous avez {upcomingAppointments.length} rendez-vous à venir.
                </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/appointments">
                Voir tout
                <ArrowUpRight className="h-4 w-4" />
                </Link>
            </Button>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Heure</TableHead>
                    <TableHead className="text-right">Docteur</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {upcomingAppointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                        <TableCell>
                            <div className="font-medium">{appointment.patientName}</div>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline">{appointment.service}</Badge>
                        </TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell className="text-right">{appointment.doctorName}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  )
}
