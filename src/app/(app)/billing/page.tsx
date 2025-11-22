"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { invoices as initialInvoices } from "@/lib/data";
import type { Invoice } from "@/lib/types";

const getStatusBadgeVariant = (status: Invoice['status']) => {
  switch (status) {
    case 'Payée': return 'secondary';
    case 'En attente': return 'outline';
    case 'En retard': return 'destructive';
    default: return 'default';
  }
};

export default function BillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const { toast } = useToast();

  const handleUpdateStatus = (invoiceId: string, status: Invoice['status']) => {
    setInvoices(prev => prev.map(inv => inv.id === invoiceId ? { ...inv, status } : inv));
    toast({
      title: "Statut de la facture mis à jour",
      description: `La facture ${invoiceId} est maintenant marquée comme "${status}".`,
    });
  };

  const handleViewDetails = (invoice: Invoice) => {
    toast({
      title: `Détails de la facture ${invoice.id}`,
      description: `Patient: ${invoice.patientName}, Montant: ${invoice.amount} XOF, Statut: ${invoice.status}`,
    });
  };
  
  const handleDownload = (invoice: Invoice) => {
    toast({
      title: "Téléchargement en cours...",
      description: `La facture ${invoice.id} pour ${invoice.patientName} va être téléchargée.`,
    });
    // Placeholder for download logic
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Facturation</h1>
                <p className="text-muted-foreground">Gérez les factures et les paiements des patients.</p>
            </div>
            <Button onClick={() => toast({ title: "Fonctionnalité à venir" })}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Créer une facture
            </Button>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Toutes les factures</CardTitle>
          <CardDescription>
            Liste de toutes les factures des patients.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Facture</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Montant (XOF)</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.patientName}</TableCell>
                  <TableCell>{invoice.amount.toLocaleString('fr-FR')}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(invoice.status)}>{invoice.status}</Badge>
                  </TableCell>
                  <TableCell>
                  <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Menu</span>
                      </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewDetails(invoice)}>Voir les détails</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownload(invoice)}>Télécharger en PDF</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(invoice.id, 'Payée')}>Marquer comme payée</DropdownMenuItem>
                      </DropdownMenuContent>
                  </DropdownMenu>
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
