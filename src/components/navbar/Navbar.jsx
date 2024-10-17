import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage menu visibility
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("users"));
  const cartItems = useSelector((state) => state.cart);

  const logout = () => {
    localStorage.clear("users");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navList = (
    <ul
      className={`flex flex-col lg:flex-row lg:space-x-6 text-white font-medium text-md px-5 lg:flex ${
        isOpen ? "block" : "hidden"
      }`}
    >
      {/* Home */}
      <li>
        <Link to={"/"} onClick={toggleMenu}>
          Home
        </Link>
      </li>
      {/* All Product */}
      <li>
        <Link to={"/allproduct"} onClick={toggleMenu}>
          All Product
        </Link>
      </li>
      {/* Signup */}
      {!user && (
        <li>
          <Link to={"/signup"} onClick={toggleMenu}>
            Signup
          </Link>
        </li>
      )}
      {/* Login */}
      {!user && (
        <li>
          <Link to={"/login"} onClick={toggleMenu}>
            Login
          </Link>
        </li>
      )}
      {/* User */}
      {user?.role === "user" && (
        <li>
          <Link to={"/user-dashboard"} onClick={toggleMenu}>
            Hello {user.name}
          </Link>
        </li>
      )}
      {/* vendor */}
      {user?.role === "vendor" && (
        <li>
          <Link to={"/vendor-dashboard"} onClick={toggleMenu}>
            Vendor  {user.name}
          </Link>
        </li>
      )}
      {/* Admin */}
      {user?.role === "admin" && (
        <li>
          <Link to={"/admin-dashboard"} onClick={toggleMenu}>
            <b>ADMIN {user.name}</b>
          </Link>
        </li>
      )}
      {/* Logout */}
      {user && (
        <li className="cursor-pointer" onClick={logout}>
          Logout
        </li>
      )}
      {/* Cart */}
      <li>
        <Link to={"/cart"} onClick={toggleMenu}>
          Cart({cartItems.length})
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="bg-pink-600 sticky top-0 z-50">
      <div className="lg:flex lg:justify-between items-center py-3 lg:px-3">
        <div className="left py-3 lg:py-0">
          <Link to={"/"}>
            <h2 className="font-bold text-white text-2xl text-center">
              E-Pharma
            </h2>
          </Link>
        </div>
        <div className="flex justify-between">
          <div className="lg:hidden ml-4">
            <button
              onClick={toggleMenu}
              className="block text-white focus:outline-none"
            >
              <svg
                class="w-6 h-6 text-white dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="M5 7h14M5 12h14M5 17h14"
                />
              </svg>
            </button>
          </div>
          <div className="right flex justify-center items-center mb-4 lg:mb-0">
            {navList}
            <div className="lg:hidden ml-auto mr-4">
              <Link to={"/cart"} className="text-white relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                  />
                </svg>
                <span className="absolute -top-4 -right- rounded-full  text-white p-0 text-xl-10">
                  {cartItems.length}
                </span>
              </Link>
            </div>
          </div>
        </div>
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;
