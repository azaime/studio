
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, DropdownMenuPortal } from "@/components/ui/dropdown-menu";

type Toy = {
    id: string;
    name: string;
    status: 'Propre' | 'En usage' | 'À nettoyer' | 'Cassé';
    lastCleaned: string;
};

const initialToys: Toy[] = [
    { id: 'TOY01', name: 'Ours en peluche', status: 'Propre', lastCleaned: '2024-07-28' },
    { id: 'TOY02', name: 'Voiture de course', status: 'En usage', lastCleaned: '2024-07-28' },
    { id: 'TOY03', name: 'Poupée', status: 'À nettoyer', lastCleaned: '2024-07-27' },
    { id: 'TOY04', name: 'Jeu de construction', status: 'Cassé', lastCleaned: '2024-07-25' },
    { id: 'TOY05', name: 'Livre d\'images', status: 'Propre', lastCleaned: '2024-07-29' },
];

const getStatusBadgeVariant = (status: Toy['status']) => {
    switch (status) {
        case 'Propre': return 'secondary';
        case 'En usage': return 'default';
        case 'À nettoyer': return 'outline';
        case 'Cassé': return 'destructive';
        default: return 'default';
    }
}

export default function PlayroomPage() {
    const { toast } = useToast();
    const [toys, setToys] = useState<Toy[]>(initialToys);

    const handleAddToy = () => {
        toast({
            title: "Fonctionnalité à venir",
            description: "L'ajout de nouveaux jouets sera bientôt disponible.",
        });
    };

    const handleViewDetails = (toy: Toy) => {
        toast({
            title: `Détails pour ${toy.name}`,
            description: `Statut: ${toy.status} | Dernier nettoyage: ${toy.lastCleaned}`,
        });
    };

    const handleUpdateStatus = (toyId: string, newStatus: Toy['status']) => {
        setToys(prevToys => prevToys.map(toy => 
            toy.id === toyId ? { ...toy, status: newStatus } : toy
        ));
        toast({
            title: "Statut mis à jour",
            description: `Le statut du jouet a été mis à jour à "${newStatus}".`,
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Gestion de la salle de jeux</h1>
                    <p className="text-muted-foreground">Suivi de l'inventaire et de la propreté des jouets.</p>
                </div>
                <Button onClick={handleAddToy}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Ajouter un jouet
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Inventaire des jouets</CardTitle>
                    <CardDescription>Liste de tous les jouets dans la salle de jeux.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Jouet</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>Dernier nettoyage</TableHead>
                                <TableHead><span className="sr-only">Actions</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {toys.map(toy => (
                                <TableRow key={toy.id}>
                                    <TableCell className="font-medium">{toy.name}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusBadgeVariant(toy.status)}>{toy.status}</Badge>
                                    </TableCell>
                                    <TableCell>{toy.lastCleaned}</TableCell>
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
                                                <DropdownMenuItem onClick={() => handleViewDetails(toy)}>Voir les détails</DropdownMenuItem>
                                                <DropdownMenuSub>
                                                    <DropdownMenuSubTrigger>Modifier le statut</DropdownMenuSubTrigger>
                                                    <DropdownMenuPortal>
                                                        <DropdownMenuSubContent>
                                                            <DropdownMenuItem onClick={() => handleUpdateStatus(toy.id, 'Propre')}>Propre</DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleUpdateStatus(toy.id, 'En usage')}>En usage</DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleUpdateStatus(toy.id, 'À nettoyer')}>À nettoyer</DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleUpdateStatus(toy.id, 'Cassé')}>Cassé</DropdownMenuItem>
                                                        </DropdownMenuSubContent>
                                                    </DropdownMenuPortal>
                                                </DropdownMenuSub>
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
    );
}
