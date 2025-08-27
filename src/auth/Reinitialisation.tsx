import { useState } from "react";
import { Eye, EyeOff, Lock, Shield, Check, X, ArrowRight, ArrowLeft } from "lucide-react";

export default function Reinitialisation() {
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState("");
  const [confirmerMotDePasse, setConfirmerMotDePasse] = useState("");
  const [afficherNouveauMotDePasse, setAfficherNouveauMotDePasse] = useState(false);
  const [afficherConfirmationMotDePasse, setAfficherConfirmationMotDePasse] = useState(false);
  const [motDePasseValide, setMotDePasseValide] = useState(false);
  const [messageSucces, setMessageSucces] = useState("");
  const naviguer = (chemin: string) => {
    window.location.href = chemin;
  };

  // Critères de validation du mot de passe
  const criteresValidation = {
    longueur: nouveauMotDePasse.length >= 8
  };

  // Vérification de la correspondance des mots de passe
  const motsDePasseCorrespondent = nouveauMotDePasse && confirmerMotDePasse && nouveauMotDePasse === confirmerMotDePasse;

  // Validation du formulaire
  const formulaireValide = Object.values(criteresValidation).every(Boolean) && motsDePasseCorrespondent;

  // Gestion de la validation
  const validerNouveauMotDePasse = () => {
    if (formulaireValide) {
      setMotDePasseValide(true);
      setMessageSucces("Votre mot de passe a été mis à jour avec succès !");
      console.log("Nouveau mot de passe validé:", { nouveauMotDePasse });
      
      // Redirection après 2 secondes
      setTimeout(() => {
        naviguer("/login");
      }, 2000);
    }
  };

  // Retour à la page précédente
  const retourPagePrecedente = () => {
    naviguer("/login");
  };

  // Basculer l'affichage des mots de passe
  const basculerAffichageNouveauMotDePasse = () => {
    setAfficherNouveauMotDePasse(!afficherNouveauMotDePasse);
  };

  const basculerAffichageConfirmationMotDePasse = () => {
    setAfficherConfirmationMotDePasse(!afficherConfirmationMotDePasse);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100">
        {/* Colonne gauche - Branding */}
        <div className="relative hidden md:flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-500 p-10">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-28 -right-28 w-80 h-80 bg-blue-400 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-28 -left-28 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 w-full">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <span className="text-white text-xl font-semibold">Portail OCR</span>
            </div>
            <h2 className="text-white text-4xl font-extrabold leading-tight">
              Réinitialisation
            </h2>
            <p className="mt-4 text-blue-100 text-sm max-w-sm">
              Choisissez un nouveau mot de passe pour accéder à votre compte.
            </p>
          </div>
        </div>

        {/* Colonne droite - Formulaire */}
        <div className="p-6 sm:p-8">
          
          {/* Bouton retour */}
          <button 
            onClick={retourPagePrecedente}
            className="mb-4 flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-sm">Retour</span>
          </button>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Nouveau mot de passe</h1>
            <p className="text-sm text-gray-600 mt-1">Créez un mot de passe sécurisé</p>
          </div>

          {!motDePasseValide ? (
            <div className="space-y-6">
              {/* Nouveau mot de passe */}
              <div className="relative">
                <label htmlFor="nouveauMotDePasse" className="block text-sm font-medium text-gray-700 mb-2">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                  <input
                    id="nouveauMotDePasse"
                    type={afficherNouveauMotDePasse ? "text" : "password"}
                    value={nouveauMotDePasse}
                    onChange={(e) => setNouveauMotDePasse(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-50"
                    placeholder="Saisissez votre nouveau mot de passe"
                  />
                  <button
                    type="button"
                    onClick={basculerAffichageNouveauMotDePasse}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors duration-200"
                  >
                    {afficherNouveauMotDePasse ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Message informatif */}
                {nouveauMotDePasse && nouveauMotDePasse.length < 8 && (
                  <div className="mt-2">
                    <span className="text-xs text-red-500">
                      Le mot de passe doit contenir au moins 8 caractères
                    </span>
                  </div>
                )}
              </div>

              {/* Confirmer le mot de passe */}
              <div className="relative">
                <label htmlFor="confirmerMotDePasse" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                  <input
                    id="confirmerMotDePasse"
                    type={afficherConfirmationMotDePasse ? "text" : "password"}
                    value={confirmerMotDePasse}
                    onChange={(e) => setConfirmerMotDePasse(e.target.value)}
                    className={`w-full pl-12 pr-12 py-4 bg-gray-50/50 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 hover:bg-gray-50 ${
                      confirmerMotDePasse 
                        ? motsDePasseCorrespondent 
                          ? 'border-green-300 focus:ring-green-500' 
                          : 'border-red-300 focus:ring-red-500'
                        : 'border-gray-200 focus:ring-blue-500'
                    }`}
                    placeholder="Confirmez votre mot de passe"
                  />
                  <button
                    type="button"
                    onClick={basculerAffichageConfirmationMotDePasse}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors duration-200"
                  >
                    {afficherConfirmationMotDePasse ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Message de correspondance */}
                {confirmerMotDePasse && (
                  <div className="mt-2">
                    {motsDePasseCorrespondent ? (
                      <div className="flex items-center space-x-1 text-green-600 text-xs">
                        <Check className="w-4 h-4" />
                        <span>Les mots de passe correspondent</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-red-500 text-xs">
                        <X className="w-4 h-4" />
                        <span>Les mots de passe ne correspondent pas</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bouton de validation */}
              <button
                onClick={validerNouveauMotDePasse}
                disabled={!formulaireValide}
                className={`w-full py-3 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2 ${
                  formulaireValide
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>Mettre à jour le mot de passe</span>
                {formulaireValide && (
                  <ArrowRight className="w-5 h-5" />
                )}
              </button>
            </div>
          ) : (
            /* Message de succès */
            <div className="text-center animate-pulse">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <Shield className="w-10 h-10 text-green-500 animate-bounce" />
              </div>
              <h2 className="text-2xl font-bold text-green-700 mb-2">Mot de passe mis à jour !</h2>
              <p className="text-gray-600 text-sm mb-4">
                {messageSucces}
              </p>
              <div className="text-xs text-gray-500">
                Redirection automatique...
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center">
            <div className="flex-1 h-px bg-gray-200"></div>
            <div className="px-4 text-xs text-gray-500">Portail OCR</div>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}