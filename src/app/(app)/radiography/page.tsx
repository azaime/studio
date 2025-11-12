
"use client";

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, ListOrdered, FileSearch, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { RequestExamDialog } from '@/components/radiography/request-exam-dialog';

export default function RadiographyPage() {
  const { toast } = useToast();
  const [isRequestingExam, setIsRequestingExam] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "Ordonnance téléchargée",
        description: `Le fichier "${file.name}" a été sélectionné.`,
      });
    }
  };

  const handleManageQueue = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "La gestion de la file d'attente sera bientôt disponible.",
    });
  };

  const handleSearchExams = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "La recherche dans les archives sera bientôt disponible.",
    });
  };

  const handleExamRequested = (data: { patientName: string, examType: string }) => {
    toast({
      title: "Demande d'examen créée",
      description: `Une demande pour ${data.patientName} (${data.examType}) a été créée.`,
    });
    // Here you would typically update a state with the new request
  };

  return (
    <>
      <div className="space-y-6">
          <div className="flex justify-between items-center">
              <div>
                  <h1 className="text-2xl font-bold tracking-tight">Service de Radiographie</h1>
                  <p className="text-muted-foreground">Gestion des examens d'imagerie par rayons X.</p>
              </div>
              <Button onClick={() => setIsRequestingExam(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nouvelle demande
              </Button>
          </div>
          
          <Card>
              <CardHeader>
                  <CardTitle>Nouvelle demande d'examen</CardTitle>
                  <CardDescription>Remplissez les informations pour une nouvelle radiographie.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                   <Input placeholder="Nom du patient ou ID" />
                   <Button className="w-full" onClick={handleUploadClick}>
                      <Upload className="mr-2 h-4 w-4" />
                      Télécharger l'ordonnance
                   </Button>
                   <Input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*,.pdf"
                    />
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
                      <Button variant="secondary" className="mt-4" onClick={handleManageQueue}>
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
                      <Button variant="outline" className="mt-4" onClick={handleSearchExams}>
                          <FileSearch className="mr-2 h-4 w-4" />
                          Rechercher un examen
                      </Button>
                  </CardContent>
              </Card>
          </div>
      </div>
      <RequestExamDialog 
        open={isRequestingExam}
        onOpenChange={setIsRequestingExam}
        onExamRequested={handleExamRequested}
      />
    </>
  );
}
