
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { Patient } from "@/lib/types";

interface AddReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patients: Patient[];
}

export function AddReportDialog({ open, onOpenChange, patients }: AddReportDialogProps) {
  const { toast } = useToast();
  const [patientId, setPatientId] = useState('');
  const [reportContent, setReportContent] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!patientId || !reportContent) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez sélectionner un patient et rédiger un rapport.",
        variant: "destructive",
      });
      return;
    }

    // Logic to save the report would go here
    console.log({ patientId, reportContent });

    toast({
      title: "Rapport enregistré",
      description: `Le rapport pour le patient sélectionné a été enregistré.`,
    });
    
    // Reset state and close dialog
    setPatientId('');
    setReportContent('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Ajouter un rapport de consultation</DialogTitle>
            <DialogDescription>
              Sélectionnez le patient et rédigez le rapport ci-dessous.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="patient">Patient</Label>
              <Select onValueChange={setPatientId} value={patientId}>
                <SelectTrigger><SelectValue placeholder="Sélectionnez un patient" /></SelectTrigger>
                <SelectContent>
                  {patients.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="report-content">Rapport de consultation</Label>
              <Textarea
                id="report-content"
                placeholder="Rédigez les notes de la consultation ici..."
                value={reportContent}
                onChange={(e) => setReportContent(e.target.value)}
                rows={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
            <Button type="submit">Enregistrer le rapport</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
