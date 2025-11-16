
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
import type { UltrasoundExam } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface AddExamDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onExamAdded: (exam: Omit<UltrasoundExam, 'id' | 'status'>) => void;
}

export function AddExamDialog({ open, onOpenChange, onExamAdded }: AddExamDialogProps) {
    const { toast } = useToast();
    const [patient, setPatient] = useState('');
    const [time, setTime] = useState('');
    const [examType, setExamType] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!patient || !time || !examType) {
            toast({
                title: "Formulaire incomplet",
                description: "Veuillez remplir tous les champs.",
                variant: "destructive",
            });
            return;
        }

        onExamAdded({
            patient,
            time,
            exam: examType,
        });

        toast({
            title: "Examen ajouté",
            description: `L'examen pour ${patient} a été ajouté à l'agenda.`,
        });

        onOpenChange(false);
    };

    useEffect(() => {
        if (!open) {
            setPatient('');
            setTime('');
            setExamType('');
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Ajouter un nouvel examen</DialogTitle>
                        <DialogDescription>
                            Remplissez les détails ci-dessous pour ajouter un nouvel examen d'échographie.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="patient-name" className="text-right">
                                Patient
                            </Label>
                            <Input
                                id="patient-name"
                                value={patient}
                                onChange={(e) => setPatient(e.target.value)}
                                className="col-span-3"
                                placeholder="Nom du patient"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="time" className="text-right">
                                Heure
                            </Label>
                            <Input
                                id="time"
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="exam-type" className="text-right">
                                Type d'examen
                            </Label>
                             <Select onValueChange={setExamType} value={examType}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Sélectionnez un type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Échographie abdominale">Échographie abdominale</SelectItem>
                                    <SelectItem value="Échographie pelvienne">Échographie pelvienne</SelectItem>
                                    <SelectItem value="Échographie obstétricale T1">Échographie obstétricale T1</SelectItem>
                                    <SelectItem value="Échographie obstétricale T2">Échographie obstétricale T2</SelectItem>
                                    <SelectItem value="Échographie obstétricale T3">Échographie obstétricale T3</SelectItem>
                                    <SelectItem value="Échographie cardiaque">Échographie cardiaque</SelectItem>
                                    <SelectItem value="Autre">Autre</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Annuler
                        </Button>
                        <Button type="submit">Ajouter l'examen</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
