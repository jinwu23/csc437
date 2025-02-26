import { useState } from "react";
import { Link } from "react-router";

import { UserType } from "../types";

import { Eye, EyeOff, Edit2 } from "lucide-react";

type EditingStateType = {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  password: boolean;
};

function Profile() {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<EditingStateType>({
    firstName: false,
    lastName: false,
    email: false,
    password: false
  });

  const [userData, setUserData] = useState<UserType>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "password",
    totalHours: 24,
    totalEvents: 8
  });

  const handleEdit = (field: keyof UserType, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleEdit = (field: keyof EditingStateType) => {
    setIsEditing(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="bg-primary min-h-screen">
      <div className="flex flex-col items-center px-4">
        <h1 className="mt-8 mb-6 text-4xl text-dark-text font-semibold">Profile</h1>
        
        {/* User Information */}
        <div className="bg-secondary p-8 rounded-lg shadow-lg w-full max-w-md mb-8">
          <h2 className="text-2xl font-semibold text-center mb-6">User Information</h2>
          
          {/* First Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-dark-text mb-1">First Name</label>
            <div className="flex items-center">
              {isEditing.firstName ? (
                <input
                  type="text"
                  value={userData.firstName}
                  onChange={(e) => handleEdit("firstName", e.target.value)}
                  className="p-2 flex-1 border rounded-md mr-2"
                />
              ) : (
                <span className="p-2 flex-1">{userData.firstName}</span>
              )}
              <button
                onClick={() => toggleEdit("firstName")}
                className="p-2 text-dark-text"
              >
                <Edit2 size={18} />
              </button>
            </div>
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-dark-text mb-1">Last Name</label>
            <div className="flex items-center">
              {isEditing.lastName ? (
                <input
                  type="text"
                  value={userData.lastName}
                  onChange={(e) => handleEdit("lastName", e.target.value)}
                  className="p-2 flex-1 border rounded-md mr-2"
                />
              ) : (
                <span className="p-2 flex-1">{userData.lastName}</span>
              )}
              <button
                onClick={() => toggleEdit("lastName")}
                className="p-2 text-dark-text"
              >
                <Edit2 size={18} />
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-dark-text mb-1">Email</label>
            <div className="flex items-center">
              {isEditing.email ? (
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => handleEdit("email", e.target.value)}
                  className="p-2 flex-1 border rounded-md mr-2"
                />
              ) : (
                <span className="p-2 flex-1">{userData.email}</span>
              )}
              <button
                onClick={() => toggleEdit("email")}
                className="p-2 text-dark-text"
              >
                <Edit2 size={18} />
              </button>
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-dark-text mb-1">Password</label>
            <div className="flex items-center">
              {isEditing.password ? (
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={userData.password}
                  onChange={(e) => handleEdit("password", e.target.value)}
                  className="p-2 flex-1 border rounded-md mr-2"
                />
              ) : (
                <span className="p-2 flex-1">{passwordVisible ? userData.password : "********"}</span>
              )}
              <button
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="p-2 text-dark-text mr-2"
              >
                {passwordVisible ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
              <button
                onClick={() => toggleEdit("password")}
                className="p-2 text-dark-text"
              >
                <Edit2 size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-secondary p-8 rounded-lg shadow-lg w-full max-w-md mb-8">
          <h2 className="text-2xl font-semibold text-center mb-6">Your Impact</h2>
          <div className="grid grid-cols-2 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-dark-text">{userData.totalHours}</p>
              <p className="text-sm text-gray-600">Total Hours</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-dark-text">{userData.totalEvents}</p>
              <p className="text-sm text-gray-600">Events Attended</p>
            </div>
          </div>
        </div>

        {/* Past Events Button */}
        <Link
          to="/past-events"
          className="bg-background-dark text-light-text px-6 py-3 rounded-md mb-16"
        >
          View Past Events
        </Link>
      </div>
    </div>
  );
}

export default Profile;

