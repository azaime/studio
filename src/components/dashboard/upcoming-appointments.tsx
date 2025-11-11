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
import { appointments } from "@/lib/data"
import Link from "next/link"
import { Button } from "../ui/button"
import { ArrowUpRight } from "lucide-react"

export function UpcomingAppointments() {
    const upcomingAppointments = appointments.filter(a => a.status === 'Scheduled').slice(0, 5);
  return (
    <Card>
        <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>
                You have {upcomingAppointments.length} appointments today.
                </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/appointments">
                View All
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
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Doctor</TableHead>
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
