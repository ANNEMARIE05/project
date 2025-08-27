import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Historique() {
      const [elementsParPage, setElementsParPage] = useState<number>(10);
      const [periodeFiltre, setPeriodeFiltre] = useState<string>('7j');
      const [pageActuelle, setPageActuelle] = useState<number>(1);

      // Données d'exemple avec plus d'éléments
      const donneesAudit = [
        {
          id: 1,
          date: '15/12/2024',
          heure: '14:32',
          action: 'Création d\'un nouvel utilisateur',
          details: 'Nouvel utilisateur créé: Jean Dupont (jean.dupont@example.com)',
          statut: 'Réussi',
          categorie: 'Gestion utilisateurs'
        },
        {
          id: 2,
          date: '14/12/2024',
          heure: '16:45',
          action: 'Attribution de 50 documents',
          details: 'Attribution de 50 documents à l\'utilisateur Marie Martin (marie.martin@example.com)',
          statut: 'Réussi',
          categorie: 'Gestion des allocations clients'
        },
        {
          id: 3,
          date: '13/12/2024',
          heure: '11:20',
          action: 'Modification du profil',
          details: 'Mise à jour des informations de contact et des préférences de notification',
          statut: 'Réussi',
          categorie: 'Profil administrateur'
        },
        {
          id: 4,
          date: '12/12/2024',
          heure: '09:15',
          action: 'Dernière connexion',
          details: 'Connexion réussie depuis l\'adresse IP 192.168.1.100',
          statut: 'Réussi',
          categorie: 'Système'
        },
        {
          id: 5,
          date: '11/12/2024',
          heure: '15:30',
          action: 'Suppression d\'utilisateur',
          details: 'Suppression de l\'utilisateur Pierre Durand (pierre.durand@example.com)',
          statut: 'Réussi',
          categorie: 'Gestion utilisateurs'
        },
        {
          id: 6,
          date: '10/12/2024',
          heure: '13:45',
          action: 'Export de données',
          details: 'Export de 1500 enregistrements au format CSV',
          statut: 'Réussi',
          categorie: 'Rapports'
        },
        {
          id: 7,
          date: '09/12/2024',
          heure: '10:20',
          action: 'Modification des permissions',
          details: 'Mise à jour des permissions pour le groupe "Éditeurs"',
          statut: 'Réussi',
          categorie: 'Sécurité'
        },
        {
          id: 8,
          date: '08/12/2024',
          heure: '17:10',
          action: 'Sauvegarde automatique',
          details: 'Sauvegarde complète de la base de données effectuée',
          statut: 'Réussi',
          categorie: 'Système'
        },
        {
          id: 9,
          date: '07/12/2024',
          heure: '14:05',
          action: 'Création de rapport',
          details: 'Génération du rapport mensuel des activités',
          statut: 'Réussi',
          categorie: 'Rapports'
        },
        {
          id: 10,
          date: '06/12/2024',
          heure: '11:30',
          action: 'Mise à jour système',
          details: 'Installation de la mise à jour de sécurité v2.1.4',
          statut: 'Réussi',
          categorie: 'Système'
        },
        {
          id: 11,
          date: '05/12/2024',
          heure: '16:20',
          action: 'Import de données',
          details: 'Import de 200 nouveaux utilisateurs depuis un fichier Excel',
          statut: 'Réussi',
          categorie: 'Gestion utilisateurs'
        },
        {
          id: 12,
          date: '04/12/2024',
          heure: '09:45',
          action: 'Configuration des notifications',
          details: 'Mise à jour des paramètres de notification pour tous les utilisateurs',
          statut: 'Réussi',
          categorie: 'Configuration'
        }
      ];

      const changerElementsParPage = (value: number) => {
        setElementsParPage(value);
        setPageActuelle(1); // Retour à la première page
      };

      const handlePeriodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPeriodeFiltre(e.target.value);
        setPageActuelle(1); // Retour à la première page
      };

      const handleElementsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        changerElementsParPage(parseInt(e.target.value));
      };

      // Calculs de pagination
      const totalElements = donneesAudit.length;
      const totalPages = Math.ceil(totalElements / elementsParPage);
      const debutIndex = (pageActuelle - 1) * elementsParPage;
      const finIndex = debutIndex + elementsParPage;
      const donneesPageActuelle = donneesAudit.slice(debutIndex, finIndex);

      const allerPagePrecedente = () => {
        setPageActuelle(prev => Math.max(prev - 1, 1));
      };

      const allerPageSuivante = () => {
        setPageActuelle(prev => Math.min(prev + 1, totalPages));
      };

      const allerPage = (page: number) => {
        setPageActuelle(page);
      };

      // Générer les numéros de page à afficher
      const genererNumerosPage = () => {
        const pages = [];
        const maxPagesAffichees = 5;
        
        if (totalPages <= maxPagesAffichees) {
          for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          if (pageActuelle <= 3) {
            for (let i = 1; i <= 4; i++) {
              pages.push(i);
            }
            pages.push('...');
            pages.push(totalPages);
          } else if (pageActuelle >= totalPages - 2) {
            pages.push(1);
            pages.push('...');
            for (let i = totalPages - 3; i <= totalPages; i++) {
              pages.push(i);
            }
          } else {
            pages.push(1);
            pages.push('...');
            for (let i = pageActuelle - 1; i <= pageActuelle + 1; i++) {
              pages.push(i);
            }
            pages.push('...');
            pages.push(totalPages);
          }
        }
        
        return pages;
      };

      return (
          <div className="space-y-1 sm:space-y-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-1">Audit des actions</h2>
            <p className="text-xs text-gray-600">Toutes les actions effectuées par l'administrateur</p>
          </div>

          {/* Filtres */}
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between">
              {/* Filtre de période */}
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600 whitespace-nowrap">Période :</label>
                <select
                  value={periodeFiltre}
                  onChange={handlePeriodeChange}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="7j">7 derniers jours</option>
                  <option value="30j">30 derniers jours</option>
                  <option value="90j">90 derniers jours</option>
                  <option value="1a">1 an</option>
                  <option value="tout">Tout</option>
                </select>
              </div>

              {/* Sélecteur d'éléments par page */}
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600 whitespace-nowrap">Afficher :</label>
                <select
                  value={elementsParPage}
                  onChange={handleElementsChange}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-sm text-gray-600">éléments</span>
              </div>
            </div>
          </div>

            {/* Tableau d'audit */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Version desktop - Tableau */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date & Heure
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Action
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Détails
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Statut
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {donneesPageActuelle.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                          <div>
                            <div className="font-medium">{item.date}</div>
                            <div className="text-gray-500">{item.heure}</div>
                          </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-900">
                          {item.action}
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-900">
                          {item.details}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {item.statut}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Version mobile - Cards */}
              <div className="sm:hidden space-y-2 p-2">
                {donneesPageActuelle.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium text-sm text-gray-900">{item.date}</div>
                        <div className="text-xs text-gray-500">{item.heure}</div>
                      </div>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {item.statut}
                      </span>
                    </div>
                    <div className="mb-2">
                      <div className="font-medium text-sm text-gray-900">{item.action}</div>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                        {item.categorie}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">
                      {item.details}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Pagination */}
            <div className="bg-gray-50 px-2 sm:px-3 py-2 flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button 
                    onClick={allerPagePrecedente}
                    disabled={pageActuelle === 1}
                    className="relative inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Précédent
                  </button>
                  <button 
                    onClick={allerPageSuivante}
                    disabled={pageActuelle === totalPages}
                    className="ml-2 relative inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Suivant
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs text-gray-700">
                      Affichage de <span className="font-semibold">{debutIndex + 1}</span> à <span className="font-semibold">{Math.min(finIndex, totalElements)}</span> sur <span className="font-semibold">{totalElements}</span> résultats
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px" aria-label="Pagination">
                      <button 
                        onClick={allerPagePrecedente}
                        disabled={pageActuelle === 1}
                        className="relative inline-flex items-center px-2 py-1 rounded-l-lg border border-gray-300 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Précédent</span>
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      
                      {genererNumerosPage().map((page, index) => (
                        <button
                          key={index}
                          onClick={() => typeof page === 'number' ? allerPage(page) : null}
                          disabled={typeof page !== 'number'}
                          className={`relative inline-flex items-center px-2.5 py-1 border text-xs font-medium transition-colors ${
                            page === pageActuelle
                              ? 'border-gray-300 bg-blue-50 text-blue-600'
                              : typeof page === 'number'
                              ? 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                              : 'border-gray-300 bg-white text-gray-400 cursor-default'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button 
                        onClick={allerPageSuivante}
                        disabled={pageActuelle === totalPages}
                        className="relative inline-flex items-center px-2 py-1 rounded-r-lg border border-gray-300 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Suivant</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
          </div>
        );
  }