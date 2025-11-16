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

interface AddToyDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onToySaved: (toyData: { name: string }) => void;
}

export function AddToyDialog({ open, onOpenChange, onToySaved }: AddToyDialogProps) {
    const { toast } = useToast();
    const [name, setName] = useState('');

    const resetForm = () => {
        setName('');
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name) {
            toast({
                title: "Formulaire incomplet",
                description: "Veuillez entrer le nom du jouet.",
                variant: "destructive",
            });
            return;
        }

        onToySaved({ name });
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
                        <DialogTitle>Ajouter un nouveau jouet</DialogTitle>
                        <DialogDescription>
                            Entrez le nom du nouveau jouet à ajouter à l'inventaire.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="toy-name">Nom du jouet</Label>
                            <Input id="toy-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Puzzle, Légos" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
                        <Button type="submit">Ajouter le jouet</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
