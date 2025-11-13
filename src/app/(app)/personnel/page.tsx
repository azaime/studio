
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { users as initialUsers, User } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, UserPlus } from "lucide-react";
import { CreateUserDialog } from '@/components/users/create-user-dialog';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'Admin': return 'destructive';
      case 'Docteur': return 'default';
      case 'Infirmier': return 'outline';
      case 'Pharmacien': return 'secondary';
      default: return 'default';
    }
  }

export default function PersonnelPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleOpenCreateDialog = () => {
    setEditingUser(null);
    setIsUserDialogOpen(true);
  }

  const handleOpenEditDialog = (user: User) => {
    setEditingUser(user);
    setIsUserDialogOpen(true);
  }

  const handleUserSaved = (userData: Omit<User, 'id' | 'lastLogin'> & { id?: string }) => {
    if (userData.id) { // Editing existing user
        setUsers(prev => prev.map(u => u.id === userData.id ? { ...u, ...userData, lastLogin: u.lastLogin } : u));
        toast({
            title: 'Compte mis à jour',
            description: `Le compte pour ${userData.name} a été mis à jour avec succès.`
        });
    } else { // Creating new user
        const userEntry: User = {
            ...userData,
            id: `USR${Date.now()}`,
            lastLogin: 'À l\'instant'
        };
        setUsers(prev => [userEntry, ...prev]);
        toast({
            title: 'Compte créé',
            description: `Le compte pour ${userData.name} a été créé avec succès.`
        });
    }
  }

  const handleViewDetails = (user: User) => {
    toast({
        title: `Détails pour ${user.name}`,
        description: `Email: ${user.email}, Rôle: ${user.role}`
    });
  }

  const handleDeactivate = (user: User) => {
    toast({
        title: "Fonctionnalité à venir",
        description: `La désactivation du compte pour ${user.name} sera bientôt disponible.`,
        variant: "destructive"
    });
  }

  return (
    <>
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Gestion du Personnel</h1>
                <p className="text-muted-foreground">Gérer les informations et les horaires du personnel de l'hôpital.</p>
            </div>
            <Button onClick={handleOpenCreateDialog}>
                <UserPlus className="mr-2 h-4 w-4" />
                Ajouter un membre
            </Button>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Liste du personnel</CardTitle>
                <CardDescription>Liste de tous les employés de l'hôpital.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Rôle</TableHead>
                        <TableHead>Dernière connexion</TableHead>
                        <TableHead><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
                            </TableCell>
                            <TableCell>{user.lastLogin}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">Menu</span>
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => handleViewDetails(user)}>Voir les détails</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleOpenEditDialog(user)}>Modifier le compte</DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeactivate(user)}>Désactiver le compte</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
    <CreateUserDialog 
        open={isUserDialogOpen}
        onOpenChange={setIsUserDialogOpen}
        onUserSaved={handleUserSaved}
        user={editingUser}
      />
    </>
  );
}
