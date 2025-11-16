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
import type { UpcomingDelivery } from '@/lib/types';

interface EditDeliveryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    delivery: UpcomingDelivery | null;
    onDeliverySaved: (updatedDelivery: UpcomingDelivery) => void;
}

export function EditDeliveryDialog({ open, onOpenChange, delivery, onDeliverySaved }: EditDeliveryDialogProps) {
    const { toast } = useToast();
    const [status, setStatus] = useState<UpcomingDelivery['status'] | ''>('');

    useEffect(() => {
        if (delivery) {
            setStatus(delivery.status);
        }
    }, [delivery]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!status || !delivery) {
            toast({
                title: "Aucun statut sélectionné",
                description: "Veuillez sélectionner un nouveau statut.",
                variant: "destructive",
            });
            return;
        }

        onDeliverySaved({ ...delivery, status: status as UpcomingDelivery['status'] });
        onOpenChange(false);
    };
    
    const handleDialogClose = (isOpen: boolean) => {
        if (!isOpen) {
            setStatus('');
        }
        onOpenChange(isOpen);
    }

    if (!delivery) return null;

    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Modifier le statut de l'accouchement</DialogTitle>
                        <DialogDescription>
                            Mettez à jour le statut pour la patiente : {delivery.patient}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="status">Statut</Label>
                            <Select onValueChange={(value) => setStatus(value as UpcomingDelivery['status'])} value={status}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez un statut" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Programmé">Programmé</SelectItem>
                                    <SelectItem value="Observation">Observation</SelectItem>
                                    <SelectItem value="Admis">Admis</SelectItem>
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
