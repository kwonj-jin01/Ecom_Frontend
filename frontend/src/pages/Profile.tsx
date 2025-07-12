import { useState } from "react";


// Types
import type {  UserProfile } from "../types";
import ProfilePage from "../components/Profil/ProfilePage";

export default function Profile() {
  /* --------------------------- Navigation & State -------------------------- */
  
  const [isEditing, setIsEditing] = useState(false);

  /* ------------------------------ Mocked Data ------------------------------ */
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Alisa Janin",
    email: "alisajanin@gmail.com",
    phone: "+33 5 94 84 56 78",
    address: "Malaysinya Road, Bla bla Sawisyan Oval, 603 Malaysinya...",
    bio: "Cliente premium depuis 2023",
  });

 
 const handleSaveProfile = () => {
    setIsEditing(false);
    console.log("Profile saved:", userProfile);
  };
 
 const handleProfileChange = (field: keyof UserProfile, value: string) => {
    setUserProfile((prev) => ({ ...prev, [field]: value }));
  };

  /* --------------------------------- Render -------------------------------- */
  return (
    <div className="min-h-screen bg-gray-50">
     
      <ProfilePage
            profile={userProfile}
            isEditing={isEditing}
            onChange={handleProfileChange}
            onSave={handleSaveProfile}
            onEdit={() => setIsEditing(true)}
          />
    </div>
  );
}
