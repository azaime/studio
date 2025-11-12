
"use client"
import * as React from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Badge } from "@/components/ui/badge"
  import { users as initialUsers, User } from "@/lib/data"
  import { MoreHorizontal, UserPlus } from "lucide-react"
  import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
  import { Button } from "@/components/ui/button"
  import { useToast } from "@/hooks/use-toast"
  import { CreateUserDialog } from "@/components/users/create-user-dialog"

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'Admin': return 'destructive';
      case 'Docteur': return 'default';
      case 'Infirmier': return 'outline';
      case 'Pharmacien': return 'secondary';
      default: return 'default';
    }
  }
  
  export default function UsersPage() {
    const { toast } = useToast()
    const [users, setUsers] = React.useState<User[]>(initialUsers);
    const [isCreateUserOpen, setIsCreateUserOpen] = React.useState(false);

    const handleUserCreated = (newUser: Omit<User, 'id' | 'lastLogin'>) => {
        const userEntry: User = {
            ...newUser,
            id: `USR${Date.now()}`,
            lastLogin: 'À l\'instant'
        };
        setUsers(prev => [userEntry, ...prev]);
        toast({
            title: 'Compte créé',
            description: `Le compte pour ${newUser.name} a été créé avec succès.`
        });
    }

    return (
    <>
      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                <div>
                    <CardTitle>Gestion des comptes utilisateurs</CardTitle>
                    <CardDescription>
                    Créez et gérez les comptes et autorisations des utilisateurs.
                    </CardDescription>
                </div>
                <Button onClick={() => setIsCreateUserOpen(true)}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Créer un compte
                </Button>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Dernière connexion</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
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
                        <DropdownMenuItem onClick={() => toast({ title: "Fonctionnalité non implémentée" })}>Modifier les autorisations</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast({ title: "Fonctionnalité non implémentée" })}>Réinitialiser le mot de passe</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => toast({ title: "Fonctionnalité non implémentée", variant: "destructive" })}>Désactiver le compte</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <CreateUserDialog 
        open={isCreateUserOpen}
        onOpenChange={setIsCreateUserOpen}
        onUserCreated={handleUserCreated}
      />
    </>
    )
  }
