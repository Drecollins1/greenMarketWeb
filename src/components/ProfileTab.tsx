import React from "react";

interface Props {
  profile: any;
  onSubmit: () => void;
}

const ProfileTab: React.FC<Props> = ({ profile, onSubmit }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Profile</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input defaultValue={profile.firstName} className="input" />
        <input defaultValue={profile.lastName} className="input" />
        <input defaultValue={profile.email} className="input" />
        <input defaultValue={profile.phoneNumber} className="input" />
      </div>

      <button
        onClick={onSubmit}
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg"
      >
        Save Changes
      </button>
    </div>
  );
};

export default ProfileTab;
