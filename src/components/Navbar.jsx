import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes,  FaChevronDown  } from "react-icons/fa";
import ImageLogo from "@/assets/logo-dbn.png";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="text-gray-800 md:flex justify-between">
      {/* Logo and Mobile Menu Button */}
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center space-x-4">
          <img src={ImageLogo} alt="Logo" className="h-8 w-full" />
        </div>
        <button className="md:hidden flex items-center" onClick={toggleMenu}>
          {isOpen ? (
            <FaTimes className="w-6 h-6 hover:text-gray-500" />
          ) : (
            <FaBars className="w-6 h-6 hover:text-gray-500" />
          )}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center justify-between px-5">
        <div className="flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                  Beranda
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-6">
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  Layanan
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="p-2 rounded-md shadow-lg space-y-2">
                    <li>
                      <Link
                        to={"/pengaduan"}
                        className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                      >
                        Layanan Pengaduan
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/layanan/cek-progres"
                        className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                      >
                        Cek Progres Pengaduan
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuViewport />
          </NavigationMenu>
        </div>
      </div>
      <div className="hidden md:flex items-center justify-between px-5">
          <Link to="/login" className="text-white hover:text-gray-600 bg-gray-800 hover:bg-slate-300 px-5 py-2 rounded-2xl">
            Login
          </Link>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-start space-y-2 px-5 pb-5">
          <Link to="/" className="w-full px-4 py-2 hover:bg-gray-400 hover:text-white rounded-md">
            Beranda
          </Link>
          <div className="w-full">
            <div
              className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-400 hover:text-white rounded-md cursor-pointer"
              onClick={toggleDropdown}
            >
              <span>Layanan</span>
              <FaChevronDown></FaChevronDown>
            </div>
            {isDropdownOpen && (
              <ul className="p-2 rounded-md shadow-lg space-y-2">
                <li>
                  <Link
                    to="/layanan/pengaduan"
                    className="block px-4 py-2 hover:bg-gray-600 hover:text-white rounded-md"
                  >
                    Layanan Pengaduan
                  </Link>
                </li>
                <li>
                  <Link
                    to="/layanan/cek-progres"
                    className="block px-4 py-2 hover:bg-gray-500 hover:text-white rounded-md"
                  >
                    Cek Progres Pengaduan
                  </Link>
                </li>
              </ul>
            )}
          </div>
          <Link
            to="/login"
            className="w-full px-4 py-2 hover:bg-gray-400 hover:text-white rounded-md"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
