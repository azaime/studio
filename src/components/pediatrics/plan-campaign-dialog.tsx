
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

interface PlanCampaignDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCampaignSaved: (campaignData: { name: string; targetGroup: string; }) => void;
}

export function PlanCampaignDialog({ open, onOpenChange, onCampaignSaved }: PlanCampaignDialogProps) {
    const { toast } = useToast();
    const [name, setName] = useState('');
    const [targetGroup, setTargetGroup] = useState('');

    const resetForm = () => {
        setName('');
        setTargetGroup('');
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name || !targetGroup) {
            toast({
                title: "Formulaire incomplet",
                description: "Veuillez remplir tous les champs.",
                variant: "destructive",
            });
            return;
        }

        onCampaignSaved({ name, targetGroup });
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
                        <DialogTitle>Planifier une nouvelle campagne</DialogTitle>
                        <DialogDescription>
                            Remplissez les détails de la campagne ci-dessous.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="campaign-name">Nom du vaccin</Label>
                            <Input id="campaign-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Rougeole, Polio" />
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="target-group">Groupe Cible</Label>
                            <Input id="target-group" value={targetGroup} onChange={(e) => setTargetGroup(e.target.value)} placeholder="Ex: Enfants de moins de 5 ans" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
                        <Button type="submit">Planifier la campagne</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
