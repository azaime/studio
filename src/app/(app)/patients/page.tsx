import { PatientTable } from "@/components/patients/patient-table";

export default function PatientsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gestion des patients</h1>
        <p className="text-muted-foreground">
          Consultez, ajoutez et gérez tous les dossiers des patients.
        </p>
      </div>
      <PatientTable />
    </div>
  );
}
