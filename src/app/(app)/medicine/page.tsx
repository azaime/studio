
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function MedicinePage() {
  const { toast } = useToast();

  const handleAddReport = () => {
    toast({
        title: "Fonctionnalité à venir",
        description: "L'ajout de rapports sera bientôt disponible.",
    });
  };

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Service de Médecine Générale</h1>
                <p className="text-muted-foreground">Prise en charge globale des patients et soins primaires.</p>
            </div>
            <Button onClick={handleAddReport}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Ajouter un rapport
            </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             <Card>
              <CardHeader>
                <CardTitle>Consultations du jour</CardTitle>
                <CardDescription>Aperçu des consultations en médecine générale.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">+5 par rapport à hier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Patients en attente</CardTitle>
                <CardDescription>Patients attendant une consultation.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">8</div>
                 <p className="text-xs text-muted-foreground">Temps d'attente moyen: 15min</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ressources</CardTitle>
                <CardDescription>Liens rapides et outils pour le personnel.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Button variant="outline">Protocoles cliniques</Button>
                <Button variant="outline">Base de données médicaments</Button>
              </CardContent>
            </Card>
        </div>
    </div>
  );
}
