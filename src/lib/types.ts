export type Patient = {
  id: string;
  name: string;
  age: number;
  gender: 'Homme' | 'Femme' | 'Autre';
  lastVisit: string;
  email: string;
  phone: string;
  address: string;
};

export type Appointment = {
  id: string;
  patientName: string;
  patientId: string;
  doctorName: string;
  service: string;
  date: string;
  time: string;
  status: 'Programmé' | 'Terminé' | 'Annulé';
};

export type Medication = {
  id: string;
  name: string;
  stock: number;
  minStock: number;
  expirationDate: string;
  status: 'En stock' | 'Stock bas' | 'Expiré';
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Docteur' | 'Infirmier' | 'Pharmacien';
  lastLogin: string;
};

export type LabRequest = {
  id: string;
  patientName: string;
  test: string;
  requestDate: string;
  status: 'En attente' | 'Terminé' | 'En cours';
};

export type EmergencyTriage = {
  id: string;
  patientName: string;
  arrivalTime: string;
  urgency: 'Critique' | 'Urgent' | 'Standard' | 'Non-Urgent';
  status: 'En attente' | 'En traitement' | 'Sorti';
}

export type RadiographyRequest = {
  id: string;
  patientName: string;
  examType: string;
  requestDate: string;
  status: 'En attente' | 'Terminé' | 'En cours' | 'Annulé';
};

export type UltrasoundExam = {
    id: string;
    time: string;
    patient: string;
    exam: string;
    status: 'Terminé' | 'En cours' | 'En attente' | 'À venir';
};

export type UpcomingDelivery = {
    patient: string;
    term: string;
    status: "Programmé" | "Observation" | "Admis";
};

export type Invoice = {
  id: string;
  patientName: string;
  amount: number;
  date: string;
  status: 'Payée' | 'En attente' | 'En retard';
};

export type BloodUnit = {
  id: string;
  bloodType: string;
  collectionDate: string;
  expiryDate: string;
  donorId: string;
  status: 'Disponible' | 'Réservé' | 'Utilisé' | 'Expiré';
};
