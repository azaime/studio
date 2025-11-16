
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar, Mic, Video, PlusCircle, Square, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ScheduleAppointmentDialog } from "@/components/appointments/schedule-appointment-dialog";
import { patients, doctors } from "@/lib/data";
import type { Appointment } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export default function ENTPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isScheduling, setIsScheduling] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Camera state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  // Audio state
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Erreur d'accès à la caméra:", error);
        setHasCameraPermission(false);
        toast({
          variant: "destructive",
          title: "Accès à la caméra refusé",
          description: "Veuillez activer les autorisations de la caméra dans les paramètres de votre navigateur.",
        });
      }
    };

    getCameraPermission();
  }, [toast]);
  
  const handleStartRecording = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setAudioURL(null); // Clear previous recording
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.addEventListener("dataavailable", event => {
            audioChunksRef.current.push(event.data);
        });

        mediaRecorderRef.current.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioURL(audioUrl);
            // Stop all media tracks to turn off mic indicator
            stream.getTracks().forEach(track => track.stop());
        });

        mediaRecorderRef.current.start();
        setIsRecording(true);
        toast({
            title: "Enregistrement démarré",
            description: "L'audiogramme est en cours d'enregistrement.",
        });
    } catch (err) {
        toast({
            variant: "destructive",
            title: "Accès au microphone refusé",
            description: "Veuillez autoriser l'accès au microphone pour enregistrer.",
        });
    }
  };
  
  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        toast({
            title: "Enregistrement arrêté",
            description: "L'audiogramme a été sauvegardé.",
        });
    }
  };


  const handleAppointmentScheduled = (newAppointment: Omit<Appointment, 'id' | 'status'>) => {
    const appointmentData: Appointment = {
      ...newAppointment,
      id: `APP-ENT-${Date.now()}`,
      service: 'ORL',
      status: 'Programmé'
    };
    setAppointments(prev => [...prev, appointmentData]);
    toast({
      title: 'Rendez-vous planifié',
      description: `Le rendez-vous ORL pour ${newAppointment.patientName} a été créé.`,
    });
  };

  return (
    <>
      <div className="space-y-6">
          <div className="flex justify-between items-center">
              <div>
                  <h1 className="text-2xl font-bold tracking-tight">Service d'Oto-rhino-laryngologie (ORL)</h1>
                  <p className="text-muted-foreground">
                      Gestion des consultations, audiogrammes et endoscopies.
                  </p>
              </div>
              <Button onClick={() => setIsScheduling(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Ajouter une consultation
              </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
               <Card>
                <CardHeader>
                  <CardTitle>Consultations ORL</CardTitle>
                  <CardDescription>Planifier et gérer les rendez-vous ORL.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={() => router.push('/appointments')}>
                      <Calendar className="mr-2 h-4 w-4" />
                      Voir l'agenda
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Tests auditifs</CardTitle>
                  <CardDescription>Enregistrer et consulter les audiogrammes.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {isRecording ? (
                     <Button variant="destructive" className="w-full" onClick={handleStopRecording}>
                        <Square className="mr-2 h-4 w-4" />
                        Arrêter l'enregistrement
                    </Button>
                  ) : (
                    <Button variant="secondary" className="w-full" onClick={handleStartRecording}>
                        <Mic className="mr-2 h-4 w-4" />
                        Nouvel audiogramme
                    </Button>
                  )}
                  {audioURL && (
                    <div className="space-y-2">
                        <Label>Dernier enregistrement :</Label>
                        <audio src={audioURL} controls className="w-full" />
                    </div>
                  )}
                </CardContent>
              </Card>
               <Card>
                <CardHeader>
                    <CardTitle>Vue Endoscopique</CardTitle>
                    <CardDescription>Aperçu en direct de la caméra.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center">
                        <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                        {!hasCameraPermission && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 p-4">
                                 <Alert variant="destructive" className="max-w-sm">
                                    <Video className="h-4 w-4" />
                                    <AlertTitle>Accès Caméra Requis</AlertTitle>
                                    <AlertDescription>
                                        Veuillez autoriser l'accès à la caméra pour utiliser cette fonctionnalité.
                                    </AlertDescription>
                                </Alert>
                            </div>
                        )}
                         <div className="absolute top-2 right-2 flex items-center gap-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                            <Circle className={cn("h-3 w-3", hasCameraPermission && isRecording ? "fill-red-500" : "fill-gray-400")} />
                            <span>EN DIRECT</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
          </div>
      </div>
      <ScheduleAppointmentDialog
        open={isScheduling}
        onOpenChange={setIsScheduling}
        patients={patients}
        doctors={doctors}
        onAppointmentScheduled={handleAppointmentScheduled}
      />
    </>
  );
}
