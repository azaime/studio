import { PatientTable } from "@/components/patients/patient-table";

export default function PatientsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Patient Management</h1>
        <p className="text-muted-foreground">
          View, add, and manage all patient records.
        </p>
      </div>
      <PatientTable />
    </div>
  );
}
