"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, LineChart, PieChart } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tableau de bord analytique</h1>
        <p className="text-muted-foreground">
          Visualisation des données et des indicateurs clés de performance de l'hôpital.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Taux d'occupation des lits</CardTitle>
            <CardDescription>Analyse sur les 30 derniers jours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-48 bg-secondary/50 rounded-md">
                <BarChart className="w-16 h-16 text-muted-foreground" />
            </div>
            <p className="text-center mt-2 text-sm text-muted-foreground">Graphique à venir</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Temps d'attente moyen</CardTitle>
            <CardDescription>Par département</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-48 bg-secondary/50 rounded-md">
                <LineChart className="w-16 h-16 text-muted-foreground" />
            </div>
             <p className="text-center mt-2 text-sm text-muted-foreground">Graphique à venir</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Répartition des patients</CardTitle>
            <CardDescription>Par type de consultation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-48 bg-secondary/50 rounded-md">
                <PieChart className="w-16 h-16 text-muted-foreground" />
            </div>
             <p className="text-center mt-2 text-sm text-muted-foreground">Graphique à venir</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
