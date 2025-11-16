
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PlanCampaignDialog } from "@/components/pediatrics/plan-campaign-dialog";

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

    const handlePlanCampaign = (newCampaign: Omit<VaccineCampaign, 'id' | 'coverage' | 'status'>) => {
        const campaignToAdd: VaccineCampaign = {
            ...newCampaign,
            id: `VAC${Date.now()}`,
            status: 'Planifiée',
            coverage: 'N/A',
        };
        setVaccineCampaigns(prev => [campaignToAdd, ...prev]);
        toast({
            title: "Campagne planifiée",
            description: `La campagne pour ${newCampaign.name} a été ajoutée.`,
        });
    };

    return (
        <>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Gestion des vaccins</h1>
                        <p className="text-muted-foreground">Suivez et mettez à jour le statut des campagnes de vaccination.</p>
                    </div>
                    <Button onClick={() => setIsPlanCampaignDialogOpen(true)}>
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
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            <PlanCampaignDialog
                open={isPlanCampaignDialogOpen}
                onOpenChange={setIsPlanCampaignDialogOpen}
                onCampaignSaved={handlePlanCampaign}
            />
        </>
    );
}
