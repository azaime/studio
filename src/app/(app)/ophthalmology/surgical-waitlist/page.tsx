
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { EditWaitlistDialog } from "@/components/ophthalmology/edit-waitlist-dialog";

type SurgicalWaitlistItem = { 
    id: string; 
    patientName: string; 
    surgery: string; 
    priority: 'Haute' | 'Moyenne' | 'Basse'; 
    dateAdded: string; 
};

const initialSurgicalWaitlist: SurgicalWaitlistItem[] = [
    { id: 'SWL001', patientName: 'Ibrahima Fall', surgery: 'Cataracte', priority: 'Haute', dateAdded: '2024-07-15' },
    { id: 'SWL002', patientName: 'Ndeye Khady Diop', surgery: 'Glaucome', priority: 'Moyenne', dateAdded: '2024-07-18' },
    { id: 'SWL003', patientName: 'Cheikh Anta Sylla', surgery: 'Ptosis', priority: 'Basse', dateAdded: '2024-07-20' },
];

const getPriorityBadge = (priority: string) => {
    switch (priority) {
        case 'Haute': return 'destructive';
        case 'Moyenne': return 'default';
        case 'Basse': return 'secondary';
        default: return 'outline';
    }
}

export default function SurgicalWaitlistPage() {
    const { toast } = useToast();
    const [waitlist, setWaitlist] = useState<SurgicalWaitlistItem[]>(initialSurgicalWaitlist);
    const [editingItem, setEditingItem] = useState<SurgicalWaitlistItem | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleViewDetails = (item: SurgicalWaitlistItem) => {
        toast({
            title: `Détails pour ${item.patientName}`,
            description: `Intervention: ${item.surgery}, Priorité: ${item.priority}, Ajouté le: ${item.dateAdded}`
        });
    };

    const handleOpenEditDialog = (item: SurgicalWaitlistItem) => {
        setEditingItem(item);
        setIsEditDialogOpen(true);
    };

    const handleItemSaved = (updatedItem: SurgicalWaitlistItem) => {
        setWaitlist(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
        toast({
            title: "Liste d'attente mise à jour",
            description: `La priorité pour ${updatedItem.patientName} est maintenant "${updatedItem.priority}".`
        });
    };
    
    return (
        <>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Liste d'attente chirurgicale</h1>
                    <p className="text-muted-foreground">Patients en attente d'une intervention chirurgicale en ophtalmologie.</p>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Liste d'attente</CardTitle>
                        <CardDescription>Gestion des priorités pour les interventions à venir.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>Intervention</TableHead>
                                    <TableHead>Priorité</TableHead>
                                    <TableHead>Date d'ajout</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {waitlist.map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.patientName}</TableCell>
                                        <TableCell>{item.surgery}</TableCell>
                                        <TableCell>
                                            <Badge variant={getPriorityBadge(item.priority)}>{item.priority}</Badge>
                                        </TableCell>
                                        <TableCell>{item.dateAdded}</TableCell>
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
                                                    <DropdownMenuItem onClick={() => handleViewDetails(item)}>Voir les détails</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleOpenEditDialog(item)}>Modifier</DropdownMenuItem>
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
            <EditWaitlistDialog
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                item={editingItem}
                onItemSaved={handleItemSaved}
            />
        </>
    );
}
