import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  ArrowLeft,
  UserRound,
  Palette,
  ShieldCheck,
  Sun,
  Moon,
  LogOut,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { getSavedTheme, applyTheme } from "../utils/theme";

function Settings() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChanged"));

    toast.success("Logged out successfully");
    navigate("/login");
  };
  const [theme, setTheme] = useState(getSavedTheme());

  const handleThemeChange = (newTheme) => {
    applyTheme(newTheme);
    setTheme(newTheme);
  };
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Back to Dashboard */}
        <Link
          to="/dashboard"
          className="btn btn-ghost btn-sm mb-6"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-base-content/60 mt-2">
            Manage your Taskly account and preferences.
          </p>
        </div>

        {/* Account Settings */}
        <div className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-2">
              <UserRound className="text-primary" size={24} />
              <div>
                <h2 className="card-title">Account</h2>
                <p className="text-sm text-base-content/60">
                  Manage your account information.
                </p>
              </div>
            </div>

            <Link
              to="/profile"
              className="flex items-center justify-between rounded-lg p-3 hover:bg-base-200 transition"
            >
              <span>View Profile</span>
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="card bg-base-100 shadow-md mb-6">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-2">
              <Palette className="text-primary" size={24} />
              <div>
                <h2 className="card-title">Appearance</h2>
                <p className="text-sm text-base-content/60">
                  Customize how Taskly looks.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 p-3">
              <div className="flex items-center gap-3">
                <Sun size={20} />
                <span>Light / Dark Theme</span>
              </div>

              <span className="badge badge-outline">
                Coming next
              </span>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="text-primary" size={24} />
              <div>
                <h2 className="card-title">Security</h2>
                <p className="text-sm text-base-content/60">
                  Manage your current session.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-error btn-outline mt-2"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;

