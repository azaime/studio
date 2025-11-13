
"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"
import type { Patient } from "@/lib/types"

interface RegisterPatientDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onPatientSaved: (patientData: Omit<Patient, 'id' | 'lastVisit'> & { id?: string }) => void;
    patient?: Patient | null;
}

export function RegisterPatientDialog({ open, onOpenChange, onPatientSaved, patient }: RegisterPatientDialogProps) {
    const { toast } = useToast()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState<number | ''>('');
    const [gender, setGender] = useState<'Homme' | 'Femme' | 'Autre'>('Autre');
    const [address, setAddress] = useState('');

    const isEditing = !!patient;

    useEffect(() => {
        if (patient && open) {
            setName(patient.name);
            setEmail(patient.email);
            setPhone(patient.phone);
            setAge(patient.age);
            setGender(patient.gender);
            setAddress(patient.address);
        } else if (!open) {
            // Reset form when dialog is closed
            setName('');
            setEmail('');
            setPhone('');
            setAge('');
            setGender('Autre');
            setAddress('');
        }
    }, [patient, open]);


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (!name || !email || !phone || age === '' || !gender || !address) {
            toast({
                title: "Formulaire incomplet",
                description: "Veuillez remplir tous les champs.",
                variant: "destructive",
            });
            return;
        }
        
        const patientData: Omit<Patient, 'id' | 'lastVisit'> & { id?: string } = {
            id: patient?.id,
            name,
            email,
            phone,
            age: Number(age),
            gender,
            address
        };

        onPatientSaved(patientData);
        
        toast({
            title: isEditing ? "Patient mis à jour" : "Patient enregistré",
            description: `${name} a été ${isEditing ? 'mis à jour' : 'enregistré'} avec succès.`,
        });
        onOpenChange(false);
    }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Modifier le dossier patient' : 'Enregistrer un nouveau patient'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Modifiez les informations du patient ci-dessous.' : 'Remplissez les détails ci-dessous pour ajouter un nouveau patient au système.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nom complet
            </Label>
            <Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" required/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Téléphone
            </Label>
            <Input id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="col-span-3" required />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="age" className="text-right">
              Âge
            </Label>
            <Input id="age" name="age" type="number" value={age} onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))} className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Adresse
            </Label>
            <Input id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} className="col-span-3" required />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Genre
            </Label>
            <RadioGroup name="gender" value={gender} onValueChange={(value) => setGender(value as 'Homme' | 'Femme' | 'Autre')} className="col-span-3 flex gap-4">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Homme" id="male" />
                    <Label htmlFor="male">Homme</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Femme" id="female" />
                    <Label htmlFor="female">Femme</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Autre" id="other" />
                    <Label htmlFor="other">Autre</Label>
                </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">{isEditing ? 'Enregistrer les modifications' : 'Enregistrer le patient'}</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
