
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
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface RequestExamDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onExamRequested: (data: { patientName: string; examType: string }) => void;
}

export function RequestExamDialog({ open, onOpenChange, onExamRequested }: RequestExamDialogProps) {
    const [patientName, setPatientName] = useState('');
    const [examType, setExamType] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!patientName || !examType) {
            return;
        }
        onExamRequested({ patientName, examType });
        onOpenChange(false);
        setPatientName('');
        setExamType('');
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Nouvelle demande de radiographie</DialogTitle>
                        <DialogDescription>
                            Remplissez les informations ci-dessous.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="patient-name" className="text-right">
                                Patient
                            </Label>
                            <Input
                                id="patient-name"
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                                className="col-span-3"
                                placeholder="Nom du patient"
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
                                    <SelectItem value="Radiographie pulmonaire">Radiographie pulmonaire</SelectItem>
                                    <SelectItem value="Radiographie osseuse">Radiographie osseuse</SelectItem>
                                    <SelectItem value="Mammographie">Mammographie</SelectItem>
                                    <SelectItem value="Scanner (CT)">Scanner (CT)</SelectItem>
                                    <SelectItem value="IRM">IRM</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Annuler
                        </Button>
                        <Button type="submit">Créer la demande</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
