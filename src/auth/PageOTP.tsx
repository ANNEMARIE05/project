import { useState, useEffect } from "react";
import { Smartphone, RefreshCw, ArrowLeft, CheckCircle, Shield } from "lucide-react";

export default function PageOTP() {
  const [codeOTP, setCodeOTP] = useState<string[]>(["", "", "", "", "", ""]);
  const [tempsRestant, setTempsRestant] = useState<number>(120); // 2 minutes
  const [codeEnvoye, setCodeEnvoye] = useState<boolean>(false);
  const [numeroTelephone] = useState<string>("+225 07 ** ** ** 45");
  const [erreurCode, setErreurCode] = useState<string>("");
  const [codeValide, setCodeValide] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [afficherMessageValidation, setAfficherMessageValidation] = useState<boolean>(false);
  const nextTarget = (() => {
    const qp = new URLSearchParams(window.location.search);
    return qp.get("next") ?? "/reinitialisation";
  })();

  // Formatage du temps restant
  const formaterTemps = (secondes: number) => {
    const minutes = Math.floor(secondes / 60);
    const secRestantes = secondes % 60;
    return `${minutes}:${secRestantes.toString().padStart(2, "0")}`;
  };

  // Minuteur
  useEffect(() => {
    if (tempsRestant > 0 && !codeValide) {
      const timer = setTimeout(() => setTempsRestant(tempsRestant - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [tempsRestant, codeValide]);

  // Gestion de la saisie du code OTP
  const gererSaisieOTP = (index: number, valeur: string) => {
    // Ne permettre que les chiffres
    if (!/^\d*$/.test(valeur)) return;

    const nouveauCode = [...codeOTP];
    nouveauCode[index] = valeur;
    setCodeOTP(nouveauCode);
    setErreurCode("");

    // Passer à l'input suivant si une valeur est saisie
    if (valeur && index < 5) {
      const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }

    // Vérifier si le code est complet
    if (nouveauCode.every(digit => digit !== "")) {
      const codeComplet = nouveauCode.join("");
      verifierCode(codeComplet);
    }
  };

  // Gestion de la suppression
  const gererSuppression = (index: number) => {
    if (codeOTP[index] === "" && index > 0) {
      // Si l'input actuel est vide et qu'on appuie sur backspace, aller à l'input précédent
      const prevInput = document.querySelector(`input[data-index="${index - 1}"]`) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  // Gestion de la navigation avec les flèches
  const gererNavigation = (index: number, direction: 'left' | 'right') => {
    if (direction === 'left' && index > 0) {
      const prevInput = document.querySelector(`input[data-index="${index - 1}"]`) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    } else if (direction === 'right' && index < 5) {
      const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // Vérifier le code OTP
  const verifierCode = (code: string) => {
    setIsLoading(true);
    console.log("Vérification du code:", code);
    
    // Simulation de vérification (remplacer par votre logique)
    setTimeout(() => {
      if (code === "123456") {
        setCodeValide(true);
        setErreurCode("");
        setIsLoading(false);
        setAfficherMessageValidation(true);
        
        // Redirection après 2 secondes
        setTimeout(() => {
          window.location.href = nextTarget;
        }, 2000);
      } else {
        setErreurCode("Code incorrect. Veuillez réessayer.");
        setCodeOTP(["", "", "", "", "", ""]);
        setIsLoading(false);
        // Focus sur le premier input après une erreur
        setTimeout(() => {
          const firstInput = document.querySelector(`input[data-index="0"]`) as HTMLInputElement;
          if (firstInput) {
            firstInput.focus();
          }
        }, 100);
      }
    }, 1000);
  };

  // Renvoyer le code
  const renvoyerCode = () => {
    setTempsRestant(120);
    setCodeEnvoye(true);
    setErreurCode("");
    setCodeOTP(["", "", "", "", "", ""]);
    console.log("Nouveau code envoyé à:", numeroTelephone);
    
    // Animation de feedback
    setTimeout(() => setCodeEnvoye(false), 3000);
  };

  // Retour à la page précédente
  const retourPagePrecedente = () => {
    window.location.href = "/";
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
              Vérification OTP
            </h2>
            <p className="mt-4 text-blue-100 text-sm max-w-sm">
              Entrez le code envoyé pour sécuriser votre connexion.
            </p>
          </div>
        </div>

        {/* Colonne droite - Formulaire OTP */}
        <div className="p-6 sm:p-8">
          <button 
            onClick={retourPagePrecedente}
            className="mb-4 flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-sm">Retour</span>
          </button>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Vérification</h1>
            <p className="text-sm text-gray-600 mt-1">
              Un code a été envoyé à <span className="text-blue-600 font-semibold">{numeroTelephone}</span>
            </p>
          </div>

          {!codeValide ? (
            <>
              {/* Champs de saisie OTP séparés */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                  Saisissez le code à 6 chiffres
                </label>
                <div className="flex justify-center space-x-2 mb-6">
                  {codeOTP.map((digit, index) => (
                    <input
                      key={index}
                      data-index={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => gererSaisieOTP(index, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace') {
                          gererSuppression(index);
                        } else if (e.key === 'ArrowLeft') {
                          gererNavigation(index, 'left');
                        } else if (e.key === 'ArrowRight') {
                          gererNavigation(index, 'right');
                        }
                      }}
                      className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        erreurCode 
                          ? "border-red-300 bg-red-50 text-red-600" 
                          : digit 
                            ? "border-blue-500 bg-blue-50 text-blue-700" 
                            : "border-gray-200 bg-gray-50 hover:border-blue-300"
                      }`}
                      placeholder=""
                      disabled={isLoading}
                    />
                  ))}
                </div>
              </div>

              {/* Message d'erreur */}
              {erreurCode && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-700 text-sm text-center">
                  {erreurCode}
                </div>
              )}

              {/* Message de renvoi */}
              {codeEnvoye && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-700 text-sm text-center">
                  Nouveau code envoyé !
                </div>
              )}

              {/* Minuteur et renvoi */}
              <div className="text-center mb-6">
                {tempsRestant > 0 ? (
                  <div className="text-gray-600 text-sm mb-3">
                    Code expire dans{" "}
                    <span className="font-mono font-bold text-blue-600">
                      {formaterTemps(tempsRestant)}
                    </span>
                  </div>
                ) : null}
                
                <button
                  onClick={renvoyerCode}
                  disabled={tempsRestant > 0 || isLoading}
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    tempsRestant > 0 || isLoading
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  }`}
                >
                  <RefreshCw className={`w-4 h-4 ${tempsRestant <= 0 && !isLoading ? "hover:rotate-180 transition-transform duration-500" : ""}`} />
                  <span>Renvoyer le code</span>
                </button>
              </div>
            </>
          ) : null}

          {/* Message de validation réussie */}
          {afficherMessageValidation && (
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
                <CheckCircle className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-blue-700 mb-2">Code validé</h2>
              <p className="text-gray-600 text-sm mb-4">
                Vérification réussie. Redirection en cours...
              </p>
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