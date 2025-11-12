import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BarChart, Settings, PlusCircle } from "lucide-react";

export default function AdministrationPage() {
  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Administration</h1>
                <p className="text-muted-foreground">Outils et rapports pour l'administration de l'hôpital.</p>
            </div>
            <Button>
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
                    <Button className="w-full">
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
                    <Button variant="secondary" className="w-full">
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
                    <Button variant="outline" className="w-full">
                        <Settings className="mr-2 h-4 w-4" />
                        Gérer les paramètres
                    </Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
