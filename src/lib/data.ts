import type { Patient, Appointment, Medication, User, LabRequest, EmergencyTriage } from '@/lib/types';
import { subDays, format } from 'date-fns';

export const patients: Patient[] = [
  { id: 'PAT001', name: 'Aminata Sow', age: 34, gender: 'Female', lastVisit: format(subDays(new Date(), 10), 'yyyy-MM-dd'), email: 'aminata.sow@example.com', phone: '+221771234567', address: '123 Rue de Dakar, Dakar' },
  { id: 'PAT002', name: 'Moussa Diop', age: 45, gender: 'Male', lastVisit: format(subDays(new Date(), 25), 'yyyy-MM-dd'), email: 'moussa.diop@example.com', phone: '+221772345678', address: '456 Avenue de Thies, Thies' },
  { id: 'PAT003', name: 'Fatima Gueye', age: 28, gender: 'Female', lastVisit: format(subDays(new Date(), 5), 'yyyy-MM-dd'), email: 'fatima.gueye@example.com', phone: '+221773456789', address: '789 Boulevard de Saint-Louis, Saint-Louis' },
  { id: 'PAT004', name: 'Ibrahim Fall', age: 62, gender: 'Male', lastVisit: format(subDays(new Date(), 60), 'yyyy-MM-dd'), email: 'ibrahim.fall@example.com', phone: '+221774567890', address: '101 Route de Kaolack, Kaolack' },
  { id: 'PAT005', name: 'Awa Ndiaye', age: 19, gender: 'Female', lastVisit: format(subDays(new Date(), 15), 'yyyy-MM-dd'), email: 'awa.ndiaye@example.com', phone: '+221775678901', address: '212 Rue de Ziguinchor, Ziguinchor' },
];

export const appointments: Appointment[] = [
  { id: 'APP001', patientName: 'Aminata Sow', patientId: 'PAT001', doctorName: 'Dr. Cisse', service: 'Cardiology', date: format(new Date(), 'yyyy-MM-dd'), time: '10:00', status: 'Scheduled' },
  { id: 'APP002', patientName: 'Moussa Diop', patientId: 'PAT002', doctorName: 'Dr. Ba', service: 'General Medicine', date: format(new Date(), 'yyyy-MM-dd'), time: '11:30', status: 'Scheduled' },
  { id: 'APP003', patientName: 'Fatima Gueye', patientId: 'PAT003', doctorName: 'Dr. Diallo', service: 'Maternity', date: format(subDays(new Date(), -1), 'yyyy-MM-dd'), time: '09:00', status: 'Scheduled' },
  { id: 'APP004', patientName: 'Ibrahim Fall', patientId: 'PAT004', doctorName: 'Dr. Cisse', service: 'Cardiology', date: format(subDays(new Date(), 1), 'yyyy-MM-dd'), time: '14:00', status: 'Completed' },
  { id: 'APP005', patientName: 'Awa Ndiaye', patientId: 'PAT005', doctorName: 'Dr. Toure', service: 'Pediatrics', date: format(subDays(new Date(), 2), 'yyyy-MM-dd'), time: '16:00', status: 'Cancelled' },
];

export const medications: Medication[] = [
  { id: 'MED001', name: 'Paracetamol 500mg', stock: 1500, minStock: 200, expirationDate: '2025-12-31', status: 'In Stock' },
  { id: 'MED002', name: 'Amoxicillin 250mg', stock: 80, minStock: 100, expirationDate: '2024-08-31', status: 'Low Stock' },
  { id: 'MED003', name: 'Ibuprofen 400mg', stock: 950, minStock: 150, expirationDate: '2026-05-31', status: 'In Stock' },
  { id: 'MED004', name: 'Aspirin 100mg', stock: 45, minStock: 50, expirationDate: '2023-10-31', status: 'Expired' },
  { id: 'MED005', name: 'Metformin 1000mg', stock: 300, minStock: 50, expirationDate: '2025-09-30', status: 'In Stock' },
];

export const users: User[] = [
  { id: 'USR001', name: 'Admin User', email: 'admin@mongo.health', role: 'Admin', lastLogin: format(subDays(new Date(), 0), 'yyyy-MM-dd HH:mm') },
  { id: 'USR002', name: 'Dr. Khadija Cisse', email: 'k.cisse@mongo.health', role: 'Doctor', lastLogin: format(subDays(new Date(), 1), 'yyyy-MM-dd HH:mm') },
  { id: 'USR003', name: 'Mamadou Ba', email: 'm.ba@mongo.health', role: 'Nurse', lastLogin: format(subDays(new Date(), 0), 'yyyy-MM-dd HH:mm') },
  { id: 'USR004', name: 'Aissatou Diallo', email: 'a.diallo@mongo.health', role: 'Pharmacist', lastLogin: format(subDays(new Date(), 2), 'yyyy-MM-dd HH:mm') },
];

export const doctors = [
  { id: 'DOC001', name: 'Dr. Khadija Cisse' },
  { id: 'DOC002', name: 'Dr. Amadou Ba' },
  { id: 'DOC003', name: 'Dr. Mariama Diallo' },
  { id: 'DOC004', name: 'Dr. Ousmane Toure' },
]

export const labRequests: LabRequest[] = [
  { id: 'LAB001', patientName: 'Aminata Sow', test: 'Complete Blood Count', requestDate: format(subDays(new Date(), 1), 'yyyy-MM-dd'), status: 'Completed' },
  { id: 'LAB002', patientName: 'Moussa Diop', test: 'Lipid Panel', requestDate: format(subDays(new Date(), 0), 'yyyy-MM-dd'), status: 'In Progress' },
  { id: 'LAB003', patientName: 'Ibrahim Fall', test: 'HbA1c', requestDate: format(subDays(new Date(), 0), 'yyyy-MM-dd'), status: 'Pending' },
];

export const emergencyTriage: EmergencyTriage[] = [
    { id: 'TRI001', patientName: 'Unknown', arrivalTime: '10:30', urgency: 'Critical', status: 'In Treatment' },
    { id: 'TRI002', patientName: 'Alioune Badara', arrivalTime: '10:45', urgency: 'Urgent', status: 'Waiting' },
    { id: 'TRI003', patientName: 'Ndella Faye', arrivalTime: '11:00', urgency: 'Non-Urgent', status: 'Waiting' },
];
