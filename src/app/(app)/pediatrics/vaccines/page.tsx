
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PlanCampaignDialog } from "@/components/pediatrics/plan-campaign-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type VaccineCampaign = {
    id: string;
    name: string;
    status: 'Terminée' | 'En cours' | 'Planifiée' | 'À planifier';
    targetGroup: string;
    coverage: string;
};

const initialVaccineCampaigns: VaccineCampaign[] = [
    { id: 'VAC01', name: 'BCG', status: 'Terminée', targetGroup: 'Nouveau-nés', coverage: '98%' },
    { id: 'VAC02', name: 'Polio', status: 'En cours', targetGroup: 'Moins de 5 ans', coverage: '75%' },
    { id: 'VAC03', name: 'Rougeole', status: 'Planifiée', targetGroup: '9 mois et plus', coverage: 'N/A' },
    { id: 'VAC04', name: 'Fièvre Jaune', status: 'À planifier', targetGroup: 'À partir de 9 mois', coverage: 'N/A' },
];

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case 'Terminée': return 'secondary';
        case 'En cours': return 'default';
        case 'Planifiée': return 'outline';
        default: return 'destructive';
    }
}

export default function VaccinesPage() {
    const { toast } = useToast();
    const [vaccineCampaigns, setVaccineCampaigns] = useState<VaccineCampaign[]>(initialVaccineCampaigns);
    const [isPlanCampaignDialogOpen, setIsPlanCampaignDialogOpen] = useState(false);
    const [editingCampaign, setEditingCampaign] = useState<VaccineCampaign | null>(null);

    const handleOpenCreateDialog = () => {
        setEditingCampaign(null);
        setIsPlanCampaignDialogOpen(true);
    };

    const handleOpenEditDialog = (campaign: VaccineCampaign) => {
        setEditingCampaign(campaign);
        setIsPlanCampaignDialogOpen(true);
    };

    const handleDialogClose = (open: boolean) => {
        if (!open) {
            setEditingCampaign(null);
        }
        setIsPlanCampaignDialogOpen(open);
    };

    const handleCampaignSaved = (campaignData: Omit<VaccineCampaign, 'id' | 'coverage' | 'status'> & { id?: string }) => {
        if (editingCampaign) {
            // Editing existing campaign
            setVaccineCampaigns(prev => prev.map(c => c.id === editingCampaign.id ? { ...c, ...campaignData } : c));
            toast({
                title: "Campagne mise à jour",
                description: `La campagne pour ${campaignData.name} a été mise à jour.`,
            });
        } else {
            // Creating new campaign
            const campaignToAdd: VaccineCampaign = {
                ...campaignData,
                id: `VAC${Date.now()}`,
                status: 'Planifiée',
                coverage: 'N/A',
            };
            setVaccineCampaigns(prev => [campaignToAdd, ...prev]);
            toast({
                title: "Campagne planifiée",
                description: `La campagne pour ${campaignData.name} a été ajoutée.`,
            });
        }
    };
    
    const handleViewDetails = (campaign: VaccineCampaign) => {
        toast({
            title: `Détails pour la campagne ${campaign.name}`,
            description: `Statut: ${campaign.status} | Cible: ${campaign.targetGroup} | Couverture: ${campaign.coverage}`
        })
    }

    return (
        <>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Gestion des vaccins</h1>
                        <p className="text-muted-foreground">Suivez et mettez à jour le statut des campagnes de vaccination.</p>
                    </div>
                    <Button onClick={handleOpenCreateDialog}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Planifier une campagne
                    </Button>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Campagnes de vaccination</CardTitle>
                        <CardDescription>Liste de toutes les campagnes de vaccination actuelles et passées.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Vaccin</TableHead>
                                    <TableHead>Statut de la campagne</TableHead>
                                    <TableHead>Groupe cible</TableHead>
                                    <TableHead>Taux de couverture</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {vaccineCampaigns.map(campaign => (
                                    <TableRow key={campaign.id}>
                                        <TableCell className="font-medium">{campaign.name}</TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusBadgeVariant(campaign.status)}>{campaign.status}</Badge>
                                        </TableCell>
                                        <TableCell>{campaign.targetGroup}</TableCell>
                                        <TableCell>{campaign.coverage}</TableCell>
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
                                                    <DropdownMenuItem onClick={() => handleViewDetails(campaign)}>Voir les détails</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleOpenEditDialog(campaign)}>Modifier</DropdownMenuItem>
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
            <PlanCampaignDialog
                open={isPlanCampaignDialogOpen}
                onOpenChange={handleDialogClose}
                onCampaignSaved={handleCampaignSaved}
                campaign={editingCampaign}
            />
        </>
    );
}
