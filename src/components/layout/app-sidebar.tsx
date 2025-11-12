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
} from "lucide-react"
import { Button } from "../ui/button"

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/patients", icon: Users, label: "Patients" },
  { href: "/appointments", icon: Calendar, label: "Appointments" },
  { href: "/emergency", icon: Siren, label: "Emergency" },
  { href: "/lab", icon: FlaskConical, label: "Lab" },
  { href: "/pharmacy", icon: Pill, label: "Pharmacy" },
  { href: "/users", icon: UserPlus, label: "Users" },
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
                <SidebarMenuButton tooltip="Settings">
                    <Settings />
                    <span>Settings</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Button asChild variant="ghost" className="w-full justify-start">
                    <Link href="/login">
                        <LogOut className="mr-2" />
                        <span>Logout</span>
                    </Link>
                </Button>
            </SidebarMenuItem>
         </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
