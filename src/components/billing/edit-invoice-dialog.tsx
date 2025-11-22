
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import type { Patient, Invoice } from '@/lib/types';
import { patients as allPatients } from '@/lib/data';

interface EditInvoiceDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    patients: Patient[];
    onInvoiceUpdated: (invoiceData: Invoice) => void;
    invoice: Invoice | null;
}

export function EditInvoiceDialog({ open, onOpenChange, patients, onInvoiceUpdated, invoice }: EditInvoiceDialogProps) {
    const { toast } = useToast();
    const [patientName, setPatientName] = useState('');
    const [amount, setAmount] = useState<number | ''>('');
    const [status, setStatus] = useState<Invoice['status']>('En attente');
    const [date, setDate] = useState('');

    useEffect(() => {
        if (invoice) {
            setPatientName(invoice.patientName);
            setAmount(invoice.amount);
            setStatus(invoice.status);
            setDate(invoice.date);
        }
    }, [invoice]);

    const resetForm = () => {
        setPatientName('');
        setAmount('');
        setStatus('En attente');
        setDate('');
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!patientName || amount === '' || !invoice) {
            toast({
                title: "Formulaire incomplet",
                description: "Veuillez sélectionner un patient, entrer un montant et un statut.",
                variant: "destructive",
            });
            return;
        }

        onInvoiceUpdated({
            ...invoice,
            patientName,
            amount: Number(amount),
            status,
            date,
        });

        onOpenChange(false);
    };
    
    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            resetForm();
        }
        onOpenChange(isOpen);
    }

    if (!invoice) return null;

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Modifier la facture {invoice.id}</DialogTitle>
                        <DialogDescription>
                            Mettez à jour les détails de la facture ci-dessous.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="patient">Patient</Label>
                            <Select onValueChange={setPatientName} value={patientName}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez un patient" />
                                </SelectTrigger>
                                <SelectContent>
                                    {patients.map(p => (
                                        <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="amount">Montant (XOF)</Label>
                            <Input 
                                id="amount" 
                                type="number"
                                value={amount} 
                                onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))} 
                                placeholder="Entrez le montant de la facture" 
                            />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="status">Statut</Label>
                            <Select onValueChange={(value) => setStatus(value as Invoice['status'])} value={status}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez un statut" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="En attente">En attente</SelectItem>
                                    <SelectItem value="Payée">Payée</SelectItem>
                                    <SelectItem value="En retard">En retard</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
                        <Button type="submit">Enregistrer les modifications</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
