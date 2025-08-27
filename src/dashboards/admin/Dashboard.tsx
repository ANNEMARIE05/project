import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { getAdminSidebarItems } from '../../components/SidebarItems';
import Utilisateurs from './pagesAdmin/Utilisateurs';
import Documents from './pagesAdmin/Documents';
import Api from './pagesAdmin/Api';
import Profile from './pagesAdmin/Profile';
import Support from './pagesAdmin/Support';
import Parametres from './pagesAdmin/Parametres';
import Historique from './pagesAdmin/Historique';
import Tableau from './pagesAdmin/Dashboard';
import Admin from './pagesAdmin/Admin';
import Transactions from './pagesAdmin/Transactions';
import Packs from './pagesAdmin/Packs';


interface TableauAdminProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: TableauAdminProps) {
  const [sectionActive, setSectionActive] = useState('tableau');
  const [confirmerDeconnexion, setConfirmerDeconnexion] = useState(false);

  useEffect(() => {
    const chemin = window.location.pathname || '';
    const segments = chemin.split('/').filter(Boolean);
    // attendu: ['', 'admin', '<onglet>'] → segments: ['admin', '<onglet>']
    if (segments[0] === 'admin' && segments[1]) {
      setSectionActive(segments[1]);
    }
  }, []);

  const afficherContenu = () => {
    switch (sectionActive) {
      case 'tableau':
        return (
          <Tableau />
        );

      case 'utilisateurs':
        return (
          <Utilisateurs />
        );

        case 'admin':
          return (
            <Admin />
          );

      case 'documents':
        return (
          <Documents />
        );

      case 'api':
        return (
          <Api />
        );

      case 'audit':
        return (
          <Historique />
        );

      case 'transactions':
        return (
          <Transactions />
        );

      case 'packs':
        return (
          <Packs />
        );

      case 'parametres':
        return (
          <Parametres />
        );   

        case 'profil':
          return (
            <Profile />
          );

        case 'support':
        return (
          <Support />
        );

      default:
        return null;
    }
  };

  const obtenirTitreEnTete = () => {
    const titres: { [key: string]: string } = {
      'tableau': 'Tableau de bord',
      'utilisateurs': 'Gestion utilisateurs',
      'admin': 'Gestion d\'administrateurs',
      'documents': 'Gestion documents',
      'api': 'Gestion d\'API',
      'audit': 'Piste d\'audits',
      'transactions': 'Transactions',
      'packs': 'Packs quotas',
      'profil': 'Profil',
      'support': 'Support',
      'parametres': 'Paramètres'
    };
    return titres[sectionActive] || 'Dashboard';
  };

  return (
    <Layout
      activeSection={sectionActive}
      onSectionChange={(s) => {
        setSectionActive(s);
        const url = `/admin/${encodeURIComponent(s)}`;
        window.history.replaceState(null, '', url);
      }}
      onLogout={() => setConfirmerDeconnexion(true)}
      title="Portail OCR"
      headerTitle={obtenirTitreEnTete()}
      user={{ name: "Administrateur" }}
      sidebarItems={getAdminSidebarItems()}
    >
      {afficherContenu()}

      {confirmerDeconnexion && (
        <div className="fixed inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirmation de déconnexion</h3>
            <p className="text-gray-600 mb-6">Êtes-vous sûr de vouloir vous déconnecter ?</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setConfirmerDeconnexion(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={onLogout}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}