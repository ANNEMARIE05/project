import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [motDePasse, setMotDePasse] = useState<string>("");
  const [afficherMotDePasse, setAfficherMotDePasse] = useState<boolean>(false);
  const [modeReinitialisation, setModeReinitialisation] = useState<boolean>(false);
  const [messageEnvoi, setMessageEnvoi] = useState<string>("");
  const [erreur, setErreur] = useState<string>("");
  const [erreurMotDePasse, setErreurMotDePasse] = useState<string>("");

  const validerMotDePasse = (motDePasse: string) => {
    if (motDePasse.length < 8) {
      return "Le mot de passe doit contenir au moins 8 caractères";
    }
    if (!/[A-Z]/.test(motDePasse)) {
      return "Le mot de passe doit contenir au moins une lettre majuscule";
    }
    if (!/[a-z]/.test(motDePasse)) {
      return "Le mot de passe doit contenir au moins une lettre minuscule";
    }
    if (!/\d/.test(motDePasse)) {
      return "Le mot de passe doit contenir au moins un chiffre";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(motDePasse)) {
      return "Le mot de passe doit contenir au moins un caractère spécial";
    }
    return "";
  };

  const gererConnexion = () => {
    setErreur("");
    if (!email || !motDePasse) {
      setErreur("Veuillez remplir tous les champs");
      return;
    }
    
    const validationMotDePasse = validerMotDePasse(motDePasse);
    if (validationMotDePasse) {
      setErreurMotDePasse(validationMotDePasse);
      return;
    }
    
    if(email === "admin@gmail.com" && motDePasse === "Admin123@") {
      window.location.href = "/otp?next=" + encodeURIComponent("/admin");
    } else if(email === "user@gmail.com" && motDePasse === "User123@") {
      window.location.href = "/otp?next=" + encodeURIComponent("/user");
    } else {
      setErreur("Email ou mot de passe incorrect");
    }
  };

  const gererReinitialisation = () => {
    if (!email) {
      setErreur("Veuillez saisir votre adresse email");
      return;
    }
    
    setMessageEnvoi("Un code de réinitialisation OTP a été envoyé à votre adresse email.");
    console.log("Réinitialisation pour:", email);
    // Rediriger vers la page OTP
    window.location.href = "/otp";
  };

  const basculerAffichageMotDePasse = () => {
    setAfficherMotDePasse(!afficherMotDePasse);
  };

  const basculerModeReinitialisation = () => {
    setModeReinitialisation(!modeReinitialisation);
    setMessageEnvoi("");
    setErreur("");
    setErreurMotDePasse("");
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
              Bienvenue<br />
              sur le Portail OCR
            </h2>
            <p className="mt-4 text-blue-100 text-sm max-w-sm">
              Connectez-vous pour accéder à votre tableau de bord et gérer vos documents.
            </p>
          </div>
        </div>

        {/* Colonne droite - Formulaire */}
        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Connexion</h1>
            {modeReinitialisation && (
              <p className="text-sm text-gray-600 mt-1">Réinitialiser votre mot de passe</p>
            )}
          </div>

          <div className="space-y-5">
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-200 transition-all duration-200"
                  placeholder="votreemail@exemple.com"
                  required
                />
              </div>
            </div>

            {!modeReinitialisation && (
              <div className="relative">
                <label htmlFor="motdepasse" className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                  <input
                    id="motdepasse"
                    type={afficherMotDePasse ? "text" : "password"}
                    value={motDePasse}
                    onChange={(e) => {
                      setMotDePasse(e.target.value);
                      setErreurMotDePasse(validerMotDePasse(e.target.value));
                    }}
                    className="w-full pl-12 pr-12 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-200 transition-all duration-200"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={basculerAffichageMotDePasse}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    {afficherMotDePasse ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {erreurMotDePasse && (
                  <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-xs">
                    {erreurMotDePasse}
                  </div>
                )}
              </div>
            )}

            {erreur && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-700 text-sm">
                {erreur}
              </div>
            )}

            {messageEnvoi && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-700 text-sm">
                {messageEnvoi}
              </div>
            )}

            <button
              onClick={modeReinitialisation ? gererReinitialisation : gererConnexion}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-sm hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 group"
            >
              <span>{modeReinitialisation ? "Envoyer le code" : "Se connecter"}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          <div className="mt-5 text-center">
            <button
              type="button"
              onClick={() => {
                if (modeReinitialisation) {
                  window.location.href = "/login";
                } else {
                  basculerModeReinitialisation();
                }
              }}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200 hover:underline"
            >
              {modeReinitialisation ? "← Retour à la connexion" : "Mot de passe oublié ?"}
            </button>
          </div>

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