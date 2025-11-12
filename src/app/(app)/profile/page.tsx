
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProfilePage() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@mongo.health");

  const handleSave = () => {
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées.",
    });
    setIsEditing(false);
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="https://picsum.photos/seed/user/200/200" alt="@admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            {isEditing ? (
                <Input className="text-3xl font-bold" value={name} onChange={(e) => setName(e.target.value)} />
            ) : (
                <CardTitle className="text-3xl">{name}</CardTitle>
            )}
             {isEditing ? (
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            ) : (
                <CardDescription>{email}</CardDescription>
            )}
          </div>
          {isEditing ? (
            <div className="flex gap-2 ml-auto">
                <Button variant="outline" onClick={() => setIsEditing(false)}>Annuler</Button>
                <Button onClick={handleSave}>Enregistrer</Button>
            </div>
          ) : (
            <Button variant="outline" className="ml-auto" onClick={() => setIsEditing(true)}>Modifier le profil</Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Rôle</h3>
            <p className="text-muted-foreground">Admin</p>
          </div>
          <div>
            <h3 className="font-semibold">Département</h3>
            <p className="text-muted-foreground">Administration</p>
          </div>
          <div>
            <h3 className="font-semibold">Dernière connexion</h3>
            <p className="text-muted-foreground">Il y a 2 heures</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
