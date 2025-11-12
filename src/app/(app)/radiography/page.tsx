import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, ListOrdered, FileSearch } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function RadiographyPage() {
  return (
    <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Service de Radiographie</h1>
        <p className="text-muted-foreground">Gestion des examens d'imagerie par rayons X.</p>
        
        <Card>
            <CardHeader>
                <CardTitle>Nouvelle demande d'examen</CardTitle>
                <CardDescription>Remplissez les informations pour une nouvelle radiographie.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <Input placeholder="Nom du patient ou ID" />
                 <Button className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Télécharger l'ordonnance
                 </Button>
            </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>File d'attente</CardTitle>
                    <CardDescription>Patients en attente d'un examen.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>3 patients en attente.</p>
                    <Button variant="secondary" className="mt-4">
                        <ListOrdered className="mr-2 h-4 w-4" />
                        Gérer la file
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Archives</CardTitle>
                    <CardDescription>Rechercher dans les examens passés.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Consultez les radiographies archivées.</p>
                    <Button variant="outline" className="mt-4">
                        <FileSearch className="mr-2 h-4 w-4" />
                        Rechercher un examen
                    </Button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
