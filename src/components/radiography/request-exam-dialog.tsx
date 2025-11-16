
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { RadiographyRequest } from '@/lib/types';

interface RequestExamDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onExamRequested: (data: { patientName: string; examType: string, id?: string }) => void;
    request?: RadiographyRequest | null;
}

export function RequestExamDialog({ open, onOpenChange, onExamRequested, request }: RequestExamDialogProps) {
    const [patientName, setPatientName] = useState('');
    const [examType, setExamType] = useState('');

    const isEditing = !!request;

    useEffect(() => {
        if(request && open) {
            setPatientName(request.patientName);
            setExamType(request.examType);
        } else {
            setPatientName('');
            setExamType('');
        }
    }, [request, open])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!patientName || !examType) {
            return;
        }
        onExamRequested({ id: request?.id, patientName, examType });
        onOpenChange(false);
    };
    
    const handleOpenChange = (isOpen: boolean) => {
      if (!isOpen) {
        setPatientName('');
        setExamType('');
      }
      onOpenChange(isOpen);
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{isEditing ? "Modifier la demande" : "Nouvelle demande de radiographie"}</DialogTitle>
                        <DialogDescription>
                             {isEditing ? "Modifiez les informations de la demande ci-dessous." : "Remplissez les informations ci-dessous."}
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
                        <Button type="submit">{isEditing ? "Enregistrer les modifications" : "Créer la demande"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
