import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Code, 
  User, 
  MessageCircle,
  Settings,
  History,
  CreditCard
} from "lucide-react";
import type { SidebarItem } from './Sidebar';

export function getAdminSidebarItems(): SidebarItem[] {
  return [
    { id: 'tableau', label: 'Tableau de bord', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { id: 'utilisateurs', label: 'Gestion utilisateurs', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'admin', label: 'Gestion d\'administrateurs', icon: <User className="w-3.5 h-3.5" /> },
    { id: 'documents', label: 'Gestion documents', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'api', label: 'Gestion d\'API', icon: <Code className="w-3.5 h-3.5" /> },
    { id: 'audit', label: 'Piste d\'audits', icon: <History className="w-3.5 h-3.5" /> },
    { id: 'transactions', label: 'Transactions', icon: <CreditCard className="w-3.5 h-3.5" /> },
    { id: 'packs', label: 'Packs quotas', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'parametres', label: 'Paramètres', icon: <Settings className="w-3.5 h-3.5" /> },
    { id: 'profil', label: 'Profil', icon: <User className="w-3.5 h-3.5" /> },
    { id: 'support', label: 'Support', icon: <MessageCircle className="w-3.5 h-3.5" /> },
  ];
}

export function getUserSidebarItems(): SidebarItem[] {
  return [
    { id: 'tableau', label: 'Tableau de bord', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'documents', label: 'Gestion documents', icon: <FileText className="w-4 h-4" /> },
    { id: 'historique', label: 'Historique', icon: <History className="w-4 h-4" /> },
    { id: 'achats', label: 'Achat de quota', icon: <Code className="w-4 h-4" /> },
    { id: 'transactions', label: 'Transactions', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'apis', label: 'Gestion d\'API', icon: <Code className="w-4 h-4" /> },
    { id: 'profil', label: 'Profil', icon: <User className="w-4 h-4" /> },
    { id: 'parametres', label: 'Paramètres', icon: <Settings className="w-4 h-4" /> },
    { id: 'assistance', label: 'Assistance', icon: <MessageCircle className="w-4 h-4" /> },
  ];
}


