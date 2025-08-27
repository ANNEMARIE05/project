import { useState } from 'react';
import Sidebar from './Sidebar';
import type { SidebarItem } from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
  sidebarItems?: SidebarItem[];
  title?: string;
  headerTitle?: string;
  user?: {
    name: string;
    avatar?: string;
  };
}

export default function Layout({ 
  children, 
  activeSection, 
  onSectionChange, 
  onLogout,
  sidebarItems = [],
  title = "Portail OCR",
  headerTitle,
  user = { name: "Administrateur" }
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleSectionChange = (section: string) => {
    onSectionChange(section);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={handleSidebarClose}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        onLogout={onLogout}
        items={sidebarItems}
        title={title}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-64">
        {/* Header */}
        <Header
          onMenuClick={handleMenuClick}
          title={headerTitle || activeSection}
          user={user}
        />

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 