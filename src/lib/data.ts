import type { Patient, Appointment, Medication, User, LabRequest, EmergencyTriage, RadiographyRequest } from '@/lib/types';
import { subDays, format } from 'date-fns';

export const patients: Patient[] = [
  { id: 'PAT001', name: 'Aminata Sow', age: 34, gender: 'Femme', lastVisit: format(subDays(new Date(), 10), 'yyyy-MM-dd'), email: 'aminata.sow@example.com', phone: '+221771234567', address: '123 Rue de Dakar, Dakar' },
  { id: 'PAT002', name: 'Moussa Diop', age: 45, gender: 'Homme', lastVisit: format(subDays(new Date(), 25), 'yyyy-MM-dd'), email: 'moussa.diop@example.com', phone: '+221772345678', address: '456 Avenue de Thies, Thies' },
  { id: 'PAT003', name: 'Fatima Gueye', age: 28, gender: 'Femme', lastVisit: format(subDays(new Date(), 5), 'yyyy-MM-dd'), email: 'fatima.gueye@example.com', phone: '+221773456789', address: '789 Boulevard de Saint-Louis, Saint-Louis' },
  { id: 'PAT004', name: 'Ibrahim Fall', age: 62, gender: 'Homme', lastVisit: format(subDays(new Date(), 60), 'yyyy-MM-dd'), email: 'ibrahim.fall@example.com', phone: '+221774567890', address: '101 Route de Kaolack, Kaolack' },
  { id: 'PAT005', name: 'Awa Ndiaye', age: 19, gender: 'Femme', lastVisit: format(subDays(new Date(), 15), 'yyyy-MM-dd'), email: 'awa.ndiaye@example.com', phone: '+221775678901', address: '212 Rue de Ziguinchor, Ziguinchor' },
];

export const appointments: Appointment[] = [
  { id: 'APP001', patientName: 'Aminata Sow', patientId: 'PAT001', doctorName: 'Dr. Cisse', service: 'Cardiologie', date: format(new Date(), 'yyyy-MM-dd'), time: '10:00', status: 'Programmé' },
  { id: 'APP002', patientName: 'Moussa Diop', patientId: 'PAT002', doctorName: 'Dr. Ba', service: 'Médecine Générale', date: format(new Date(), 'yyyy-MM-dd'), time: '11:30', status: 'Programmé' },
  { id: 'APP003', patientName: 'Fatima Gueye', patientId: 'PAT003', doctorName: 'Dr. Diallo', service: 'Maternité', date: format(subDays(new Date(), -1), 'yyyy-MM-dd'), time: '09:00', status: 'Programmé' },
  { id: 'APP004', patientName: 'Ibrahim Fall', patientId: 'PAT004', doctorName: 'Dr. Cisse', service: 'Cardiologie', date: format(subDays(new Date(), 1), 'yyyy-MM-dd'), time: '14:00', status: 'Terminé' },
  { id: 'APP005', patientName: 'Awa Ndiaye', patientId: 'PAT005', doctorName: 'Dr. Toure', service: 'Pédiatrie', date: format(subDays(new Date(), 2), 'yyyy-MM-dd'), time: '16:00', status: 'Annulé' },
];

export const medications: Medication[] = [
  { id: 'MED001', name: 'Paracétamol 500mg', stock: 1500, minStock: 200, expirationDate: '2025-12-31', status: 'En stock' },
  { id: 'MED002', name: 'Amoxicilline 250mg', stock: 80, minStock: 100, expirationDate: '2024-08-31', status: 'Stock bas' },
  { id: 'MED003', name: 'Ibuprofène 400mg', stock: 950, minStock: 150, expirationDate: '2026-05-31', status: 'En stock' },
  { id: 'MED004', name: 'Aspirine 100mg', stock: 45, minStock: 50, expirationDate: '2023-10-31', status: 'Expiré' },
  { id: 'MED005', name: 'Metformine 1000mg', stock: 300, minStock: 50, expirationDate: '2025-09-30', status: 'En stock' },
];

export const users: User[] = [
  { id: 'USR001', name: 'Admin User', email: 'admin@mongo.health', role: 'Admin', lastLogin: format(subDays(new Date(), 0), 'yyyy-MM-dd HH:mm') },
  { id: 'USR002', name: 'Dr. Khadija Cisse', email: 'k.cisse@mongo.health', role: 'Docteur', lastLogin: format(subDays(new Date(), 1), 'yyyy-MM-dd HH:mm') },
  { id: 'USR003', name: 'Mamadou Ba', email: 'm.ba@mongo.health', role: 'Infirmier', lastLogin: format(subDays(new Date(), 0), 'yyyy-MM-dd HH:mm') },
  { id: 'USR004', name: 'Aissatou Diallo', email: 'a.diallo@mongo.health', role: 'Pharmacien', lastLogin: format(subDays(new Date(), 2), 'yyyy-MM-dd HH:mm') },
];

export const doctors = [
  { id: 'DOC001', name: 'Dr. Khadija Cisse' },
  { id: 'DOC002', name: 'Dr. Amadou Ba' },
  { id: 'DOC003', name: 'Dr. Mariama Diallo' },
  { id: 'DOC004', name: 'Dr. Ousmane Toure' },
]

export const labRequests: LabRequest[] = [
  { id: 'LAB001', patientName: 'Aminata Sow', test: 'Hémogramme complet', requestDate: format(subDays(new Date(), 1), 'yyyy-MM-dd'), status: 'Terminé' },
  { id: 'LAB002', patientName: 'Moussa Diop', test: 'Bilan lipidique', requestDate: format(subDays(new Date(), 0), 'yyyy-MM-dd'), status: 'En cours' },
  { id: 'LAB003', patientName: 'Ibrahim Fall', test: 'HbA1c', requestDate: format(subDays(new Date(), 0), 'yyyy-MM-dd'), status: 'En attente' },
];

export const emergencyTriage: EmergencyTriage[] = [
    { id: 'TRI001', patientName: 'Inconnu', arrivalTime: '10:30', urgency: 'Critique', status: 'En traitement' },
    { id: 'TRI002', patientName: 'Alioune Badara', arrivalTime: '10:45', urgency: 'Urgent', status: 'En attente' },
    { id: 'TRI003', patientName: 'Ndella Faye', arrivalTime: '11:00', urgency: 'Non-Urgent', status: 'En attente' },
];

export const radiographyRequests: RadiographyRequest[] = [
  { id: 'RAD001', patientName: 'Aminata Sow', examType: 'Radiographie pulmonaire', requestDate: format(subDays(new Date(), 2), 'yyyy-MM-dd'), status: 'En attente' },
  { id: 'RAD002', patientName: 'Moussa Diop', examType: 'Scanner (CT)', requestDate: format(subDays(new Date(), 1), 'yyyy-MM-dd'), status: 'En cours' },
  { id: 'RAD003', patientName: 'Fatima Gueye', examType: 'IRM', requestDate: format(subDays(new Date(), 1), 'yyyy-MM-dd'), status: 'Terminé' },
];
