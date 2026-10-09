
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  UserRound,
  Mail,
  ArrowLeft,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";
import axiosInstance from "../utils/axiosInstance";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");
      
      const token = localStorage.getItem("token")
      const response = await axiosInstance.get("/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },

        }
      );
      setUser(response.data.user);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to load your profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link
          to="/dashboard"
          className="btn btn-ghost btn-sm mb-6"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center gap-4 mb-4">
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-16">
                  <UserRound size={32} />
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-bold">
                  My Profile
                </h1>
                <p className="text-base-content/60">
                  View your account information
                </p>
              </div>
            </div>

            <div className="divider" />

            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <LoaderCircle
                  size={36}
                  className="animate-spin text-primary"
                />
                <p className="text-base-content/60">
                  Loading your profile...
                </p>
              </div>
            ) : error ? (
              <div className="alert alert-error">
                <div className="flex-1">
                  <p>{error}</p>
                </div>

                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={fetchProfile}
                >
                  <RefreshCw size={16} />
                  Retry
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">
                        Full Name
                      </span>
                    </label>

                    <div className="input input-bordered w-full flex items-center gap-3">
                      <UserRound size={18} />
                      <span>{user?.name || "Name unavailable"}</span>
                    </div>
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-semibold">
                        Email Address
                      </span>
                    </label>

                    <div className="input input-bordered w-full flex items-center gap-3">
                      <Mail size={18} />
                      <span>{user?.email || "Email unavailable"}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-base-content/60 mt-4">
                  This information belongs to your Taskly account.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

