
"use client"

import { useState } from "react";
import { PatientTable } from "@/components/patients/patient-table";
import type { Patient } from "@/lib/types";
import { patients as initialPatients } from "@/lib/data";

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);

  const addPatient = (newPatient: Omit<Patient, 'id' | 'lastVisit'>) => {
    setPatients(prev => [
      { 
        ...newPatient, 
        id: `PAT${Date.now()}`,
        lastVisit: new Date().toISOString().split('T')[0]
      }, 
      ...prev
    ]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gestion des patients</h1>
        <p className="text-muted-foreground">
          Consultez, ajoutez et gérez tous les dossiers des patients.
        </p>
      </div>
      <PatientTable patients={patients} onPatientRegistered={addPatient} />
    </div>
  );
}
