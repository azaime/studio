
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { toast } = useToast();
  const [hospitalName, setHospitalName] = useState("HOPITALE PROVINCIALE DE MONGO");
  const [adminEmail, setAdminEmail] = useState("admin@mongo.health");

  const handleSaveSettings = () => {
    // In a real application, you would save these settings to a database or config file.
    console.log({ hospitalName, adminEmail });
    toast({
      title: "Paramètres enregistrés",
      description: "Les paramètres du système ont été mis à jour avec succès.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Paramètres du système</h1>
        <p className="text-muted-foreground">
          Gérez les configurations générales de votre application hospitalière.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Paramètres généraux</CardTitle>
          <CardDescription>
            Configurez les informations de base de l'hôpital.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hospital-name">Nom de l'hôpital</Label>
            <Input 
              id="hospital-name" 
              value={hospitalName} 
              onChange={(e) => setHospitalName(e.target.value)} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-email">Email de l'administrateur</Label>
            <Input 
              id="admin-email" 
              type="email" 
              value={adminEmail} 
              onChange={(e) => setAdminEmail(e.target.value)} 
            />
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>Enregistrer les modifications</Button>
      </div>
    </div>
  );
}
