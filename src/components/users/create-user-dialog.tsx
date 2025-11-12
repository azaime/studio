
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { User } from '@/lib/types';

interface CreateUserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onUserCreated: (newUser: Omit<User, 'id' | 'lastLogin'>) => void;
}

export function CreateUserDialog({ open, onOpenChange, onUserCreated }: CreateUserDialogProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<User['role'] | ''>('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name || !email || !role || !password) {
            return;
        }
        onUserCreated({ name, email, role: role as User['role'] });
        onOpenChange(false);
        // Reset form
        setName('');
        setEmail('');
        setRole('');
        setPassword('');
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Créer un nouveau compte</DialogTitle>
                        <DialogDescription>
                            Remplissez les détails pour créer un nouveau compte utilisateur.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nom
                            </Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="col-span-3"
                                placeholder="Nom complet"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="col-span-3"
                                placeholder="addresse@email.com"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="role" className="text-right">
                                Rôle
                            </Label>
                            <Select onValueChange={(value) => setRole(value as User['role'])} value={role}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Sélectionnez un rôle" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Admin">Admin</SelectItem>
                                    <SelectItem value="Docteur">Docteur</SelectItem>
                                    <SelectItem value="Infirmier">Infirmier</SelectItem>
                                    <SelectItem value="Pharmacien">Pharmacien</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">
                                Mot de passe
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Annuler
                        </Button>
                        <Button type="submit">Créer le compte</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
