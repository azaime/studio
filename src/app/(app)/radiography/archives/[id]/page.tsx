
"use client";

import { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Données factices pour la démo
const archiveData = [
  { id: 'ARC001', patientName: 'Fatima Gueye', examType: 'IRM', date: '2024-07-15', report: 'Aucune anomalie détectée au niveau cérébral.' },
  { id: 'ARC002', patientName: 'Ibrahima Fall', examType: 'Radiographie osseuse', date: '2024-07-12', report: 'Fracture mineure du poignet droit.' },
  { id: 'ARC003', patientName: 'Awa Ndiaye', examType: 'Mammographie', date: '2024-07-10', report: 'Tissu mammaire dense, pas de masses suspectes.' },
];

export default function ReportPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const reportRef = useRef<HTMLDivElement>(null);
  const reportId = Array.isArray(params.id) ? params.id[0] : params.id;
  const report = archiveData.find(item => item.id === reportId);

  const handleDownload = () => {
    const input = reportRef.current;
    if (!input) {
      toast({
        title: "Erreur",
        description: "Impossible de trouver le contenu du rapport à télécharger.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Génération du PDF...",
      description: "Le rapport va bientôt être téléchargé.",
    });

    html2canvas(input, { scale: 2 })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        const width = pdfWidth - 20; // with margin
        let height = width / ratio;
        let position = 10;
        
        if (height > pdfHeight - 20) {
            height = pdfHeight - 20; // cap height
        }
        
        pdf.addImage(imgData, 'PNG', 10, position, width, height, undefined, 'FAST');
        pdf.save(`rapport_${report?.id}.pdf`);

        toast({
          title: "Téléchargement terminé",
          description: "Le rapport PDF a été téléchargé.",
        });
      })
      .catch(err => {
        console.error("Erreur lors de la génération du PDF:", err);
        toast({
          title: "Erreur de téléchargement",
          description: "Une erreur s'est produite lors de la génération du PDF.",
          variant: "destructive",
        });
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
        <div className="flex justify-between items-center">
            <Button onClick={() => router.back()} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux archives
            </Button>
            <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => window.print()}>
                    <Printer className="h-4 w-4" />
                    <span className="sr-only">Imprimer</span>
                </Button>
                <Button variant="outline" size="icon" onClick={handleDownload}>
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Télécharger</span>
                </Button>
            </div>
        </div>

      <div ref={reportRef} className="bg-background p-4 sm:p-6 rounded-lg">
        <Card>
          <CardHeader>
              <div>
                  <CardTitle>Rapport d'imagerie - {report.examType}</CardTitle>
                  <CardDescription>ID du rapport: {report.id}</CardDescription>
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
    </div>
  );
}
