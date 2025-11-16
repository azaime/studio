
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
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Patient } from '@/lib/types';

interface AddVisionTestDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    patients: Patient[];
    onTestSaved: (testData: { patientName: string; date: string; result: string; }) => void;
}

export function AddVisionTestDialog({ open, onOpenChange, patients, onTestSaved }: AddVisionTestDialogProps) {
    const { toast } = useToast();
    const [patientId, setPatientId] = useState('');
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [resultOD, setResultOD] = useState('');
    const [resultOS, setResultOS] = useState('');

    const resetForm = () => {
        setPatientId('');
        setDate(new Date());
        setResultOD('');
        setResultOS('');
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!patientId || !date || !resultOD || !resultOS) {
            toast({
                title: "Formulaire incomplet",
                description: "Veuillez remplir tous les champs.",
                variant: "destructive",
            });
            return;
        }
        
        const patient = patients.find(p => p.id === patientId);
        if (!patient) return;

        const result = `${resultOD} OD, ${resultOS} OS`;

        onTestSaved({ 
            patientName: patient.name, 
            date: format(date, 'yyyy-MM-dd'),
            result 
        });
        
        onOpenChange(false);
    };

    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            resetForm();
        }
        onOpenChange(isOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Ajouter un nouveau test de vision</DialogTitle>
                        <DialogDescription>
                            Entrez les résultats du test de vision pour le patient.
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
                                    {patients.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="date">Date du test</Label>
                             <Popover>
                                <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP", { locale: fr }) : <span>Choisissez une date</span>}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                    locale={fr}
                                />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="result-od">Résultat OD (Œil Droit)</Label>
                                <Input id="result-od" value={resultOD} onChange={(e) => setResultOD(e.target.value)} placeholder="ex: 20/20" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="result-os">Résultat OS (Œil Gauche)</Label>
                                <Input id="result-os" value={resultOS} onChange={(e) => setResultOS(e.target.value)} placeholder="ex: 20/25" />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
                        <Button type="submit">Enregistrer le test</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
