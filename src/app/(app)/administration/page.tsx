
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BarChart, Settings, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdministrationPage() {
  const { toast } = useToast();

  const handleAddTask = () => {
    toast({
        title: "Fonctionnalité à venir",
        description: "L'ajout de tâches sera bientôt disponible.",
    });
  };
  
  const handleFeatureComingSoon = (feature: string) => {
    toast({
        title: "Fonctionnalité à venir",
        description: `La section '${feature}' sera bientôt disponible.`,
    });
  }

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Administration</h1>
                <p className="text-muted-foreground">Outils et rapports pour l'administration de l'hôpital.</p>
            </div>
            <Button onClick={handleAddTask}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Ajouter une tâche
            </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader>
                    <CardTitle>Rapports mensuels</CardTitle>
                    <CardDescription>Générez et téléchargez les rapports d'activité.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="w-full" onClick={() => handleFeatureComingSoon('Télécharger le rapport')}>
                        <Download className="mr-2 h-4 w-4" />
                        Télécharger le rapport de Juillet
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Analyses et statistiques</CardTitle>
                    <CardDescription>Visualisez les données clés de performance.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="secondary" className="w-full" onClick={() => handleFeatureComingSoon('Accéder au tableau de bord analytique')}>
                        <BarChart className="mr-2 h-4 w-4" />
                        Accéder au tableau de bord analytique
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Paramètres du système</CardTitle>
                    <CardDescription>Configurer les paramètres généraux de l'application.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="outline" className="w-full" onClick={() => handleFeatureComingSoon('Gérer les paramètres')}>
                        <Settings className="mr-2 h-4 w-4" />
                        Gérer les paramètres
                    </Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
