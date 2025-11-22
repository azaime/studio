
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { bloodGroups } from '@/app/(app)/blood-bank/page';
import type { BloodUnit } from '@/lib/types';

interface AddBloodUnitDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onUnitAdded: (unitData: Omit<BloodUnit, 'id' | 'status'>) => void;
}

export function AddBloodUnitDialog({ open, onOpenChange, onUnitAdded }: AddBloodUnitDialogProps) {
    const { toast } = useToast();
    const [bloodType, setBloodType] = useState('');
    const [donorId, setDonorId] = useState('');
    const [collectionDate, setCollectionDate] = useState<Date | undefined>(new Date());

    const resetForm = () => {
        setBloodType('');
        setDonorId('');
        setCollectionDate(new Date());
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!bloodType || !donorId || !collectionDate) {
            toast({
                title: "Formulaire incomplet",
                description: "Veuillez remplir tous les champs.",
                variant: "destructive",
            });
            return;
        }

        const expiryDate = addDays(collectionDate, 42);

        onUnitAdded({
            bloodType,
            donorId,
            collectionDate: format(collectionDate, 'yyyy-MM-dd'),
            expiryDate: format(expiryDate, 'yyyy-MM-dd')
        });

        toast({
            title: "Unité de sang ajoutée",
            description: `Une unité de groupe ${bloodType} a été ajoutée à l'inventaire.`,
        });

        onOpenChange(false);
    };

    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            resetForm();
        }
        onOpenChange(isOpen);
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Ajouter une nouvelle unité de sang</DialogTitle>
                        <DialogDescription>
                            Remplissez les détails de l'unité de sang ci-dessous.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="blood-type">Groupe Sanguin</Label>
                            <Select onValueChange={setBloodType} value={bloodType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez un groupe sanguin" />
                                </SelectTrigger>
                                <SelectContent>
                                    {bloodGroups.map(group => (
                                        <SelectItem key={group} value={group}>{group}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="donor-id">ID du Donateur</Label>
                            <Input 
                                id="donor-id" 
                                value={donorId} 
                                onChange={(e) => setDonorId(e.target.value)} 
                                placeholder="Entrez l'ID du donateur" 
                            />
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="collection-date">Date de collecte</Label>
                             <Popover>
                                <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !collectionDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {collectionDate ? format(collectionDate, "PPP", { locale: fr }) : <span>Choisissez une date</span>}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={collectionDate}
                                    onSelect={setCollectionDate}
                                    initialFocus
                                    locale={fr}
                                />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
                        <Button type="submit">Ajouter l'unité</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
