import { Edit, Save, User, Mail, Phone, MapPin, FileText } from "lucide-react";
import { UserProfile } from "../../types";

interface ProfilePageProps {
  profile: UserProfile;
  isEditing: boolean;
  onChange: (field: keyof UserProfile, value: string) => void;
  onSave: () => void;
  onEdit: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  profile,
  isEditing,
  onChange,
  onSave,
  onEdit,
}) => (
  <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-8">
    <div className="max-w-4xl mx-auto">
      {/* Header avec gradient */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-t-2xl p-4 sm:p-6 md:p-8 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <User className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Mon Profil</h1>
              <p className="text-green-100 mt-1 text-sm sm:text-base hidden sm:block">Gérez vos informations personnelles</p>
            </div>
          </div>
          <button
            onClick={isEditing ? onSave : onEdit}
            className="flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40 text-sm sm:text-base w-full sm:w-auto justify-center"
          >
            {isEditing ? <Save className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> : <Edit className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />}
            {isEditing ? "Sauvegarder" : "Modifier"}
          </button>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="bg-white rounded-b-2xl shadow-xl border border-gray-100">
        <div className="p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Nom complet */}
            <div className="space-y-2 sm:space-y-3">
              <label className="flex items-center text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                <User className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-green-600" />
                Nom complet
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => onChange("name", e.target.value)}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 text-sm sm:text-base"
                  placeholder="Votre nom complet"
                />
              ) : (
                <div className="bg-gray-50 px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl border-2 border-gray-100">
                  <p className="text-gray-800 font-medium text-sm sm:text-base break-words">{profile.name}</p>
                </div>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2 sm:space-y-3">
              <label className="flex items-center text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-green-600" />
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 text-sm sm:text-base"
                  placeholder="votre@email.com"
                />
              ) : (
                <div className="bg-gray-50 px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl border-2 border-gray-100">
                  <p className="text-gray-800 font-medium text-sm sm:text-base break-all">{profile.email}</p>
                </div>
              )}
            </div>

            {/* Téléphone */}
            <div className="space-y-2 sm:space-y-3">
              <label className="flex items-center text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-green-600" />
                Téléphone
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => onChange("phone", e.target.value)}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 text-sm sm:text-base"
                  placeholder="+33 6 12 34 56 78"
                />
              ) : (
                <div className="bg-gray-50 px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl border-2 border-gray-100">
                  <p className="text-gray-800 font-medium text-sm sm:text-base">{profile.phone}</p>
                </div>
              )}
            </div>

            {/* Adresse */}
            <div className="space-y-2 sm:space-y-3">
              <label className="flex items-center text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-green-600" />
                Adresse
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => onChange("address", e.target.value)}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 text-sm sm:text-base"
                  placeholder="Votre adresse complète"
                />
              ) : (
                <div className="bg-gray-50 px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl border-2 border-gray-100">
                  <p className="text-gray-800 font-medium text-sm sm:text-base break-words">{profile.address}</p>
                </div>
              )}
            </div>
          </div>

          {/* Bio - Section séparée */}
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
            <div className="space-y-2 sm:space-y-3">
              <label className="flex items-center text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-green-600" />
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) => onChange("bio", e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-200 resize-none text-sm sm:text-base"
                  placeholder="Parlez-nous de vous..."
                />
              ) : (
                <div className="bg-gray-50 px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl border-2 border-gray-100">
                  <p className="text-gray-800 leading-relaxed text-sm sm:text-base break-words">{profile.bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer avec actions */}
        {isEditing && (
          <div className="bg-gray-50 px-4 sm:px-6 md:px-8 py-4 sm:py-6 rounded-b-2xl border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={onEdit}
                className="px-4 py-2 sm:px-6 sm:py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors text-sm sm:text-base"
              >
                Annuler
              </button>
              <button
                onClick={onSave}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                Sauvegarder les modifications
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default ProfilePage;