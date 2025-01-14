import React, { useEffect, useState } from 'react';
import { User, KeyRound, Shield } from 'lucide-react';

interface UserData {
  firstName: string;
  lastName: string;
  username: string;
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData>({
    firstName: localStorage.getItem('firstname') || 'firstname',
    lastName: localStorage.getItem('lastname') || 'lastname',
    username: localStorage.getItem('username') || 'username',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    // backend logic
    console.log('Saving user data to backend:', userData);
    setIsEditing(false);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // backend logic for password
    console.log('Password update requested');
    setIsChangingPassword(false);
    setPasswords({ current: '', new: '', confirm: '' });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, using local storage values:', userData);
    }
  }, [userData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* User Info Section */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-gray-700">Personal Information</h2>
                </div>

                <form onSubmit={handleSaveChanges} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
                    <input
                      type="text"
                      value={userData.firstName}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setUserData((prev) => ({ ...prev, firstName: e.target.value }))
                      }
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        isEditing ? 'border-gray-300' : 'bg-gray-100 border-gray-200 cursor-not-allowed'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={userData.lastName}
                      readOnly={!isEditing}
                      onChange={(e) =>
                        setUserData((prev) => ({ ...prev, lastName: e.target.value }))
                      }
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        isEditing ? 'border-gray-300' : 'bg-gray-100 border-gray-200 cursor-not-allowed'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
                    <input
                      type="text"
                      value={userData.username}
                      readOnly
                      className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed"
                    />
                  </div>

                  {isEditing ? (
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                    >
                      Edit
                    </button>
                  )}
                </form>
              </div>
            </div>

            {/* Password Section */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <KeyRound className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-gray-700">Password Settings</h2>
                </div>

                {!isChangingPassword ? (
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Change Password
                  </button>
                ) : (
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={passwords.current}
                        onChange={(e) =>
                          setPasswords((prev) => ({ ...prev, current: e.target.value }))
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={passwords.new}
                        onChange={(e) =>
                          setPasswords((prev) => ({ ...prev, new: e.target.value }))
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={passwords.confirm}
                        onChange={(e) =>
                          setPasswords((prev) => ({ ...prev, confirm: e.target.value }))
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                      >
                        Update Password
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsChangingPassword(false);
                          setPasswords({ current: '', new: '', confirm: '' });
                        }}
                        className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
