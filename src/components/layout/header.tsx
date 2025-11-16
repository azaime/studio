
"use client"

import Link from "next/link"
import {
  Search,
  User,
} from "lucide-react"
import { usePathname } from 'next/navigation'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const pageTitles: { [key: string]: string } = {
  dashboard: 'Tableau de bord',
  patients: 'Patients',
  appointments: 'Rendez-vous',
  emergency: 'Urgences',
  lab: 'Labo',
  pharmacy: 'Pharmacie',
  maternity: 'Maternité',
  pediatrics: 'Pédiatrie',
  ent: 'ORL',
  ophthalmology: 'Ophtalmologie',
  surgery: 'Chirurgie',
  radiography: 'Radiographie',
  ultrasound: 'Échographie',
  users: 'Utilisateurs',
  medicine: 'Médecine',
  personnel: 'Personnel',
  administration: 'Administration',
  analytics: 'Tableau de bord analytique',
  settings: 'Paramètres',
  profile: 'Profil',
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function Header() {
  const pathname = usePathname();
  const pageKey = pathname.split('/').pop() || 'dashboard';
  const title = pageTitles[pageKey] || capitalize(pageKey);

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6 sticky top-0 z-30">
        <div className="md:hidden">
            <SidebarTrigger />
        </div>
      <div className="w-full flex-1">
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher patients, docteurs..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage src="https://picsum.photos/seed/user/100/100" alt="@admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <span className="sr-only">Menu utilisateur</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Compte Admin</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href="/profile">Profil</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/administration/settings">Paramètres</Link></DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href="/login">Déconnexion</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
