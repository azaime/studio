export type Patient = {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
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
  status: 'Scheduled' | 'Completed' | 'Cancelled';
};

export type Medication = {
  id: string;
  name: string;
  stock: number;
  minStock: number;
  expirationDate: string;
  status: 'In Stock' | 'Low Stock' | 'Expired';
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Doctor' | 'Nurse' | 'Pharmacist';
  lastLogin: string;
};

export type LabRequest = {
  id: string;
  patientName: string;
  test: string;
  requestDate: string;
  status: 'Pending' | 'Completed' | 'In Progress';
};

export type EmergencyTriage = {
  id: string;
  patientName: string;
  arrivalTime: string;
  urgency: 'Critical' | 'Urgent' | 'Non-Urgent';
  status: 'Waiting' | 'In Treatment' | 'Discharged';
}
