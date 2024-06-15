import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
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

import { Button } from "@/components/ui/button";
import { RxDashboard } from "react-icons/rx";
import { SlPeople } from "react-icons/sl";
import { MdOutlineHomeRepairService } from "react-icons/md";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="">
      <nav className="text-gray-800 md:flex flex-col justify-between ">
        {/* Logo and Mobile Menu Button */}
        <div className="flex items-center justify-between md:justify-center p-5">
          <div className="flex items-center space-x-4">
            <Link to=''>
              <img src={ImageLogo} alt="Logo" className="h-8 w-full" />
            </Link>
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
        <div className="hidden md:flex px-5 my-5">
          <div className="flex flex-col">
            <NavigationMenu className="flex flex-col gap-4 items-start">
              <NavigationMenuList className="">
                <NavigationMenuItem className="w-full">
                  <Link to={"/admin"} className="flex gap-2 items-center">
                    <RxDashboard />
                    Dashboard
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
              <NavigationMenuList>
                <NavigationMenuItem className="w-full">
                  <Link to={"/admin/list-pengaduan"} className="flex gap-2 items-center">
                    <MdOutlineHomeRepairService />
                    Layanan Aduan
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
              <NavigationMenuList>
                <NavigationMenuItem className="w-full">
                  <Link to={"/admin/list-pelanggan"} className="flex gap-2 items-center">
                    <SlPeople />
                    Data Pelanggan
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
              <NavigationMenuList className="bg-foreground hover:bg-muted-foreground text-white mx-3 mt-10">
                <NavigationMenuItem>Logout</NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* <div className="hidden md:flex flex-grow items-center justify-between px-5">
          
        </div> */}

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden z-10 flex flex-col items-start space-y-2 px-5 pb-5">
            <Link
              to="/admin"
              className="w-full px-4 py-2 hover:bg-gray-400 hover:text-white rounded-md"
            >
              Beranda
            </Link>
            <Link
              to="/admin/list-pengaduan"
              className="w-full px-4 py-2 hover:bg-gray-400 hover:text-white rounded-md"
            >
              Layanan Aduan
            </Link>
            <Link
              to="/admin/list-pelanggan"
              className="w-full px-4 py-2 hover:bg-gray-400 hover:text-white rounded-md"
            >
              Data Pelanggan
            </Link>

            <Link
              to="/login"
              className="w-full px-4 py-2 hover:bg-gray-400 hover:text-white rounded-md"
            >
              Logout
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
