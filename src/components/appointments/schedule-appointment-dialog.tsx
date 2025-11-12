
"use client";

import { useState, useTransition } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { Patient, Appointment } from '@/lib/types';
import { fetchAppointmentSuggestions } from '@/lib/actions';
import { Calendar as CalendarIcon, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

type Doctor = { id: string; name: string };

interface ScheduleAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patients: Patient[];
  doctors: Doctor[];
  onAppointmentScheduled: (newAppointment: Omit<Appointment, 'id' | 'status'>) => void;
}

export function ScheduleAppointmentDialog({ open, onOpenChange, patients, doctors, onAppointmentScheduled }: ScheduleAppointmentDialogProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleGetSuggestions = () => {
    if (!patientId || !doctorId || !appointmentType || !date) {
      setError("Veuillez remplir tous les champs avant d'obtenir des suggestions.");
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await fetchAppointmentSuggestions({
        patientId,
        doctorId,
        appointmentType,
        requestedDate: format(date, 'yyyy-MM-dd'),
      });

      if (result.error && !result.data) {
        setError(result.error);
        setSuggestions([]);
      } else {
        if (result.error) {
            toast({
                title: 'Avis de suggestion IA',
                description: result.error,
                variant: 'default',
            })
        }
        setSuggestions(result.data || []);
      }
    });
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!patientId || !doctorId || !appointmentType || !date || !selectedTime) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs et sélectionner une heure.",
        variant: "destructive",
      });
      return;
    }

    const patient = patients.find(p => p.id === patientId);
    const doctor = doctors.find(d => d.id === doctorId);

    if (!patient || !doctor) {
        toast({ title: "Erreur", description: "Patient ou docteur introuvable.", variant: "destructive" });
        return;
    }

    onAppointmentScheduled({
        patientName: patient.name,
        patientId,
        doctorName: doctor.name,
        service: appointmentType,
        date: format(date, 'yyyy-MM-dd'),
        time: selectedTime,
    });

    toast({
      title: "Rendez-vous programmé",
      description: `Le rendez-vous pour ${patient.name} a été programmé le ${format(date, 'PPP', { locale: fr })} à ${selectedTime}.`,
    });
    onOpenChange(false);
    
    // Reset state
    setSuggestions([]);
    setPatientId('');
    setDoctorId('');
    setAppointmentType('');
    setSelectedTime('');
    setDate(new Date());
    setError(null);
  };

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
        // Reset state when closing
        setSuggestions([]);
        setPatientId('');
        setDoctorId('');
        setAppointmentType('');
        setSelectedTime('');
        setDate(new Date());
        setError(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Planifier un nouveau rendez-vous</DialogTitle>
            <DialogDescription>
              Utilisez l'assistant IA pour trouver les meilleurs créneaux horaires.
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
              <Label htmlFor="doctor">Docteur</Label>
              <Select onValueChange={setDoctorId} value={doctorId}>
                <SelectTrigger><SelectValue placeholder="Sélectionnez un docteur" /></SelectTrigger>
                <SelectContent>
                  {doctors.map(d => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type de rendez-vous</Label>
              <Input id="type" placeholder="ex: Consultation, Suivi" value={appointmentType} onChange={(e) => setAppointmentType(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: fr }) : <span>Choisissez une date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={fr} /></PopoverContent>
              </Popover>
            </div>

            <Button type="button" onClick={handleGetSuggestions} disabled={isPending}>
              <Sparkles className="mr-2 h-4 w-4" />
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Obtenir des suggestions IA
            </Button>
            
            {error && <p className="text-sm text-destructive">{error}</p>}

            {isPending && <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Pensée...</div>}

            {suggestions.length > 0 && !isPending && (
              <div className="space-y-2 rounded-lg border p-4 bg-secondary/50">
                <Label>Horaires suggérés</Label>
                <RadioGroup onValueChange={setSelectedTime} value={selectedTime}>
                  <div className="flex flex-wrap gap-4">
                    {suggestions.map((time) => (
                      <div key={time} className="flex items-center">
                        <RadioGroupItem value={time} id={time} />
                        <Label htmlFor={time} className="ml-2 cursor-pointer">{time}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!selectedTime}>Planifier le rendez-vous</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
