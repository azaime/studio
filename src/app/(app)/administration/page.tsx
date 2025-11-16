
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BarChart, Settings, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AddTaskDialog } from "@/components/administration/add-task-dialog";

export default function AdministrationPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);

  const handleDownloadReport = () => {
    toast({
      title: "Génération du rapport...",
      description: "Le rapport de Juillet va bientôt être téléchargé.",
    });

    // Contenu factice pour le rapport
    const reportContent = `Rapport Mensuel - Juillet 2024\n\nSection 1: Résumé de l'activité\n- Patients admis: 150\n- Consultations: 450\n- Interventions chirurgicales: 45\n\nSection 2: Performance Financière\n- Revenus: 12,500,000 XOF\n- Dépenses: 8,750,000 XOF\n\nFin du rapport.`;

    // Créer un blob et un lien de téléchargement
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rapport_juillet.txt';
    document.body.appendChild(a);
    a.click();
    
    // Nettoyage
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Administration</h1>
                <p className="text-muted-foreground">Outils et rapports pour l'administration de l'hôpital.</p>
            </div>
            <Button onClick={() => setIsAddTaskDialogOpen(true)}>
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
                    <Button className="w-full" onClick={handleDownloadReport}>
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
                    <Button variant="secondary" className="w-full" onClick={() => router.push('/administration/analytics')}>
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
                    <Button variant="outline" className="w-full" onClick={() => router.push('/administration/settings')}>
                        <Settings className="mr-2 h-4 w-4" />
                        Gérer les paramètres
                    </Button>
                </CardContent>
            </Card>
        </div>
    </div>
    <AddTaskDialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen} />
    </>
  );
}
