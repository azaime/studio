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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { users } from '@/lib/data'; // Assuming users are available from here

interface AddTaskDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddTaskDialog({ open, onOpenChange }: AddTaskDialogProps) {
    const { toast } = useToast();
    const [taskName, setTaskName] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [dueDate, setDueDate] = useState<Date | undefined>();
    const [priority, setPriority] = useState('');

    const resetForm = () => {
        setTaskName('');
        setAssignedTo('');
        setDueDate(undefined);
        setPriority('');
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!taskName || !assignedTo || !dueDate || !priority) {
            toast({
                title: "Formulaire incomplet",
                description: "Veuillez remplir tous les champs.",
                variant: "destructive",
            });
            return;
        }

        console.log({ taskName, assignedTo, dueDate, priority });

        toast({
            title: "Tâche ajoutée",
            description: `La tâche "${taskName}" a été ajoutée avec succès.`,
        });
        
        resetForm();
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
                        <DialogTitle>Ajouter une nouvelle tâche</DialogTitle>
                        <DialogDescription>
                            Remplissez les détails de la tâche ci-dessous.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="task-name">Nom de la tâche</Label>
                            <Input id="task-name" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="Ex: Commander de nouvelles fournitures" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="assigned-to">Assigner à</Label>
                            <Select onValueChange={setAssignedTo} value={assignedTo}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez un membre du personnel" />
                                </SelectTrigger>
                                <SelectContent>
                                    {users.map(user => (
                                        <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="due-date">Date d'échéance</Label>
                             <Popover>
                                <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !dueDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {dueDate ? format(dueDate, "PPP", { locale: fr }) : <span>Choisissez une date</span>}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={dueDate}
                                    onSelect={setDueDate}
                                    initialFocus
                                    locale={fr}
                                />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="priority">Priorité</Label>
                            <Select onValueChange={setPriority} value={priority}>
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
                        <Button type="submit">Ajouter la tâche</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
