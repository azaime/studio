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
  import { users } from "@/lib/data"
  import { MoreHorizontal, UserPlus } from "lucide-react"
  import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
  import { Button } from "@/components/ui/button"
  
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
    return (
      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                <div>
                    <CardTitle>Gestion des comptes utilisateurs</CardTitle>
                    <CardDescription>
                    Créez et gérez les comptes et autorisations des utilisateurs.
                    </CardDescription>
                </div>
                <Button>
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
                        <DropdownMenuItem>Modifier les autorisations</DropdownMenuItem>
                        <DropdownMenuItem>Réinitialiser le mot de passe</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Désactiver le compte</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }
  