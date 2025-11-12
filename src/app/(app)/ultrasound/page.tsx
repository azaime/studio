import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const ultrasoundSchedule = [
    { time: "09:00", patient: "Fatou Kiné", exam: "Échographie abdominale" },
    { time: "09:45", patient: "Moussa Fall", exam: "Échographie pelvienne" },
    { time: "10:30", patient: "Astou Ndiaye", exam: "Échographie obstétricale T1" },
    { time: "11:15", patient: "Patient suivant...", exam: "En attente" },
]

export default function UltrasoundPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Service d'Échographie</CardTitle>
        <CardDescription>
          Agenda du jour pour les examens d'échographie médicale.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Heure</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Examen</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {ultrasoundSchedule.map((item) => (
                    <TableRow key={item.time}>
                        <TableCell className="font-medium">{item.time}</TableCell>
                        <TableCell>{item.patient}</TableCell>
                        <TableCell>{item.exam}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
