import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { users } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

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
  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Gestion du Personnel</h1>
                <p className="text-muted-foreground">Gérer les informations et les horaires du personnel de l'hôpital.</p>
            </div>
            <Button>
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
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
