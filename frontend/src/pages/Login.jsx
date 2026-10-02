import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {
      email: "",
      password: "",
    };

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        newErrors.email = "Enter a valid email";
      }
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    // Stop if there are errors
    if (newErrors.email || newErrors.password) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:2001/api/auth/login", {
        email, password
      }
    )
    const token =response.data.token
    localStorage.setItem("token",token)
      console.log(response.data)
      toast.success("Login Successfull")

    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("Invalid email or password")

      } else {
        toast.error("Login Failed")
      }
      console.log(error)
    } finally {
      setLoading(false);
    }
setEmail("")
setPassword("")
    


  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="text-3xl font-bold text-primary"
          >
            Taskly
          </Link>

          <p className="mt-2 text-base-content/70">
            Welcome back! Please login to your account.
          </p>
        </div>

        {/* Login Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">

            <h1 className="text-2xl font-bold text-center">
              Login
            </h1>

            <form
              onSubmit={handleSubmit}
              noValidate
            >

              {/* Email */}
              <fieldset className="fieldset mt-4">
                <label className="fieldset-legend">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`input w-full ${errors.email ? "input-error" : ""
                    }`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);

                    // Remove error when user starts correcting
                    setErrors({
                      ...errors,
                      email: "",
                    });
                  }}
                />

                {errors.email && (
                  <p className="text-error text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </fieldset>

              {/* Password */}
              <fieldset className="fieldset">
                <label className="fieldset-legend">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`input w-full pr-12 ${errors.password ? "input-error" : ""
                      }`}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);

                      // Remove error when user starts correcting
                      setErrors({
                        ...errors,
                        password: "",
                      });
                    }}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-primary"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-error text-sm mt-1">
                    {errors.password}
                  </p>
                )}
              </fieldset>

              {/* Login Button */}
              <button
                type="submit"
                className="btn btn-primary w-full mt-4"
                disabled={loading}
              >
                {loading ? (<> <span className="loading loading-spinner loading-sm"></span>
                  Logging in...</>) : "Login"}
              </button>

            </form>

            {/* Register Link */}
            <p className="text-center text-sm text-base-content/70 mt-4">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary font-semibold hover:underline"
              >
                Register
              </Link>
            </p>

          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-sm text-base-content/60 hover:text-primary"
          >
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;
