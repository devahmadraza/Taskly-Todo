import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);

      const response = await axiosInstance.post(
        "/auth/forgot-password",
        { email: email.trim() }
      );

      toast.success(
        response.data.message || "Password reset request submitted"
      );

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to process your request. Please try again."
      );
      console.error("Forgot password error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-primary">
            Taskly
          </Link>

          <p className="mt-2 text-base-content/70">
            Reset your password
          </p>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="text-2xl font-bold text-center">
              Forgot Password?
            </h1>

            <p className="text-sm text-base-content/70 text-center mt-2">
              Enter your registered email address to request a password
              reset link.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <fieldset className="fieldset mt-4">
                <label className="fieldset-legend">Email</label>

                <input
                  type="email"
                  placeholder="Enter your registered email"
                  className="input w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </fieldset>

              <button
                type="submit"
                className="btn btn-primary w-full mt-4"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>

            <p className="text-center text-sm mt-4">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-primary font-semibold hover:underline"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
