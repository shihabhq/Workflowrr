import { useState, useRef, useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { use } from "react"; // React 19's `use` hook
import AuthContext from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logOutUser } = use(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const userIconRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await logOutUser();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        userIconRef.current &&
        !userIconRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className="container mx-auto flex justify-between items-center 
    text-btn py-12  max-w-[90%] lg:max-w-[1280px] relative"
    >
      <h1 className="font-poppins text-2xl sm:text-4xl font-bold">WorkFlowr</h1>
      <div className="relative min-w-20 sm:min-w-42 flex items-center justify-center">
        <FaRegCircleUser
          size={40}
          className="cursor-pointer active:scale-90"
          onClick={toggleDropdown}
          ref={userIconRef}
        />

        {isDropdownOpen && (
          <div
            className="absolute top-12 bg-white shadow-lg rounded-lg p-4 
          sm:min-w-[150px] transform right-1/2 translate-x-1/2"
            ref={dropdownRef}
          >
            {user && (
              <div className="text-gray-800 font-semibold mb-2 text-center">
                {user.displayName || user.email}
              </div>
            )}
            <button
              onClick={handleLogout}
              className="w-full text-center bg-btn text-white cursor-pointer hover:opacity-85 rounded-md px-3 py-2"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
