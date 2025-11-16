
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
import type { User } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface CreateUserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onUserSaved: (user: Omit<User, 'id' | 'lastLogin'> & { id?: string }) => void;
    user?: User | null;
}

export function CreateUserDialog({ open, onOpenChange, onUserSaved, user }: CreateUserDialogProps) {
    const { toast } = useToast();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<User['role'] | ''>('');
    const [password, setPassword] = useState('');

    const isEditing = !!user;

    useEffect(() => {
        if (open) {
            if (isEditing && user) {
                setName(user.name);
                setEmail(user.email);
                setRole(user.role);
                setPassword(''); // Ne pas pré-remplir le mot de passe pour des raisons de sécurité
            } else {
                setName('');
                setEmail('');
                setRole('');
                setPassword('');
            }
        }
    }, [user, isEditing, open]);


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!name || !email || !role || (!isEditing && !password) ) {
             toast({
                title: "Formulaire incomplet",
                description: "Veuillez remplir tous les champs requis.",
                variant: "destructive",
            });
            return;
        }
        onUserSaved({ id: user?.id, name, email, role: role as User['role'], password });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{isEditing ? "Modifier le compte" : "Créer un nouveau compte"}</DialogTitle>
                        <DialogDescription>
                            {isEditing ? "Modifiez les détails ci-dessous." : "Remplissez les détails pour créer un nouveau compte utilisateur."}
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
                                placeholder={isEditing ? "Laisser vide pour ne pas changer" : ""}
                                required={!isEditing}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Annuler
                        </Button>
                        <Button type="submit">{isEditing ? "Enregistrer les modifications" : "Créer le compte"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
