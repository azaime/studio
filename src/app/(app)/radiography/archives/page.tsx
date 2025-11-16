
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const archiveData = [
  { id: 'ARC001', patientName: 'Fatima Gueye', examType: 'IRM', date: '2024-07-15' },
  { id: 'ARC002', patientName: 'Ibrahima Fall', examType: 'Radiographie osseuse', date: '2024-07-12' },
  { id: 'ARC003', patientName: 'Awa Ndiaye', examType: 'Mammographie', date: '2024-07-10' },
];

export default function RadiographyArchivesPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    toast({
      title: "Recherche en cours...",
      description: `Recherche des archives pour "${searchTerm}".`,
    });
  };

  const handleViewReport = (patientName: string) => {
    toast({
      title: "Fonctionnalité à venir",
      description: `L'affichage du rapport pour ${patientName} sera bientôt disponible.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Archives de Radiographie</h1>
        <p className="text-muted-foreground">
          Recherchez et consultez les examens d'imagerie passés.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Rechercher dans les archives</CardTitle>
          <CardDescription>
            Utilisez le nom du patient, son ID ou le type d'examen pour rechercher.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input 
              type="text" 
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="button" onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" />
              Rechercher
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Résultats de la recherche</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Type d'examen</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {archiveData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.patientName}</TableCell>
                  <TableCell>{item.examType}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => handleViewReport(item.patientName)}>
                      <FileText className="mr-2 h-4 w-4" />
                      Voir le rapport
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
