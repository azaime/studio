
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
import { type Dispatch, type SetStateAction } from "react"
import type { Patient } from "@/lib/types"

interface RegisterPatientDialogProps {
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
    onPatientRegistered: (newPatient: Omit<Patient, 'id' | 'lastVisit'>) => void;
}

export function RegisterPatientDialog({ open, onOpenChange, onPatientRegistered }: RegisterPatientDialogProps) {
    const { toast } = useToast()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const age = Number(formData.get('age'));
        const gender = formData.get('gender') as 'Homme' | 'Femme' | 'Autre';
        const address = formData.get('address') as string;
        
        const newPatient: Omit<Patient, 'id' | 'lastVisit'> = {
            name,
            email,
            phone,
            age,
            gender,
            address
        };

        onPatientRegistered(newPatient);
        
        toast({
            title: "Patient enregistré",
            description: `${name} a été enregistré avec succès.`,
        });
        onOpenChange(false);
        (event.target as HTMLFormElement).reset();
    }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Enregistrer un nouveau patient</DialogTitle>
          <DialogDescription>
            Remplissez les détails ci-dessous pour ajouter un nouveau patient au système.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nom complet
            </Label>
            <Input id="name" name="name" className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" name="email" type="email" className="col-span-3" required/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Téléphone
            </Label>
            <Input id="phone" name="phone" className="col-span-3" required />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="age" className="text-right">
              Âge
            </Label>
            <Input id="age" name="age" type="number" className="col-span-3" required />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Adresse
            </Label>
            <Input id="address" name="address" className="col-span-3" required />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Genre
            </Label>
            <RadioGroup name="gender" defaultValue="Autre" className="col-span-3 flex gap-4">
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
          <Button type="submit">Enregistrer le patient</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
