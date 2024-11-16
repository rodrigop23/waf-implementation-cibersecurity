"use client";

import * as React from "react";
import { BookOpen, Bot, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import LogoutButton from "./logout-button";

// This is sample data.
const data = {
  navMain: [
    {
      title: "SQL Injection",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Inicio de Sesión",
          url: "sign-in",
        },
        {
          title: "Registro",
          url: "sign-up",
        },
      ],
    },
    {
      title: "XSS",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Comentarios",
          url: "comments",
        },
        {
          title: "2",
          url: "#",
        },
      ],
    },
    {
      title: "Fuerza Bruta",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Login Simple",
          url: "sign-in",
        },
        {
          title: "Login con Validación",
          url: "validated-sign-in",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <LogoutButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
