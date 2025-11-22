
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
import type { BloodUnit } from '@/lib/types';

interface EditBloodUnitDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    unit: BloodUnit | null;
    onUnitUpdated: (unitId: string, status: BloodUnit['status']) => void;
}

export function EditBloodUnitDialog({ open, onOpenChange, unit, onUnitUpdated }: EditBloodUnitDialogProps) {
    const { toast } = useToast();
    const [status, setStatus] = useState<BloodUnit['status'] | ''>('');

    useEffect(() => {
        if (unit) {
            setStatus(unit.status);
        }
    }, [unit]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!status || !unit) {
            toast({
                title: "Aucun statut sélectionné",
                description: "Veuillez sélectionner un nouveau statut.",
                variant: "destructive",
            });
            return;
        }

        onUnitUpdated(unit.id, status as BloodUnit['status']);
        onOpenChange(false);
    };
    
    const handleDialogClose = (isOpen: boolean) => {
        if (!isOpen) {
            setStatus('');
        }
        onOpenChange(isOpen);
    }

    if (!unit) return null;

    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Modifier le statut de l'unité de sang</DialogTitle>
                        <DialogDescription>
                            Mettez à jour le statut pour l'unité {unit.id} ({unit.bloodType}).
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="status">Statut</Label>
                            <Select onValueChange={(value) => setStatus(value as BloodUnit['status'])} value={status}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez un statut" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Disponible">Disponible</SelectItem>
                                    <SelectItem value="Réservé">Réservé</SelectItem>
                                    <SelectItem value="Utilisé">Utilisé</SelectItem>
                                    <SelectItem value="Expiré">Expiré</SelectItem>
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

