
"use client";

import { useState } from 'react';
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
import { format } from 'date-fns';
import type { Patient, Invoice } from '@/lib/types';

interface CreateInvoiceDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    patients: Patient[];
    onInvoiceCreated: (invoiceData: Omit<Invoice, 'id'>) => void;
}

export function CreateInvoiceDialog({ open, onOpenChange, patients, onInvoiceCreated }: CreateInvoiceDialogProps) {
    const { toast } = useToast();
    const [patientId, setPatientId] = useState('');
    const [amount, setAmount] = useState<number | ''>('');

    const resetForm = () => {
        setPatientId('');
        setAmount('');
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!patientId || amount === '') {
            toast({
                title: "Formulaire incomplet",
                description: "Veuillez sélectionner un patient et entrer un montant.",
                variant: "destructive",
            });
            return;
        }
        
        const patient = patients.find(p => p.id === patientId);
        if (!patient) {
             toast({
                title: "Patient introuvable",
                variant: "destructive",
            });
            return;
        }

        onInvoiceCreated({
            patientName: patient.name,
            amount: Number(amount),
            date: format(new Date(), 'yyyy-MM-dd'),
            status: 'En attente'
        });
        
        toast({
            title: "Facture créée",
            description: `La facture pour ${patient.name} a été créée avec succès.`,
        });

        onOpenChange(false);
    };
    
    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            resetForm();
        }
        onOpenChange(isOpen);
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Créer une nouvelle facture</DialogTitle>
                        <DialogDescription>
                            Remplissez les détails de la facture ci-dessous.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="patient">Patient</Label>
                            <Select onValueChange={setPatientId} value={patientId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez un patient" />
                                </SelectTrigger>
                                <SelectContent>
                                    {patients.map(p => (
                                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
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
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
                        <Button type="submit">Créer la facture</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
