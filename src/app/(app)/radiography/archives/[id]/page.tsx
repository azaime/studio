
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Données factices pour la démo
const archiveData = [
  { id: 'ARC001', patientName: 'Fatima Gueye', examType: 'IRM', date: '2024-07-15', report: 'Aucune anomalie détectée au niveau cérébral.' },
  { id: 'ARC002', patientName: 'Ibrahima Fall', examType: 'Radiographie osseuse', date: '2024-07-12', report: 'Fracture mineure du poignet droit.' },
  { id: 'ARC003', patientName: 'Awa Ndiaye', examType: 'Mammographie', date: '2024-07-10', report: 'Tissu mammaire dense, pas de masses suspectes.' },
];

export default function ReportPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const report = archiveData.find(item => item.id === params.id);

  const handlePrint = () => {
    toast({
      title: "Impression...",
      description: "Le rapport va être imprimé.",
    });
    window.print();
  };

  const handleDownload = () => {
    toast({
        title: "Téléchargement à venir",
        description: "La fonctionnalité de téléchargement sera bientôt disponible.",
    });
  }

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
          <p className="text-lg text-destructive">Rapport non trouvé.</p>
          <Button onClick={() => router.back()} variant="link" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux archives
          </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
        <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux archives
        </Button>

      <Card>
        <CardHeader className="flex flex-row justify-between items-start">
            <div>
                <CardTitle>Rapport d'imagerie - {report.examType}</CardTitle>
                <CardDescription>ID du rapport: {report.id}</CardDescription>
            </div>
             <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={handlePrint}>
                    <Printer className="h-4 w-4" />
                    <span className="sr-only">Imprimer</span>
                </Button>
                <Button variant="outline" size="icon" onClick={handleDownload}>
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Télécharger</span>
                </Button>
            </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-1">
                <p className="font-medium">Patient</p>
                <p className="text-muted-foreground">{report.patientName}</p>
            </div>
            <div className="space-y-1">
                <p className="font-medium">Date de l'examen</p>
                <p className="text-muted-foreground">{report.date}</p>
            </div>
             <div className="space-y-1">
                <p className="font-medium">Type d'examen</p>
                <p className="text-muted-foreground">{report.examType}</p>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Détails du rapport</h3>
            <div className="p-4 bg-secondary/50 rounded-md border text-muted-foreground">
                <p>{report.report}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
