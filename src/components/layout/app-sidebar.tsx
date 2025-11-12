"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Logo } from "@/components/logo"
import {
  Users,
  Calendar,
  Siren,
  FlaskConical,
  Pill,
  LayoutDashboard,
  UserPlus,
  LogOut,
  Settings,
  Baby,
  HeartHandshake,
  Ear,
  Eye,
  Scissors,
  Scan,
  Radio,
} from "lucide-react"
import { Button } from "../ui/button"

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Tableau de bord" },
  { href: "/patients", icon: Users, label: "Patients" },
  { href: "/appointments", icon: Calendar, label: "Rendez-vous" },
  { href: "/emergency", icon: Siren, label: "Urgences" },
  { href: "/lab", icon: FlaskConical, label: "Labo" },
  { href: "/pharmacy", icon: Pill, label: "Pharmacie" },
  { href: "/maternity", icon: HeartHandshake, label: "Maternité" },
  { href: "/pediatrics", icon: Baby, label: "Pédiatrie" },
  { href: "/ent", icon: Ear, label: "ORL" },
  { href: "/ophthalmology", icon: Eye, label: "Ophtalmologie" },
  { href: "/surgery", icon: Scissors, label: "Chirurgie" },
  { href: "/radiography", icon: Scan, label: "Radiographie" },
  { href: "/ultrasound", icon: Radio, label: "Échographie" },
  { href: "/users", icon: UserPlus, label: "Utilisateurs" },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
         <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip="Paramètres">
                    <Settings />
                    <span>Paramètres</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Button asChild variant="ghost" className="w-full justify-start">
                    <Link href="/login">
                        <LogOut className="mr-2" />
                        <span>Déconnexion</span>
                    </Link>
                </Button>
            </SidebarMenuItem>
         </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
