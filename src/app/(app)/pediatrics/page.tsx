import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Syringe, ToyBrick } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function PediatricsPage() {
  return (
    <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Service de Pédiatrie</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             <Card>
              <CardHeader>
                <CardTitle>Occupation des lits</CardTitle>
                <CardDescription>Taux d'occupation actuel en pédiatrie.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">85%</div>
                <Progress value={85} className="mt-2"/>
                <p className="text-xs text-muted-foreground mt-1">17 lits occupés sur 20</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Calendrier de vaccination</CardTitle>
                <CardDescription>Suivi des campagnes de vaccination.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="flex justify-between"><span>BCG</span> <Badge variant="secondary">À jour</Badge></div>
                <div className="flex justify-between"><span>Polio</span> <Badge>En cours</Badge></div>
                <div className="flex justify-between"><span>Rougeole</span> <Badge variant="outline">À venir</Badge></div>
                <Button size="sm" className="mt-2"><Syringe className="mr-2"/> Gérer les vaccins</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ressources rapides</CardTitle>
                <CardDescription>Accès rapide aux dossiers et salles.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Button variant="outline"><FileText className="mr-2"/> Dossiers pédiatriques</Button>
                <Button variant="outline"><ToyBrick className="mr-2"/> Gérer la salle de jeux</Button>
              </CardContent>
            </Card>
        </div>
    </div>
  );
}
