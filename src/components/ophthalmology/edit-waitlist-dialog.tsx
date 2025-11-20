
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

type SurgicalWaitlistItem = { 
    id: string; 
    patientName: string; 
    surgery: string; 
    priority: 'Haute' | 'Moyenne' | 'Basse'; 
    dateAdded: string; 
};

interface EditWaitlistDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    item: SurgicalWaitlistItem | null;
    onItemSaved: (updatedItem: SurgicalWaitlistItem) => void;
}

export function EditWaitlistDialog({ open, onOpenChange, item, onItemSaved }: EditWaitlistDialogProps) {
    const { toast } = useToast();
    const [priority, setPriority] = useState<SurgicalWaitlistItem['priority'] | ''>('');

    useEffect(() => {
        if (item) {
            setPriority(item.priority);
        }
    }, [item]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!priority || !item) {
            toast({
                title: "Aucune priorité sélectionnée",
                description: "Veuillez sélectionner une nouvelle priorité.",
                variant: "destructive",
            });
            return;
        }

        onItemSaved({ ...item, priority: priority as SurgicalWaitlistItem['priority'] });
        onOpenChange(false);
    };
    
    const handleDialogClose = (isOpen: boolean) => {
        if (!isOpen) {
            setPriority('');
        }
        onOpenChange(isOpen);
    }

    if (!item) return null;

    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Modifier la priorité de l'intervention</DialogTitle>
                        <DialogDescription>
                            Mettez à jour la priorité pour le patient : {item.patientName}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <p><span className="font-medium">Intervention:</span> {item.surgery}</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="priority">Priorité</Label>
                            <Select onValueChange={(value) => setPriority(value as SurgicalWaitlistItem['priority'])} value={priority}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez une priorité" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Haute">Haute</SelectItem>
                                    <SelectItem value="Moyenne">Moyenne</SelectItem>
                                    <SelectItem value="Basse">Basse</SelectItem>
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
