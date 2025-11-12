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

interface RegisterPatientDialogProps {
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export function RegisterPatientDialog({ open, onOpenChange }: RegisterPatientDialogProps) {
    const { toast } = useToast()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get('name');
        
        toast({
            title: "Patient enregistré",
            description: `${name} a été enregistré avec succès.`,
        });
        onOpenChange(false);
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
            <Label className="text-right">
              Genre
            </Label>
            <RadioGroup defaultValue="other" className="col-span-3 flex gap-4">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Homme</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Femme</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
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
