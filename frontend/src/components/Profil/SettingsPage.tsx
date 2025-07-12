import React, { useState } from "react";
import { 
  ChevronRight, 
  Settings, 
  Bell, 
  Shield, 
  User, 
  Globe, 
  Moon, 
  Sun,
  Download,
  Trash2,
  Key,
  Smartphone,
  Mail,
  MessageSquare,
  Eye,
  Save,
  AlertTriangle,
  Check
} from "lucide-react";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false,
    dataUsage: true
  });

  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('fr');
  const [saved, setSaved] = useState(false);

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const ToggleSwitch = ({ checked, onChange, disabled = false }: { checked: boolean; onChange: (value: boolean) => void; disabled?: boolean }) => (
    <button
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
        checked ? 'bg-green-600' : 'bg-gray-300'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      disabled={disabled}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const SectionCard = ({ title, icon: Icon, children, className = "" }: { title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode; className?: string }) => (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden ${className}`}>
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="bg-green-100 p-2 rounded-lg mr-3">
            <Icon className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );

  const SettingItem = ({ 
    label, 
    description, 
    children, 
    action,
    danger = false 
  }: { 
    label: string; 
    description?: string; 
    children?: React.ReactNode; 
    action?: () => void;
    danger?: boolean;
  }) => (
    <div className={`p-4 rounded-lg border transition-all duration-200 ${
      danger 
        ? 'border-red-200 bg-red-50 hover:bg-red-100' 
        : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className={`font-medium ${danger ? 'text-red-900' : 'text-gray-900'}`}>
            {label}
          </div>
          {description && (
            <div className={`text-sm mt-1 ${danger ? 'text-red-600' : 'text-gray-600'}`}>
              {description}
            </div>
          )}
        </div>
        <div className="flex items-center">
          {children}
          {action && (
            <button onClick={action} className="ml-3">
              <ChevronRight className={`w-4 h-4 ${danger ? 'text-red-400' : 'text-gray-400'}`} />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Settings className="w-8 h-8 mr-3" />
              <div>
                <h1 className="text-3xl font-bold">Paramètres</h1>
                <p className="text-green-100 mt-1">Gérez vos préférences et votre compte</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              className={`bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center ${
                saved ? 'bg-white/30' : ''
              }`}
            >
              {saved ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Sauvegardé
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Sauvegarder
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Notifications */}
          <SectionCard title="Notifications" icon={Bell}>
            <div className="space-y-4">
              <SettingItem
                label="Notifications par email"
                description="Recevez des mises à jour par email"
              >
                <ToggleSwitch
                  checked={notifications.email}
                  onChange={(value) => handleNotificationChange('email', value)}
                />
              </SettingItem>

              <SettingItem
                label="Notifications push"
                description="Notifications sur votre appareil"
              >
                <ToggleSwitch
                  checked={notifications.push}
                  onChange={(value) => handleNotificationChange('push', value)}
                />
              </SettingItem>

              <SettingItem
                label="Notifications SMS"
                description="Messages importants par SMS"
              >
                <ToggleSwitch
                  checked={notifications.sms}
                  onChange={(value) => handleNotificationChange('sms', value)}
                />
              </SettingItem>

              <SettingItem
                label="Marketing"
                description="Offres spéciales et promotions"
              >
                <ToggleSwitch
                  checked={notifications.marketing}
                  onChange={(value) => handleNotificationChange('marketing', value)}
                />
              </SettingItem>

              <SettingItem
                label="Partage des données d'utilisation"
                description="Aide à améliorer nos services"
              >
                <ToggleSwitch
                  checked={notifications.dataUsage}
                  onChange={(value) => handleNotificationChange('dataUsage', value)}
                />
              </SettingItem>
            </div>
          </SectionCard>

          {/* Sécurité */}
          <SectionCard title="Sécurité" icon={Shield}>
            <div className="space-y-4">
              <SettingItem
                label="Changer le mot de passe"
                description="Modifiez votre mot de passe actuel"
                action={() => console.log('Change password')}
              >
                <Key className="w-5 h-5 text-gray-500" />
              </SettingItem>

              <SettingItem
                label="Authentification à deux facteurs"
                description="Sécurisez votre compte avec 2FA"
                action={() => console.log('Setup 2FA')}
              >
                <Smartphone className="w-5 h-5 text-gray-500" />
              </SettingItem>

              <SettingItem
                label="Sessions actives"
                description="Gérez vos connexions actives"
                action={() => console.log('Manage sessions')}
              >
                <Globe className="w-5 h-5 text-gray-500" />
              </SettingItem>

              <SettingItem
                label="Historique de connexion"
                description="Consultez vos dernières connexions"
                action={() => console.log('View login history')}
              >
                <Eye className="w-5 h-5 text-gray-500" />
              </SettingItem>
            </div>
          </SectionCard>

          {/* Préférences */}
          <SectionCard title="Préférences" icon={User}>
            <div className="space-y-4">
              <SettingItem
                label="Mode sombre"
                description="Basculer vers le thème sombre"
              >
                <div className="flex items-center">
                  {darkMode ? (
                    <Moon className="w-5 h-5 text-gray-500 mr-3" />
                  ) : (
                    <Sun className="w-5 h-5 text-gray-500 mr-3" />
                  )}
                  <ToggleSwitch
                    checked={darkMode}
                    onChange={setDarkMode}
                  />
                </div>
              </SettingItem>

              <SettingItem
                label="Langue"
                description="Choisissez votre langue préférée"
              >
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="de">Deutsch</option>
                </select>
              </SettingItem>

              <SettingItem
                label="Affichage compact"
                description="Interface plus dense"
              >
                <ToggleSwitch
                  checked={false}
                  onChange={() => {}}
                />
              </SettingItem>
            </div>
          </SectionCard>

          {/* Compte */}
          <SectionCard title="Compte" icon={User}>
            <div className="space-y-4">
              <SettingItem
                label="Informations personnelles"
                description="Modifiez vos informations de profil"
                action={() => console.log('Edit profile')}
              >
                <User className="w-5 h-5 text-gray-500" />
              </SettingItem>

              <SettingItem
                label="Adresses"
                description="Gérez vos adresses de livraison"
                action={() => console.log('Manage addresses')}
              >
                <Globe className="w-5 h-5 text-gray-500" />
              </SettingItem>

              <SettingItem
                label="Moyens de paiement"
                description="Cartes et comptes bancaires"
                action={() => console.log('Payment methods')}
              >
                <Globe className="w-5 h-5 text-gray-500" />
              </SettingItem>

              <SettingItem
                label="Exporter mes données"
                description="Téléchargez une copie de vos données"
                action={() => console.log('Export data')}
              >
                <Download className="w-5 h-5 text-gray-500" />
              </SettingItem>

              <SettingItem
                label="Supprimer le compte"
                description="Action irréversible - supprime définitivement votre compte"
                action={() => console.log('Delete account')}
                danger={true}
              >
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                  <Trash2 className="w-5 h-5 text-red-500" />
                </div>
              </SettingItem>
            </div>
          </SectionCard>

          {/* Support */}
          <SectionCard title="Support" icon={MessageSquare} className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SettingItem
                label="Centre d'aide"
                description="FAQ et guides d'utilisation"
                action={() => console.log('Help center')}
              >
                <MessageSquare className="w-5 h-5 text-gray-500" />
              </SettingItem>

              <SettingItem
                label="Contacter le support"
                description="Obtenez de l'aide personnalisée"
                action={() => console.log('Contact support')}
              >
                <Mail className="w-5 h-5 text-gray-500" />
              </SettingItem>

              <SettingItem
                label="Signaler un problème"
                description="Rapportez un bug ou un dysfonctionnement"
                action={() => console.log('Report issue')}
              >
                <AlertTriangle className="w-5 h-5 text-gray-500" />
              </SettingItem>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;