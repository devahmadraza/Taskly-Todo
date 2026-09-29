import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios"
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

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
    } else {
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

      if (!passwordRegex.test(password)) {
        newErrors.password =
          "Password must be 8+ characters with 1 uppercase, 1 number & 1 special character";
      }
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    // Stop if there are validation errors
    if (
      newErrors.name ||
      newErrors.email ||
      newErrors.password ||
      newErrors.confirmPassword
    ) {
      return;
    }

    // Validation passed
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await axios.post(
        "http://localhost:2001/api/auth/register", {
        name,
        email,
        password,
      })
      console.log(response.data)
      toast.success("Account Created Successfully")
setName("")
setEmail("")
setPassword("")
setConfirmPassword("")

    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("Email already exists");
      } else {
        toast.error("Registration failed");
      }

      console.log(error);
    }
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
            Create your Taskly account.
          </p>
        </div>

        {/* Register Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">

            <h1 className="text-2xl font-bold text-center">
              Create Account
            </h1>

            <form onSubmit={handleSubmit} noValidate>

              {/* Name */}
              <fieldset className="fieldset mt-4">
                <label className="fieldset-legend">
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className={`input w-full ${errors.name ? "input-error" : ""
                    }`}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);

                    setErrors({
                      ...errors,
                      name: "",
                    });
                  }}
                />

                {errors.name && (
                  <p className="text-error text-sm mt-1">
                    {errors.name}
                  </p>
                )}
              </fieldset>

              {/* Email */}
              <fieldset className="fieldset">
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
                    placeholder="Create a password"
                    className={`input w-full pr-12 ${errors.password ? "input-error" : ""
                      }`}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);

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

              {/* Confirm Password */}
              <fieldset className="fieldset">
                <label className="fieldset-legend">
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    type={
                      showConfirmPassword ? "text" : "password"
                    }
                    placeholder="Confirm your password"
                    className={`input w-full pr-12 ${errors.confirmPassword
                      ? "input-error"
                      : ""
                      }`}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);

                      setErrors({
                        ...errors,
                        confirmPassword: "",
                      });
                    }}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-primary"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="text-error text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </fieldset>

              {/* Register Button */}
              <button
                type="submit"
                className="btn btn-primary w-full mt-4"
              >
                Create Account
              </button>

            </form>

            {/* Login Link */}
            <p className="text-center text-sm text-base-content/70 mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-semibold hover:underline"
              >
                Login
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

export default Register;
