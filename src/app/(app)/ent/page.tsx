
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Mic, Video, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ENTPage() {
  const { toast } = useToast();

  const handleFeatureComingSoon = (feature: string) => {
    toast({
        title: "Fonctionnalité à venir",
        description: `La fonctionnalité '${feature}' sera bientôt disponible.`,
    });
  }

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Service d'Oto-rhino-laryngologie (ORL)</h1>
                <p className="text-muted-foreground">
                    Gestion des consultations, audiogrammes et endoscopies.
                </p>
            </div>
            <Button onClick={() => handleFeatureComingSoon('Ajouter une consultation')}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Ajouter une consultation
            </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             <Card>
              <CardHeader>
                <CardTitle>Consultations ORL</CardTitle>
                <CardDescription>Planifier et gérer les rendez-vous ORL.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => handleFeatureComingSoon('Voir l\'agenda')}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Voir l'agenda
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tests auditifs</CardTitle>
                <CardDescription>Enregistrer et consulter les audiogrammes.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" onClick={() => handleFeatureComingSoon('Nouvel audiogramme')}>
                    <Mic className="mr-2 h-4 w-4" />
                    Nouvel audiogramme
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Endoscopie</CardTitle>
                <CardDescription>Gérer les enregistrements d'endoscopie.</CardDescription>
              </CardHeader>
              <CardContent>
                 <Button variant="outline" className="w-full" onClick={() => handleFeatureComingSoon('Voir les enregistrements')}>
                    <Video className="mr-2 h-4 w-4" />
                    Voir les enregistrements
                </Button>
              </CardContent>
            </Card>
        </div>
    </div>
  );
}
