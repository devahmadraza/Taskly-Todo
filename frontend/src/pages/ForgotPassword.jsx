import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    // We'll connect the backend email API in a later step.
    toast.success("Email validation successful");
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
                />
              </fieldset>

              <button
                type="submit"
                className="btn btn-primary w-full mt-4"
              >
                Send Reset Link
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

