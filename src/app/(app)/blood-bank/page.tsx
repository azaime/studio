
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle, Droplets } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { bloodUnits as initialBloodUnits } from "@/lib/data";
import type { BloodUnit } from "@/lib/types";
import { EditBloodUnitDialog } from "@/components/blood-bank/edit-blood-unit-dialog";
import { AddBloodUnitDialog } from "@/components/blood-bank/add-blood-unit-dialog";

const getStatusBadgeVariant = (status: BloodUnit['status']) => {
  switch (status) {
    case 'Disponible': return 'secondary';
    case 'Réservé': return 'outline';
    case 'Utilisé': return 'default';
    case 'Expiré': return 'destructive';
    default: return 'default';
  }
};

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function BloodBankPage() {
  const [bloodUnits, setBloodUnits] = useState<BloodUnit[]>(initialBloodUnits);
  const { toast } = useToast();
  const [editingUnit, setEditingUnit] = useState<BloodUnit | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddUnitDialogOpen, setIsAddUnitDialogOpen] = useState(false);

  const addBloodUnit = (newUnitData: Omit<BloodUnit, 'id' | 'status'>) => {
    const newUnit: BloodUnit = {
      ...newUnitData,
      id: `BLD${Date.now()}`,
      status: 'Disponible'
    };
    setBloodUnits(prev => [newUnit, ...prev].sort((a,b) => new Date(b.collectionDate).getTime() - new Date(a.collectionDate).getTime()));
  };

  const handleUpdateStatus = (unitId: string, status: BloodUnit['status']) => {
    setBloodUnits(prev => prev.map(unit => unit.id === unitId ? { ...unit, status } : unit));
    toast({
      title: "Statut de l'unité mis à jour",
      description: `L'unité ${unitId} est maintenant marquée comme "${status}".`,
    });
  };

  const handleViewDetails = (unit: BloodUnit) => {
    toast({
      title: `Détails de l'unité ${unit.id}`,
      description: `Groupe: ${unit.bloodType}, Donateur: ${unit.donorId}, Statut: ${unit.status}`,
    });
  };

  const getStockByGroup = (group: string) => {
      return bloodUnits.filter(u => u.bloodType === group && u.status === 'Disponible').length;
  }
  
  const handleOpenEditDialog = (unit: BloodUnit) => {
    setEditingUnit(unit);
    setIsEditDialogOpen(true);
  }
  
  const handleDialogClose = (open: boolean) => {
    setIsEditDialogOpen(open);
    if (!open) {
      setEditingUnit(null);
    }
  }

  return (
    <>
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Banque de Sang</h1>
                <p className="text-muted-foreground">Gérez l'inventaire des unités de sang.</p>
            </div>
            <Button onClick={() => setIsAddUnitDialogOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Ajouter une unité
            </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {bloodGroups.map(group => (
                <Card key={group}>
                    <CardHeader className="p-4 flex flex-row items-center justify-between">
                       <CardTitle className="text-lg">{group}</CardTitle> 
                       <Droplets className="h-5 w-5 text-destructive" />
                    </CardHeader>
                    <CardContent className="p-4">
                        <div className="text-2xl font-bold">{getStockByGroup(group)}</div>
                        <p className="text-xs text-muted-foreground">unités disponibles</p>
                    </CardContent>
                </Card>
            ))}
        </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventaire des unités de sang</CardTitle>
          <CardDescription>
            Liste de toutes les unités de sang disponibles et leur statut.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Unité</TableHead>
                <TableHead>Groupe Sanguin</TableHead>
                <TableHead>Date de collecte</TableHead>
                <TableHead>Date d'expiration</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bloodUnits.map((unit) => (
                <TableRow key={unit.id}>
                  <TableCell className="font-medium">{unit.id}</TableCell>
                  <TableCell><Badge variant="outline" className="text-base">{unit.bloodType}</Badge></TableCell>
                  <TableCell>{unit.collectionDate}</TableCell>
                  <TableCell>{unit.expiryDate}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(unit.status)}>{unit.status}</Badge>
                  </TableCell>
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
                          <DropdownMenuItem onClick={() => handleViewDetails(unit)}>Voir les détails</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleOpenEditDialog(unit)}>Modifier</DropdownMenuItem>
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
    <AddBloodUnitDialog 
        open={isAddUnitDialogOpen}
        onOpenChange={setIsAddUnitDialogOpen}
        onUnitAdded={addBloodUnit}
    />
     <EditBloodUnitDialog
        open={isEditDialogOpen}
        onOpenChange={handleDialogClose}
        unit={editingUnit}
        onUnitUpdated={handleUpdateStatus}
      />
    </>
  );
}
