import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Code, 
  User, 
  LogOut,
  X,
  MessageCircle,
  Settings,
  History
} from "lucide-react";

export type SidebarItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
  items?: SidebarItem[];
  title?: string;
}

export default function Sidebar({ 
  isOpen, 
  onClose, 
  activeSection, 
  onSectionChange, 
  onLogout,
  items = [],
  title = "Portail OCR"
}: SidebarProps) {
  const defaultItems: SidebarItem[] = [
    { id: 'tableau', label: 'Tableau de bord', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { id: 'utilisateurs', label: 'Gestion utilisateurs', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'admin', label: 'Gestion d\'administrateurs', icon: <User className="w-3.5 h-3.5" /> },
    { id: 'documents', label: 'Gestion documents', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'api', label: 'Gestion d\'API', icon: <Code className="w-3.5 h-3.5" /> },
    { id: 'audit', label: 'Audit', icon: <History className="w-3.5 h-3.5" /> },
    { id: 'parametres', label: 'Paramètres', icon: <Settings className="w-3.5 h-3.5" /> },
    { id: 'profil', label: 'Profil', icon: <User className="w-3.5 h-3.5" /> },
    { id: 'support', label: 'Support', icon: <MessageCircle className="w-3.5 h-3.5" /> },
  ];

  const sidebarItems = items.length > 0 ? items : defaultItems;

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-white/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <img src="/assets/portail-ocr.png" alt="Logo Portail OCR" className="w-8 h-8 rounded-lg object-cover border border-gray-200" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {title}
              </h1>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2.5 py-4 space-y-0.5 overflow-y-auto">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  onClose();
                }}
                className={`w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-lg text-left transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-r-2 border-blue-500 shadow'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-900 hover:shadow-sm'
                }`}
              >
                <div className={`p-1.5 rounded-md ${
                  activeSection === item.id ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  {item.icon}
                </div>
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-2.5 border-t border-gray-100 bg-white/80 backdrop-blur-sm">
            <button
              onClick={onLogout}
              className="w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-lg text-left text-red-600 hover:bg-red-50 transition-all duration-200 hover:shadow-sm"
            >
              <div className="p-1 rounded-md bg-red-100">
                <LogOut className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium text-sm">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 