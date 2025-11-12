
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import type { Patient } from "@/lib/types";

export function RecentPatients({ patients }: { patients: Patient[] }) {
  const recentPatients = patients.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Patients récents</CardTitle>
        <CardDescription>
            Vous avez {patients.length} patients au total.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentPatients.map((patient) => (
            <div className="flex items-center" key={patient.id}>
              <Avatar className="h-9 w-9">
                <AvatarImage src={`https://picsum.photos/seed/${patient.id}/100/100`} alt="Avatar" />
                <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{patient.name}</p>
                <p className="text-sm text-muted-foreground">{patient.email}</p>
              </div>
              <div className="ml-auto font-medium">{patient.lastVisit}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
