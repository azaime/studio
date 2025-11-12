
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, PlusCircle, List } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function OphthalmologyPage() {
  const { toast } = useToast();

  const handleNewConsultation = () => {
    toast({
        title: "Fonctionnalité à venir",
        description: "La planification de nouvelles consultations sera bientôt disponible.",
    });
  };

  const handleManageVisionTests = () => {
      toast({
          title: "Fonctionnalité à venir",
          description: "La gestion des tests de vision sera bientôt disponible.",
      });
  };

  const handleViewSurgicalWaitlist = () => {
      toast({
          title: "Fonctionnalité à venir",
          description: "La liste d'attente chirurgicale sera bientôt disponible.",
      });
  };

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Service d'Ophtalmologie</h1>
                <p className="text-muted-foreground">
                    Soins des yeux, traitements médicaux et chirurgicaux des maladies oculaires.
                </p>
            </div>
            <Button onClick={handleNewConsultation}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nouvelle consultation
            </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Consultations à venir</CardTitle>
                    <CardDescription>Liste des prochains rendez-vous en ophtalmologie.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Aucune consultation à venir pour le moment.</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Actions rapides</CardTitle>
                    <CardDescription>Raccourcis pour les tâches courantes.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <Button variant="secondary" onClick={handleManageVisionTests}>
                        <Eye className="mr-2 h-4 w-4" />
                        Gérer les tests de vision
                    </Button>
                    <Button variant="outline" onClick={handleViewSurgicalWaitlist}>
                        <List className="mr-2 h-4 w-4" />
                        Voir la liste d'attente chirurgicale
                    </Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
