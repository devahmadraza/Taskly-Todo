import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-primary-200 mt-10 ">
      <div className="max-w-6xl mx-auto px-4 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-bold text-primary">
              Taskly
            </Link>

            <p className="mt-3 text-base-content/70 max-w-sm">
              Simple task management to help you stay organized
              and get things done.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-3">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-base-content/70 hover:text-primary"
              >
                Home
              </Link>

              <Link
                to="/login"
                className="text-base-content/70 hover:text-primary"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-base-content/70 hover:text-primary"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-lg mb-3">
              Product
            </h3>

            <div className="flex flex-col gap-2">
              <Link
                to="/dashboard"
                className="text-base-content/70 hover:text-primary"
              >
                Dashboard
              </Link>

              <Link
                to="/settings"
                className="text-base-content/70 hover:text-primary"
              >
                Settings
              </Link>

              <Link
                to="/profile"
                className="text-base-content/70 hover:text-primary"
              >
                Profile
              </Link>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-base-300 mt-10 pt-6 text-center">
          <p className="text-sm text-base-content/60">
            © {new Date().getFullYear()} Taskly. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;