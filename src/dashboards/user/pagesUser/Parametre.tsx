import { useState } from 'react';
import { Shield, Bell, Mail, MessageSquare, Smartphone, X } from 'lucide-react';

export default function Parametre() {
    const [deuxFacteursActive, setDeuxFacteursActive] = useState(false);
    const [notificationsEmail, setNotificationsEmail] = useState(true);
    const [notificationsPush, setNotificationsPush] = useState(false);
    const [showModal2FA, setShowModal2FA] = useState(false);
    const [canal2FA, setCanal2FA] = useState<'email' | 'sms' | 'push' | null>(null);

    const basculerDeuxFacteurs = () => {
        if (!deuxFacteursActive) {
            // Ouvrir le modal pour choisir le canal
            setShowModal2FA(true);
        } else {
            // Désactiver directement
            setDeuxFacteursActive(false);
            setCanal2FA(null);
            console.log('Désactivation de la 2FA...');
        }
    };

    const activer2FA = (canal: 'email' | 'sms' | 'push') => {
        setCanal2FA(canal);
        setDeuxFacteursActive(true);
        setShowModal2FA(false);
        console.log(`Activation de la 2FA via ${canal}...`);
    };

    const fermerModal = () => {
        setShowModal2FA(false);
    };

    return (
        <div className="space-y-3 sm:space-y-4 px-4 sm:px-0">
            <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Paramètres</h2>
                <p className="text-xs sm:text-sm text-gray-600">Configurez vos préférences et sécurisez votre compte</p>
            </div>

            {/* Section Sécurité */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Sécurité
                </h3>
                
                {/* 2FA */}
                <div className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-100">
                    <div className="flex-1 pr-3">
                        <h4 className="font-medium text-gray-900 text-sm">Authentification à deux facteurs (2FA)</h4>
                        <p className="text-xs text-gray-600 mt-0.5">
                            {deuxFacteursActive 
                                ? `Sécurisé via ${canal2FA === 'email' ? 'email' : canal2FA === 'sms' ? 'SMS' : 'push'}`
                                : 'Sécurisez votre compte avec une authentification supplémentaire'
                            }
                        </p>
                    </div>
                    <button
                        onClick={basculerDeuxFacteurs}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0 ${
                            deuxFacteursActive ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                    >
                        <span
                            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                                deuxFacteursActive ? 'translate-x-5' : 'translate-x-0.5'
                            }`}
                        />
                    </button>
                </div>
            </div>

            {/* Section Notifications */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    Notifications
                </h3>
                
                <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 pr-3">
                            <h4 className="font-medium text-gray-900 text-sm">Notifications par email</h4>
                            <p className="text-xs text-gray-600 mt-0.5">Recevez des notifications importantes par email</p>
                        </div>
                        <button
                            onClick={() => setNotificationsEmail(!notificationsEmail)}
                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0 ${
                                notificationsEmail ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                        >
                            <span
                                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                                    notificationsEmail ? 'translate-x-5' : 'translate-x-0.5'
                                }`}
                            />
                        </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <div className="flex-1 pr-3">
                            <h4 className="font-medium text-gray-900 text-sm">Notifications push</h4>
                            <p className="text-xs text-gray-600 mt-0.5">Recevez des notifications instantanées sur votre appareil</p>
                        </div>
                        <button
                            onClick={() => setNotificationsPush(!notificationsPush)}
                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0 ${
                                notificationsPush ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                        >
                            <span
                                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                                    notificationsPush ? 'translate-x-5' : 'translate-x-0.5'
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal pour choisir le canal 2FA */}
            {showModal2FA && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Choisir le canal 2FA</h3>
                            <button
                                onClick={fermerModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-6">
                            Comment souhaitez-vous recevoir vos codes d'authentification à deux facteurs ?
                        </p>
                        
                        <div className="space-y-3">
                            <button
                                onClick={() => activer2FA('email')}
                                className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                            >
                                <Mail className="w-5 h-5 text-blue-600" />
                                <div className="text-left">
                                    <div className="font-medium text-gray-900">Email</div>
                                    <div className="text-xs text-gray-600">Codes envoyés par email</div>
                                </div>
                            </button>
                            
                            <button
                                onClick={() => activer2FA('sms')}
                                className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                            >
                                <MessageSquare className="w-5 h-5 text-blue-600" />
                                <div className="text-left">
                                    <div className="font-medium text-gray-900">SMS</div>
                                    <div className="text-xs text-gray-600">Codes envoyés par SMS</div>
                                </div>
                            </button>
                            
                            <button
                                onClick={() => activer2FA('push')}
                                className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                            >
                                <Smartphone className="w-5 h-5 text-blue-600" />
                                <div className="text-left">
                                    <div className="font-medium text-gray-900">Push</div>
                                    <div className="text-xs text-gray-600">Notifications push sur l'appareil</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}