import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard, MdAccountBalance } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { FaUserTie } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import icon from "@/assets/Logo.jpeg";
import { useLocation } from "react-router-dom";
import LogoutButton from "../Logout";
import { useSuperAdmin } from "../../hook/useSuperAdmin";

interface SidebarSuperAdminProps {
  children: React.ReactNode;
}

export default function SidebarSuperAdmin({
  children,
}: SidebarSuperAdminProps) {
  const location = useLocation();
  const baseurl = location.pathname.split("/")[1];
  const basePath = `/${baseurl}`;
  const userData = useSuperAdmin();

  const menus = [
    { name: "Dashboard", link: `${basePath}/`, icon: MdOutlineDashboard },
    {
      name: "Akun",
      link: `${basePath}/akun`,
      icon: MdAccountBalance,
    },
    { name: "Setting", link: `${basePath}/settings`, icon: RiSettings4Line },
  ];

  const [open, setOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <main className="flex relative m-0 font-sans antialiased font-normal text-lg leading-default bg-gray-200 text-white h-screen overflow-hidden">
      <aside
        className={`bg-gradient-to-b from-blue-500 to-blue-700 min-h-screen shadow-lg mt-16 md:mt-0 border-r border-black ${
          open
            ? " translate-x-0 w-56 md:w-72"
            : "-translate-x-16 md:translate-x-0 w-16"
        } duration-500 text-white px-4 fixed z-50 md:relative md:z-auto`}
      >
        <div className="py-3 flex justify-center items-center">
          <div
            style={{ transitionDelay: `300ms` }}
            className={`whitespace-pre duration-500 flex flex-col items-center gap-5 ${
              !open && "opacity-0 translate-x-28 overflow-hidden"
            }`}
          >
            <Link to="/">
              <img src={icon} className="w-10 rounded-full" alt="" />
            </Link>
            <h2>Super Admin POS</h2>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4 relative transition-all duration-500 snap-y">
          {menus.map((menu, i) => (
            <Link
              to={menu.link}
              key={i}
              className={`group flex items-center text-sm gap-3.5 font-medium p-2 rounded-md ${
                isActive(menu.link)
                  ? "bg-[#6495ed] text-gray-900"
                  : "hover:bg-[#6495ed]"
              }`}
            >
              <div>{React.createElement(menu.icon, { size: "20" })}</div>
              <h2
                style={{ transitionDelay: `${i + 3}00ms` }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>
      </aside>
      <div className="flex w-full h-full">
        <section className="flex-grow overflow-auto">
          <nav className="bg-gray-100 shadow-lg w-full border-b border-black">
            <ul className="flex items-center md:flex-row-reverse justify-between p-3 text-gray-900">
              <li className="text-sm md:mx-20 flex justify-center items-center gap-5 relative">
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-full p-2">
                  <FaUserTie className=" text-white" size={25} />
                </div>
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {userData && (
                    <div>
                      <h4 className="font-semibold">{userData.fullName}</h4>
                      <p className="text-xs">{userData.role}</p>
                    </div>
                  )}

                  <IoIosArrowForward
                    className={`${
                      dropdownOpen
                        ? "rotate-90 duration-200"
                        : "rotate-0 duration-200"
                    }`}
                    size={18}
                  />
                </div>
                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-14 left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded shadow-md z-50"
                  >
                    <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>

                    <ul className="text-sm text-gray-800">
                      <li className="border-b">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 hover:bg-gray-100 font-semibold"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <div className="flex px-4 py-2 hover:bg-gray-100 font-semibold">
                          <LogoutButton className="w-full text-start" />
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
              <li className="text-lg font-semibold">
                <HiMenuAlt3
                  size={open ? 26 : 26}
                  className={`cursor-pointer transition-all duration-500 ${
                    !open && "text-3xl"
                  }`}
                  onClick={() => setOpen(!open)}
                />
              </li>
            </ul>
          </nav>
          {children}
        </section>
      </div>
    </main>
  );
}

SidebarSuperAdmin.propTypes = {
  children: PropTypes.node.isRequired,
};
