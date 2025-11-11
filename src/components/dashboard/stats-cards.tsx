import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Users, Calendar, Pill, Siren } from "lucide-react"

const stats = [
    { title: "Total Patients", value: "1,254", icon: Users, change: "+20.1% from last month" },
    { title: "Appointments Today", value: "32", icon: Calendar, change: "+15 since yesterday" },
    { title: "Meds Low Stock", value: "8", icon: Pill, change: "2 expiring soon" },
    { title: "ER Occupancy", value: "75%", icon: Siren, change: "3 critical cases" },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
