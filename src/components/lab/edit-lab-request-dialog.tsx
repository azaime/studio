
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
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import type { LabRequest } from '@/lib/types';

interface EditLabRequestDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    request: LabRequest | null;
    onStatusChange: (requestId: string, newStatus: LabRequest['status']) => void;
}

export function EditLabRequestDialog({ open, onOpenChange, request, onStatusChange }: EditLabRequestDialogProps) {
    const { toast } = useToast();
    const [status, setStatus] = useState<LabRequest['status'] | ''>('');

    useEffect(() => {
        if (request) {
            setStatus(request.status);
        }
    }, [request]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!status || !request) {
            toast({
                title: "Aucun statut sélectionné",
                description: "Veuillez sélectionner un nouveau statut.",
                variant: "destructive",
            });
            return;
        }

        onStatusChange(request.id, status as LabRequest['status']);
        onOpenChange(false);
    };
    
    const handleDialogClose = (isOpen: boolean) => {
        if (!isOpen) {
            setStatus('');
        }
        onOpenChange(isOpen);
    }

    if (!request) return null;

    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Modifier la demande d'analyse</DialogTitle>
                        <DialogDescription>
                            Mettez à jour le statut pour la demande de {request.patientName}.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <p><span className="font-medium">Patient:</span> {request.patientName}</p>
                            <p><span className="font-medium">Test:</span> {request.test}</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status">Statut</Label>
                            <Select onValueChange={(value) => setStatus(value as LabRequest['status'])} value={status}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez un statut" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="En attente">En attente</SelectItem>
                                    <SelectItem value="En cours">En cours</SelectItem>
                                    <SelectItem value="Terminé">Terminé</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
                        <Button type="submit">Enregistrer</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
