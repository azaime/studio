import { AppointmentList } from "@/components/appointments/appointment-list";

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold tracking-tight">Rendez-vous</h1>
        <p className="text-muted-foreground">
          Planifiez et gérez tous les rendez-vous des patients.
        </p>
      </div>
      <AppointmentList />
    </div>
  );
}
