import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChanged"));
    navigate("/login");
  };
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );
  useEffect(() => {
    const updateAuth = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
    };

    window.addEventListener("authChanged", updateAuth);

    return () => {
      window.removeEventListener("authChanged", updateAuth);
    };
  }, []);
  return (
    <div className="navbar bg-base-100 shadow-sm px-4 md:px-8">
      {/* Logo */}
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-primary">
          Taskly
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-2">

          <li>
            <Link to="/">Home</Link>
          </li>
          {!isLoggedIn ? (<>
            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/register" className="btn btn-primary">
                Get Started
              </Link>
            </li>
          </>
          ) : (
            <>
              <li>
                <button onClick={handleLogout} className="btn btn-primary">
                  Logout
                </button>
              </li>

            </>


          )}



        </ul>
      </div>

      {/* Mobile Menu */}
      <div className="dropdown dropdown-end md:hidden">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle"
        >
          ☰
        </div>

        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-40 p-2 shadow"
        >
          <li>
            <Link to="/">Home</Link>
          </li>

          {!isLoggedIn ? (<>
            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/register" className="btn btn-primary ">
                Get Started
              </Link>
            </li>
          </>
          ) : (
            <>
              <li>
                <button onClick={handleLogout} className="btn btn-primary">
                  Logout
                </button>
              </li>

            </>


          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
