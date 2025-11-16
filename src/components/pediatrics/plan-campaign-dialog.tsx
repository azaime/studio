
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

type VaccineCampaign = {
    id: string;
    name: string;
    status: 'Terminée' | 'En cours' | 'Planifiée' | 'À planifier';
    targetGroup: string;
    coverage: string;
};

interface PlanCampaignDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCampaignSaved: (campaignData: Omit<VaccineCampaign, 'id' | 'coverage'> & { id?: string }) => void;
    campaign?: VaccineCampaign | null;
}

export function PlanCampaignDialog({ open, onOpenChange, onCampaignSaved, campaign }: PlanCampaignDialogProps) {
    const { toast } = useToast();
    const [name, setName] = useState('');
    const [targetGroup, setTargetGroup] = useState('');
    const [status, setStatus] = useState<VaccineCampaign['status'] | ''>('');

    const isEditing = !!campaign;

    useEffect(() => {
        if (open) {
            if (isEditing && campaign) {
                setName(campaign.name);
                setTargetGroup(campaign.targetGroup);
                setStatus(campaign.status);
            } else {
                setName('');
                setTargetGroup('');
                setStatus('');
            }
        }
    }, [campaign, isEditing, open]);


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name || !targetGroup || (isEditing && !status)) {
            toast({
                title: "Formulaire incomplet",
                description: "Veuillez remplir tous les champs.",
                variant: "destructive",
            });
            return;
        }

        onCampaignSaved({ 
            id: campaign?.id,
            name, 
            targetGroup,
            status: (status as VaccineCampaign['status']) || 'Planifiée'
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{isEditing ? 'Modifier la campagne' : 'Planifier une nouvelle campagne'}</DialogTitle>
                        <DialogDescription>
                            {isEditing ? 'Mettez à jour les détails de la campagne.' : 'Remplissez les détails de la campagne ci-dessous.'}
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
                        {isEditing && (
                             <div className="space-y-2">
                                <Label htmlFor="status">Statut</Label>
                                <Select onValueChange={(value) => setStatus(value as VaccineCampaign['status'])} value={status}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionnez un statut" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="À planifier">À planifier</SelectItem>
                                        <SelectItem value="Planifiée">Planifiée</SelectItem>
                                        <SelectItem value="En cours">En cours</SelectItem>
                                        <SelectItem value="Terminée">Terminée</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
                        <Button type="submit">{isEditing ? 'Enregistrer les modifications' : 'Planifier la campagne'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
