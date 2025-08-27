import { useState } from 'react';
import { 
  User,
  Edit,
  Trash2,
  Eye,
  Plus,
  X,
  AlertTriangle,
  Save,
  Mail,
  Key,
  EyeOff,
  Copy,
  RefreshCw,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Utilisateur {
    id: string;
    nom: string;
    email: string;
    role: string;
    documentsConsommes: number;
    motDePasse: string;
    invitationEnvoyee?: boolean;
    dateInvitation?: Date;
    invitationEchouee?: boolean;
    limiteDocuments?: number;
    cleApi?: string;
    cleApiGenereeLe?: Date;
    cleApiExpireLe?: Date;
    cleApiUtiliseeLe?: Date;
    nombreUtilisationsCleApi?: number;
  }

export default function Admin() {
    const [utilisateurSelectionne, setUtilisateurSelectionne] = useState<Utilisateur | null>(null);
    const [afficherDetails, setAfficherDetails] = useState(false);
    const [afficherModifier, setAfficherModifier] = useState(false);
    const [afficherSupprimer, setAfficherSupprimer] = useState(false);
    const [afficherCreer, setAfficherCreer] = useState(false);
    const [utilisateurEnModification, setUtilisateurEnModification] = useState<Utilisateur | null>(null);
    const [nouvelUtilisateur, setNouvelUtilisateur] = useState<Omit<Utilisateur, 'id' | 'documentsConsommes'>>({
      nom: '',
      email: '',
      role: 'Utilisateur',
      motDePasse: '',
      limiteDocuments: 100
    });
    const [afficherInvitation, setAfficherInvitation] = useState(false);
    const [emailInvitation, setEmailInvitation] = useState('');
    const [motDePasseInvitation, setMotDePasseInvitation] = useState('');
    const [envoiEnCours, setEnvoiEnCours] = useState(false);
    const [visibiliteMotDePasse, setVisibiliteMotDePasse] = useState<{[key: string]: boolean}>({});
    const [visibiliteCleApi, setVisibiliteCleApi] = useState<{[key: string]: boolean}>({});
    const [generationCleApi, setGenerationCleApi] = useState(false);
    const [dureeExpirationCleApi] = useState(30);
    const [pageCourante, setPageCourante] = useState(1);
    const [utilisateursParPage, setUtilisateursParPage] = useState(5);
    const [recherche, setRecherche] = useState('');

    const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([
        {
          id: '1',
          nom: 'Jean Dupont',
          email: 'jean.dupont@example.com',
          role: 'Administrateur',
          documentsConsommes: 45,
          motDePasse: 'password123',
          limiteDocuments: 100,
          cleApi: 'sk-1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
          cleApiGenereeLe: new Date('2024-01-15'),
          cleApiExpireLe: new Date('2024-12-15'),
          cleApiUtiliseeLe: new Date('2024-01-20'),
          nombreUtilisationsCleApi: 150
        },
        {
          id: '2',
          nom: 'Marie Martin',
          email: 'marie.martin@example.com',
          role: 'Administrateur',
          documentsConsommes: 128,
          motDePasse: 'admin456',
          limiteDocuments: 200,
          cleApi: 'sk-abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
          cleApiGenereeLe: new Date('2024-01-10'),
          cleApiExpireLe: new Date('2024-12-10'),
          cleApiUtiliseeLe: new Date('2024-01-25'),
          nombreUtilisationsCleApi: 320
        },
        {
          id: '3',
          nom: 'Pierre Durand',
          email: 'pierre.durand@example.com',
          role: 'Administrateur',
          documentsConsommes: 23,
          motDePasse: 'user789',
          limiteDocuments: 100,
          cleApi: 'sk-7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456',
          cleApiGenereeLe: new Date('2024-01-20'),
          cleApiExpireLe: new Date('2024-12-20'),
          cleApiUtiliseeLe: new Date('2024-01-22'),
          nombreUtilisationsCleApi: 45
        },
        {
          id: '4',
          nom: 'Sophie Bernard',
          email: 'sophie.bernard@example.com',
          role: 'Administrateur',
          documentsConsommes: 67,
          motDePasse: 'moderator321',
          limiteDocuments: 150,
          cleApi: 'sk-4567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123',
          cleApiGenereeLe: new Date('2024-01-12'),
          cleApiExpireLe: new Date('2024-12-12'),
          cleApiUtiliseeLe: new Date('2024-01-24'),
          nombreUtilisationsCleApi: 89
        },
        {
          id: '5',
          nom: 'Lucas Petit',
          email: 'lucas.petit@example.com',
          role: 'Administrateur',
          documentsConsommes: 12,
          motDePasse: 'lucas2024',
          limiteDocuments: 100,
          cleApi: 'sk-234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12',
          cleApiGenereeLe: new Date('2024-01-18'),
          cleApiExpireLe: new Date('2024-12-18'),
          cleApiUtiliseeLe: new Date('2024-01-21'),
          nombreUtilisationsCleApi: 23
        },
        {
          id: '6',
          nom: 'Emma Dubois',
          email: 'emma.dubois@example.com',
          role: 'Administrateur',
          documentsConsommes: 0,
          motDePasse: 'emma123',
          invitationEnvoyee: false,
          invitationEchouee: true,
          limiteDocuments: 100
        },
        {
          id: '7',
          nom: 'Thomas Moreau',
          email: 'thomas.moreau@example.com',
          role: 'Administrateur',
          documentsConsommes: 95,
          motDePasse: 'thomas456',
          limiteDocuments: 100,
          cleApi: 'sk-567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234',
          cleApiGenereeLe: new Date('2024-01-14'),
          cleApiExpireLe: new Date('2024-12-14'),
          cleApiUtiliseeLe: new Date('2024-01-23'),
          nombreUtilisationsCleApi: 156
        },
        {
          id: '8',
          nom: 'Julie Leroy',
          email: 'julie.leroy@example.com',
          role: 'Administrateur',
          documentsConsommes: 110,
          motDePasse: 'julie789',
          limiteDocuments: 100,
          cleApi: 'sk-890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567',
          cleApiGenereeLe: new Date('2024-01-16'),
          cleApiExpireLe: new Date('2024-12-16'),
          cleApiUtiliseeLe: new Date('2024-01-26'),
          nombreUtilisationsCleApi: 234
        }
      ]);

      // Fonction de filtrage des utilisateurs
      const utilisateursFiltres = utilisateurs.filter(utilisateur => 
        utilisateur.nom.toLowerCase().includes(recherche.toLowerCase()) ||
        utilisateur.email.toLowerCase().includes(recherche.toLowerCase()) ||
        utilisateur.role.toLowerCase().includes(recherche.toLowerCase())
      );

      // Calcul de la pagination
      const indexDernierUtilisateur = pageCourante * utilisateursParPage;
      const indexPremierUtilisateur = indexDernierUtilisateur - utilisateursParPage;
      const utilisateursCourants = utilisateursFiltres.slice(indexPremierUtilisateur, indexDernierUtilisateur);
      const nombreTotalPages = Math.ceil(utilisateursFiltres.length / utilisateursParPage);

      // Fonction pour changer de page
      const allerPage = (page: number) => {
        setPageCourante(page);
      };

      // Fonction pour aller à la première page
      const allerPremierePage = () => {
        setPageCourante(1);
      };

      // Fonction pour aller à la dernière page
      const allerDernierePage = () => {
        setPageCourante(nombreTotalPages);
      };

      // Fonction pour aller à la page précédente
      const allerPagePrecedente = () => {
        setPageCourante(prev => Math.max(prev - 1, 1));
      };

      // Fonction pour aller à la page suivante
      const allerPageSuivante = () => {
        setPageCourante(prev => Math.min(prev + 1, nombreTotalPages));
      };

      // Fonction pour changer le nombre d'utilisateurs par page
      const changerUtilisateursParPage = (nouveauNombre: number) => {
        setUtilisateursParPage(nouveauNombre);
        setPageCourante(1); // Retour à la première page
      };

      // Fonction pour réinitialiser la recherche
      const reinitialiserRecherche = () => {
        setRecherche('');
        setPageCourante(1);
      };

      const handleEditUser = (utilisateur: Utilisateur) => {
        setUtilisateurEnModification({ ...utilisateur });
        setAfficherModifier(true);
      };
    
      const handleSaveUser = () => {
        if (utilisateurEnModification) {
          setUtilisateurs(utilisateurs.map(utilisateur => 
            utilisateur.id === utilisateurEnModification.id ? utilisateurEnModification : utilisateur
          ));
          setAfficherModifier(false);
          setUtilisateurEnModification(null);
        }
      };

      const handleDeleteUser = (utilisateur: Utilisateur) => {
        setUtilisateurSelectionne(utilisateur);
        setAfficherSupprimer(true);
      };
    
      const confirmDeleteUser = () => {
        if (utilisateurSelectionne) {
          setUtilisateurs(utilisateurs.filter(utilisateur => utilisateur.id !== utilisateurSelectionne.id));
          setAfficherSupprimer(false);
          setUtilisateurSelectionne(null);
        }
      };
    
      const handleViewDetails = (utilisateur: Utilisateur) => {
        setUtilisateurSelectionne(utilisateur);
        setAfficherDetails(true);
        // Initialize password visibility for this user if not already set
        if (!visibiliteMotDePasse[utilisateur.id]) {
          setVisibiliteMotDePasse(prev => ({...prev, [utilisateur.id]: false}));
        }
        // Initialize API key visibility for this user if not already set
        if (!visibiliteCleApi[utilisateur.id]) {
          setVisibiliteCleApi(prev => ({...prev, [utilisateur.id]: false}));
        }
      };
    
      // Fonction pour générer un mot de passe temporaire
      const genererMotDePasseTemporaire = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let motDePasse = '';
        for (let i = 0; i < 12; i++) {
          motDePasse += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return motDePasse;
      };

      // Fonction pour envoyer l'email d'invitation
      const envoyerEmailInvitation = async (email: string, motDePasse: string) => {
        setEnvoiEnCours(true);
        
        try {
          // Simulation d'envoi d'email (remplacer par votre API d'envoi d'email)
          await new Promise(resolve => setTimeout(resolve, 2000));

          console.log(`Email d'invitation envoyé à ${email} avec le mot de passe: ${motDePasse}`);
          
          // Mettre à jour l'utilisateur avec les informations d'invitation
          setUtilisateurs(utilisateurs.map(utilisateur => 
            utilisateur.email === email 
              ? { ...utilisateur, invitationEnvoyee: true, dateInvitation: new Date() }
              : utilisateur
          ));
          
          setAfficherInvitation(false);
          setEmailInvitation('');
          setMotDePasseInvitation('');
          
          // Afficher une notification de succès
          alert('Email d\'invitation envoyé avec succès !');
          
        } catch (error) {
          console.error('Erreur lors de l\'envoi de l\'email:', error);
          alert('Erreur lors de l\'envoi de l\'email d\'invitation');
        } finally {
          setEnvoiEnCours(false);
        }
      };

      // Fonction pour créer un utilisateur avec invitation
      const handleCreateUserWithInvitation = () => {
        const motDePasseTemp = genererMotDePasseTemporaire();
        const utilisateurACreer: Utilisateur = {
          ...nouvelUtilisateur,
          id: (utilisateurs.length + 1).toString(),
          documentsConsommes: 0,
          motDePasse: motDePasseTemp,
          invitationEnvoyee: false
        };
        
        setUtilisateurs([...utilisateurs, utilisateurACreer]);
        setEmailInvitation(nouvelUtilisateur.email);
        setMotDePasseInvitation(motDePasseTemp);
        setAfficherCreer(false);
        setAfficherInvitation(true);
        
        // Réinitialiser le formulaire
        setNouvelUtilisateur({
          nom: '',
          email: '',
          role: 'Utilisateur',
          motDePasse: '',
          limiteDocuments: 100
        });
      };

      // Fonction pour générer une clé API unique
      const genererCleApi = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let cleApi = 'sk-';
        for (let i = 0; i < 48; i++) {
          cleApi += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return cleApi;
      };

      // Fonction pour générer une nouvelle clé API pour un utilisateur
      const handleGenerateApiKey = async (utilisateurId: string) => {
        setGenerationCleApi(true);
        
        try {
          // Simulation d'une requête API
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const nouvelleCleApi = genererCleApi();
          const maintenant = new Date();
          const expireLe = new Date(maintenant.getTime() + dureeExpirationCleApi * 24 * 60 * 60 * 1000);
          
          setUtilisateurs(utilisateurs.map(utilisateur => 
            utilisateur.id === utilisateurId 
              ? { ...utilisateur, cleApi: nouvelleCleApi, cleApiGenereeLe: maintenant, cleApiExpireLe: expireLe }
              : utilisateur
          ));
          
          // Mettre à jour l'utilisateur sélectionné si c'est le même
          if (utilisateurSelectionne && utilisateurSelectionne.id === utilisateurId) {
            setUtilisateurSelectionne({ ...utilisateurSelectionne, cleApi: nouvelleCleApi, cleApiGenereeLe: maintenant, cleApiExpireLe: expireLe });
          }
          
          // Afficher la nouvelle clé API
          setVisibiliteCleApi(prev => ({...prev, [utilisateurId]: true}));
          
          alert('Nouvelle clé API générée avec succès !');
          
        } catch (error) {
          console.error('Erreur lors de la génération de la clé API:', error);
          alert('Erreur lors de la génération de la clé API');
        } finally {
          setGenerationCleApi(false);
        }
      };

      // Fonction pour copier la clé API dans le presse-papiers
      const copierCleApiPressePapiers = (cleApi: string) => {
        navigator.clipboard.writeText(cleApi);
        alert('Clé API copiée dans le presse-papiers !');
      };

      return (
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Gestion administrateurs</h2>
              <p className="text-xs sm:text-sm text-gray-600">Gérez les administrateurs de la plateforme</p>
            </div>
            <button 
              onClick={() => setAfficherCreer(true)}
              className="flex items-center justify-center space-x-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Créer un administrateur</span>
              <span className="sm:hidden">Créer</span>
            </button>
          </div>

          {/* Barre de recherche et filtres */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Barre de recherche */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher par nom, email ou rôle..."
                    value={recherche}
                    onChange={(e) => {
                      setRecherche(e.target.value);
                      setPageCourante(1); // Retour à la première page lors de la recherche
                    }}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  {recherche && (
                    <button
                      onClick={reinitialiserRecherche}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Sélecteur d'éléments par page */}
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600 whitespace-nowrap">Afficher :</label>
                <select
                  value={utilisateursParPage}
                  onChange={(e) => changerUtilisateursParPage(Number(e.target.value))}
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

            {/* Résultats de recherche */}
            {recherche && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  {utilisateursFiltres.length} résultat{utilisateursFiltres.length > 1 ? 's' : ''} trouvé{utilisateursFiltres.length > 1 ? 's' : ''} pour "{recherche}"
                </p>
              </div>
            )}
          </div>

          {/* Users Table - Mobile Cards */}
          <div className="block sm:hidden">
            {utilisateursCourants.length > 0 ? (
              <div className="space-y-2">
                {utilisateursCourants.map((utilisateur) => (
                  <div key={utilisateur.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-xs">{utilisateur.nom}</h3>
                        <p className="text-gray-600 text-xs">{utilisateur.email}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleViewDetails(utilisateur)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                          title="Voir les détails"
                        >
                          <Eye className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleEditUser(utilisateur)}
                          className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                          title="Modifier"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(utilisateur)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                          title="Supprimer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Rôle:</span>
                        <span className={`inline-flex px-1.5 py-0.5 text-xs font-semibold rounded-full ${
                          utilisateur.role === 'Administrateur' ? 'bg-red-100 text-red-800' :
                          utilisateur.role === 'Modérateur' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {utilisateur.role}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Statut invitation:</span>
                        {utilisateur.invitationEnvoyee ? (
                          <div className="inline-flex items-center space-x-1">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <span className="text-green-700">Envoyée</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center space-x-1">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                            <span className="text-gray-500">En attente</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {!utilisateur.invitationEnvoyee && (
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <button
                          onClick={() => {
                            setEmailInvitation(utilisateur.email);
                            setMotDePasseInvitation(utilisateur.motDePasse);
                            setAfficherInvitation(true);
                          }}
                          className="w-full text-purple-600 hover:text-purple-900 p-1.5 rounded hover:bg-purple-50 text-xs flex items-center justify-center space-x-1"
                        >
                          <Mail className="w-3 h-3" />
                          <span>Envoyer invitation</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">Aucun administrateur trouvé</h3>
                <p className="text-xs text-gray-500">
                  {recherche ? `Aucun administrateur ne correspond à "${recherche}"` : 'Aucun administrateur disponible'}
                </p>
                {recherche && (
                  <button
                    onClick={reinitialiserRecherche}
                    className="mt-3 text-xs text-blue-600 hover:text-blue-800 underline"
                  >
                    Effacer la recherche
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Users Table - Desktop */}
          <div className="hidden sm:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {utilisateursCourants.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nom
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rôle
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut invitation
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {utilisateursCourants.map((utilisateur) => (
                      <tr key={utilisateur.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="text-xs font-medium text-gray-900">{utilisateur.nom}</div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="text-xs text-gray-900">{utilisateur.email}</div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <span className={`inline-flex px-1.5 py-0.5 text-xs font-semibold rounded-full ${
                            utilisateur.role === 'Administrateur' ? 'bg-red-100 text-red-800' :
                            utilisateur.role === 'Modérateur' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {utilisateur.role}
                          </span>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {utilisateur.invitationEnvoyee ? (
                            <div className="flex items-center space-x-1">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              <span className="text-xs text-green-700">Invitation envoyée</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1">
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                              <span className="text-xs text-gray-500">En attente</span>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-xs font-medium">
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => handleViewDetails(utilisateur)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                              title="Voir les détails"
                            >
                              <Eye className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleEditUser(utilisateur)}
                              className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                              title="Modifier"
                            >
                              <Edit className="w-3 h-3" />
                            </button>
                            {!utilisateur.invitationEnvoyee ? (
                              <button
                                onClick={() => {
                                  setEmailInvitation(utilisateur.email);
                                  setMotDePasseInvitation(utilisateur.motDePasse);
                                  setAfficherInvitation(true);
                                }}
                                className="text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-50"
                                title="Envoyer invitation"
                              >
                                <Mail className="w-3 h-3" />
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setEmailInvitation(utilisateur.email);
                                  setMotDePasseInvitation(utilisateur.motDePasse);
                                  setAfficherInvitation(true);
                                }}
                                className="text-orange-600 hover:text-orange-900 p-1 rounded hover:bg-orange-50"
                                title="Renvoyer les accès"
                              >
                                <Mail className="w-3 h-3" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteUser(utilisateur)}
                              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                              title="Supprimer"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">Aucun administrateur trouvé</h3>
                <p className="text-xs text-gray-500">
                  {recherche ? `Aucun administrateur ne correspond à "${recherche}"` : 'Aucun administrateur disponible'}
                </p>
                {recherche && (
                  <button
                    onClick={reinitialiserRecherche}
                    className="mt-3 text-xs text-blue-600 hover:text-blue-800 underline"
                  >
                    Effacer la recherche
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="bg-gray-50 px-2 sm:px-3 py-2 flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button 
                    onClick={allerPagePrecedente}
                    disabled={pageCourante === 1}
                    className="relative inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Précédent
                  </button>
                  <button 
                    onClick={allerPageSuivante}
                    disabled={pageCourante === nombreTotalPages}
                    className="ml-2 relative inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Suivant
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs text-gray-700">
                      Affichage de <span className="font-semibold">{indexPremierUtilisateur + 1}</span> à <span className="font-semibold">{Math.min(indexDernierUtilisateur, utilisateursFiltres.length)}</span> sur <span className="font-semibold">{utilisateursFiltres.length}</span> résultat{utilisateursFiltres.length > 1 ? 's' : ''}
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px" aria-label="Pagination">
                      <button 
                        onClick={allerPagePrecedente}
                        disabled={pageCourante === 1}
                        className="relative inline-flex items-center px-2 py-1 rounded-l-lg border border-gray-300 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Précédent</span>
                        <ChevronLeft className="w-3 h-3" />
                      </button>
                      
                      {/* Première page */}
                      {pageCourante > 3 && (
                        <button 
                          onClick={allerPremierePage}
                          className="relative inline-flex items-center px-2.5 py-1 border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          1
                        </button>
                      )}
                      
                      {/* Ellipsis après la première page */}
                      {pageCourante > 4 && (
                        <span className="relative inline-flex items-center px-2.5 py-1 border border-gray-300 bg-white text-xs font-medium text-gray-700">
                          ...
                        </span>
                      )}
                      
                      {/* Pages autour de la page courante */}
                      {Array.from({ length: Math.min(5, nombreTotalPages) }, (_, i) => {
                        const page = Math.max(1, Math.min(nombreTotalPages - 4, pageCourante - 2)) + i;
                        if (page > nombreTotalPages) return null;
                        
                        return (
                          <button 
                            key={page}
                            onClick={() => allerPage(page)}
                            className={`relative inline-flex items-center px-2.5 py-1 border border-gray-300 text-xs font-medium transition-colors ${
                              page === pageCourante 
                                ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' 
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                      
                      {/* Ellipsis avant la dernière page */}
                      {pageCourante < nombreTotalPages - 3 && (
                        <span className="relative inline-flex items-center px-2.5 py-1 border border-gray-300 bg-white text-xs font-medium text-gray-700">
                          ...
                        </span>
                      )}
                      
                      {/* Dernière page */}
                      {pageCourante < nombreTotalPages - 2 && (
                        <button 
                          onClick={allerDernierePage}
                          className="relative inline-flex items-center px-2.5 py-1 border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          {nombreTotalPages}
                        </button>
                      )}
                      
                      <button 
                        onClick={allerPageSuivante}
                        disabled={pageCourante === nombreTotalPages}
                        className="relative inline-flex items-center px-2 py-1 rounded-r-lg border border-gray-300 bg-white text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Suivant</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>

          {/* User Details Modal */}
          {afficherDetails && utilisateurSelectionne && (
            <div className="fixed inset-0 bg-white/40 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
              <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900">Détails de l'administrateur</h3>
                  </div>
                  <button
                    onClick={() => setAfficherDetails(false)}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="px-4 py-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-2">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <User className="w-3 h-3 text-gray-500" />
                          <label className="text-xs font-medium text-gray-700">Nom complet</label>
                        </div>
                        <p className="text-xs text-gray-900 font-medium">{utilisateurSelectionne.nom}</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <label className="text-xs font-medium text-gray-700">Adresse email</label>
                        </div>
                        <p className="text-xs text-gray-900 font-medium">{utilisateurSelectionne.email}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <label className="text-xs font-medium text-gray-700">Rôle</label>
                        </div>
                        <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${
                          utilisateurSelectionne.role === 'Administrateur' ? 'bg-red-100 text-red-800' :
                          utilisateurSelectionne.role === 'Modérateur' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {utilisateurSelectionne.role}
                        </span>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <label className="text-xs font-medium text-gray-700">Documents consommés</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-blue-600">{utilisateurSelectionne.documentsConsommes}</span>
                          <span className="text-xs text-gray-500">documents</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 bg-blue-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <label className="text-xs font-medium text-blue-700">Mot de passe</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-900 font-mono break-all">
                        {visibiliteMotDePasse[utilisateurSelectionne.id] ? utilisateurSelectionne.motDePasse : '********'}
                      </span>
                      <button 
                        onClick={() => setVisibiliteMotDePasse(prev => ({...prev, [utilisateurSelectionne.id]: !prev[utilisateurSelectionne.id]}))}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-100 transition-colors flex-shrink-0"
                        title={visibiliteMotDePasse[utilisateurSelectionne.id] ? "Masquer le mot de passe" : "Voir le mot de passe"}
                      >
                        {visibiliteMotDePasse[utilisateurSelectionne.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>

                  {utilisateurSelectionne.cleApi && (
                    <div className="mt-3 bg-purple-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <svg className="w-3 h-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.242a3 3 0 00-4.242 0l-4 4a3 3 0 104.242 4.242l1.414-1.414a2 2 0 00.586-1.414V14a2 2 0 10-4 0v3a2 2 0 002 2h3a2 2 0 002-2v-3a2 2 0 00-.586-1.414l-1.414-1.414z" />
                        </svg>
                        <label className="text-xs font-medium text-purple-700">Clé API</label>
                      </div>
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="text-xs text-gray-900 font-mono bg-white px-2 py-1 rounded border break-all">
                          {visibiliteCleApi[utilisateurSelectionne.id] ? utilisateurSelectionne.cleApi : '********'}
                        </span>
                        <div className="flex items-center space-x-1">
                          <button 
                            onClick={() => setVisibiliteCleApi(prev => ({...prev, [utilisateurSelectionne.id]: !prev[utilisateurSelectionne.id]}))}
                            className="text-purple-600 hover:text-purple-800 p-1 rounded hover:bg-purple-100 transition-colors"
                            title={visibiliteCleApi[utilisateurSelectionne.id] ? "Masquer la clé API" : "Voir la clé API"}
                          >
                            {visibiliteCleApi[utilisateurSelectionne.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                          </button>
                          <button 
                            onClick={() => copierCleApiPressePapiers(utilisateurSelectionne.cleApi || '')}
                            className="text-purple-600 hover:text-purple-800 p-1 rounded hover:bg-purple-100 transition-colors"
                            title="Copier la clé API"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                          <button 
                            onClick={() => handleGenerateApiKey(utilisateurSelectionne.id)}
                            disabled={generationCleApi}
                            className="text-purple-600 hover:text-purple-800 p-1 rounded hover:bg-purple-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Régénérer la clé API"
                          >
                            <RefreshCw className={`w-3 h-3 ${generationCleApi ? 'animate-spin' : ''}`} />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-purple-600 mt-1">
                        Cette clé API est unique et doit être gardée en sécurité. Elle est générée automatiquement lors de la création de l'utilisateur.
                      </p>
                    </div>
                  )}
                </div>
                <div className="px-4 py-3 border-t border-gray-200 flex justify-end space-x-2">
                  <button
                    onClick={() => setAfficherDetails(false)}
                    className="px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2 text-xs"
                  >
                    <X className="w-3 h-3" />
                    <span>Fermer</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit User Modal */}
          {afficherModifier && utilisateurEnModification && (
            <div className="fixed inset-0 bg-white/40 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
              <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900">Modifier l'administrateur</h3>
                  <button
                    onClick={() => setAfficherModifier(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="px-4 py-3 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Nom</label>
                    <input
                      type="text"
                      value={utilisateurEnModification.nom}
                      onChange={(e) => setUtilisateurEnModification({...utilisateurEnModification, nom: e.target.value})}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={utilisateurEnModification.email}
                      onChange={(e) => setUtilisateurEnModification({...utilisateurEnModification, email: e.target.value})}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Rôle</label>
                    <select
                      value={utilisateurEnModification.role}
                      onChange={(e) => setUtilisateurEnModification({...utilisateurEnModification, role: e.target.value})}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                    >
                      <option value="Utilisateur">Utilisateur</option>
                      <option value="Modérateur">Modérateur</option>
                      <option value="Administrateur">Administrateur</option>
                    </select>
                  </div>
                </div>
                <div className="px-4 py-3 border-t border-gray-200 flex justify-end space-x-2">
                  <button
                    onClick={() => setAfficherModifier(false)}
                    className="px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-xs"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSaveUser}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 text-xs"
                  >
                    <Save className="w-3 h-3" />
                    <span>Sauvegarder</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Create User Modal */}
          {afficherCreer && (
            <div className="fixed inset-0 bg-white/40 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
              <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-gray-900">Créer un administrateur</h3>
                  <button
                    onClick={() => setAfficherCreer(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="px-4 py-3 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Nom</label>
                    <input
                      type="text"
                      value={nouvelUtilisateur.nom}
                      onChange={(e) => setNouvelUtilisateur({...nouvelUtilisateur, nom: e.target.value})}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                      placeholder="Entrez le nom"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={nouvelUtilisateur.email}
                      onChange={(e) => setNouvelUtilisateur({...nouvelUtilisateur, email: e.target.value})}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                      placeholder="Entrez l'email"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Rôle</label>
                    <select
                      value={nouvelUtilisateur.role}
                      onChange={(e) => setNouvelUtilisateur({...nouvelUtilisateur, role: e.target.value})}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                    >
                      <option value="Utilisateur">Utilisateur</option>
                      <option value="Modérateur">Modérateur</option>
                      <option value="Administrateur">Administrateur</option>
                    </select>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Key className="w-3 h-3 text-blue-500" />
                      <span className="text-xs font-medium text-blue-700">Mot de passe temporaire</span>
                    </div>
                    <p className="text-xs text-blue-600">
                      Un mot de passe temporaire sera généré automatiquement et envoyé par email à l'utilisateur.
                    </p>
                  </div>
                </div>
                <div className="px-4 py-3 border-t border-gray-200 flex justify-end space-x-2">
                  <button
                    onClick={() => setAfficherCreer(false)}
                    className="px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-xs"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleCreateUserWithInvitation}
                    disabled={!nouvelUtilisateur.nom || !nouvelUtilisateur.email}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Créer et inviter</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Invitation Modal */}
          {afficherInvitation && (
            <div className="fixed inset-0 bg-white/40 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
              <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Mail className="w-4 h-4 text-purple-600" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900">Envoyer l'invitation</h3>
                  </div>
                  <button
                    onClick={() => setAfficherInvitation(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="px-4 py-4 space-y-3">
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Mail className="w-3 h-3 text-purple-500" />
                      <label className="text-xs font-medium text-purple-700">Email de destination</label>
                    </div>
                    <p className="text-xs text-gray-900 font-medium break-all">{emailInvitation}</p>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Key className="w-3 h-3 text-yellow-500" />
                      <label className="text-xs font-medium text-yellow-700">Mot de passe temporaire</label>
                    </div>
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-xs text-gray-900 font-mono bg-white px-2 py-1 rounded border break-all">
                        {motDePasseInvitation}
                      </span>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(motDePasseInvitation).then(() => {
                            // Afficher une notification de succès
                            const button = event?.target as HTMLButtonElement;
                            const originalText = button.textContent;
                            button.textContent = 'Copié !';
                            button.classList.add('bg-green-100', 'text-green-700', 'border-green-300');
                            button.classList.remove('text-yellow-600', 'hover:text-yellow-800');
                            
                            setTimeout(() => {
                              button.textContent = originalText;
                              button.classList.remove('bg-green-100', 'text-green-700', 'border-green-300');
                              button.classList.add('text-yellow-600', 'hover:text-yellow-800');
                            }, 2000);
                          }).catch(() => {
                            alert('Erreur lors de la copie. Veuillez copier manuellement le mot de passe.');
                          });
                        }}
                        className="text-yellow-600 hover:text-yellow-800 text-xs px-2 py-1 rounded border border-yellow-300 hover:bg-yellow-100 transition-all duration-200"
                      >
                        Copier
                      </button>
                    </div>
                    <p className="text-xs text-yellow-600 mt-1">
                      Ce mot de passe sera envoyé par email. L'utilisateur devra le changer lors de sa première connexion.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <AlertTriangle className="w-3 h-3 text-blue-500" />
                      <label className="text-xs font-medium text-blue-700">Contenu de l'email</label>
                    </div>
                    <div className="text-xs text-blue-600 space-y-1">
                      <p><strong>Objet :</strong> Invitation à rejoindre la plateforme</p>
                      <p><strong>Contenu :</strong></p>
                      <div className="bg-white p-2 rounded border text-gray-700 text-xs">
                        <p>Bonjour,</p>
                        <p>Vous avez été invité à rejoindre notre plateforme.</p>
                        <p>Vos identifiants de connexion :</p>
                        <p>Email : {emailInvitation}</p>
                        <p>Mot de passe temporaire : {motDePasseInvitation}</p>
                        <p>Veuillez changer votre mot de passe lors de votre première connexion.</p>
                        <p>Cordialement,<br/>L'équipe de la plateforme</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 border-t border-gray-200 flex justify-end space-x-2">
                  <button
                    onClick={() => setAfficherInvitation(false)}
                    className="px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-xs"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => envoyerEmailInvitation(emailInvitation, motDePasseInvitation)}
                    disabled={envoiEnCours}
                    className="px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                  >
                    {envoiEnCours ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-3 h-3" />
                        <span>Envoyer l'invitation</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {afficherSupprimer && utilisateurSelectionne && (
            <div className="fixed inset-0 bg-white/40 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
              <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
                <div className="px-4 py-3 border-b border-gray-200 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">Confirmer la suppression</h3>
                </div>
                <div className="px-4 py-3">
                  <p className="text-xs text-gray-600">
                    Êtes-vous sûr de vouloir supprimer l'administrateur <strong>{utilisateurSelectionne.nom}</strong> ? 
                    Cette action est irréversible.
                  </p>
                </div>
                <div className="px-4 py-3 border-t border-gray-200 flex justify-end space-x-2">
                  <button
                    onClick={() => setAfficherSupprimer(false)}
                    className="px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-xs"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={confirmDeleteUser}
                    className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2 text-xs"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Supprimer</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
}