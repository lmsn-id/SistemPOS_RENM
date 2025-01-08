import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard, MdRestaurantMenu } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { RiSettings4Line } from "react-icons/ri";
import { FaUserTie } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import icon from "@/assets/Logo.jpeg";
import { useLocation } from "react-router-dom";
import LogoutButton from "../Logout";
import { useAdmin } from "@/app/hook/useAdmin";

interface SidebarAdminProps {
  children: React.ReactNode;
}

export default function SidebarAdmin({ children }: SidebarAdminProps) {
  const location = useLocation();
  const baseurl = location.pathname.split("/")[1];
  const basePath = `/${baseurl}`;
  const userData = useAdmin();

  const menus = [
    { name: "Dashboard", link: `${basePath}`, icon: MdOutlineDashboard },
    { name: "Laporan", link: `${basePath}/laporan`, icon: TbReportSearch },
    { name: "Menu", link: `${basePath}/menu`, icon: MdRestaurantMenu },
    { name: "Setting", link: `${basePath}/settings`, icon: RiSettings4Line },
  ];

  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
        setDropdownOpen2(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen">
        <aside
          className={`bg-gradient-to-b from-blue-500 to-blue-700 text-white min-h-screen ${
            open ? "md:w-72" : "w-16"
          } ${isMobile ? "fixed z-50" : "relative"} ${
            open && isMobile
              ? "translate-x-0 w-52"
              : isMobile
              ? "-translate-x-full"
              : ""
          } transition-all duration-500 shadow-xl text-gray-600 p-2 md:p-4`}
        >
          <div className="flex flex-col justify-between h-full">
            <section>
              <div
                style={{ transitionDelay: `300ms` }}
                className={`whitespace-pre duration-500 gap-5 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                <Link to="/" className={`flex items-center flex-col gap-2`}>
                  <img src={icon} className="w-10 rounded-full" alt="Logo" />
                  <h2>Admin</h2>
                </Link>
              </div>

              <div className="mt-4 flex flex-col gap-4 relative">
                {menus.map((menu, i) => (
                  <Link
                    to={menu.link}
                    key={i}
                    className={`group flex items-center text-sm gap-3.5 font-medium p-2 rounded-md ${
                      isActive(menu.link)
                        ? "bg-gray-300 text-gray-900"
                        : "hover:bg-gray-300 hover:text-gray-900"
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
                  </Link>
                ))}
              </div>
            </section>

            <div
              className={` ${
                isMobile ? "fixed left-0 w-full" : ""
              } bg-gradient-to-tb from-blue-500 to-blue-700 text-white`}
              style={{ bottom: isMobile ? "0" : "auto" }}
            >
              <div
                className={` flex flex-col items-start text-sm font-medium hover:bg-gray-300 rounded-md cursor-pointer ${
                  open ? "gap-3.5 p-2" : "justify-center"
                }`}
              >
                <div
                  className=" flex justify-between gap-1 items-center w-full"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <div className=" flex gap-3 items-center">
                    <div className="bg-green-600 rounded-full p-2">
                      <FaUserTie className="text-white" size={20} />
                    </div>
                    {open && (
                      <div
                        className={`whitespace-pre duration-500  ${
                          !open && "opacity-0 translate-x-28 overflow-hidden"
                        }`}
                      >
                        <h2
                          className={` ${
                            dropdownOpen ? "text-gray-900" : "text-white"
                          } `}
                        >
                          {userData?.isSuperAdmin}
                        </h2>
                      </div>
                    )}
                  </div>

                  {open && (
                    <IoIosArrowForward
                      className={`${
                        dropdownOpen
                          ? "rotate-90 duration-200 text-gray-900"
                          : "rotate-0 duration-200 text-white"
                      }`}
                      size={18}
                    />
                  )}
                </div>

                {dropdownOpen && (
                  <div
                    className="flex flex-col mt-2 w-full bg-white rounded shadow-md z-50"
                    ref={dropdownRef}
                  >
                    <ul className="text-sm text-gray-800 w-full">
                      <li className="border-b hover:bg-gray-100">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 hover:bg-gray-400 font-semibold"
                        >
                          Profile
                        </Link>
                      </li>

                      <li>
                        <div className="flex px-4 py-2 hover:bg-gray-400 font-semibold">
                          <LogoutButton className="w-full text-start" />
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>

        <div className="w-full min-h-screen bg-gray-100">
          <nav className="bg-gray-200  px-4 py-3 border-b-2 border-gray-300 shadow-2xl">
            <ul className="flex items-center justify-between md:flex-row-reverse">
              <li className="text-sm md:mx-20 flex justify-center items-center gap-5 relative">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setDropdownOpen2(!dropdownOpen)}
                >
                  <div className="bg-green-600 rounded-full p-2">
                    <FaUserTie className="text-white" size={25} />
                  </div>
                  <div>
                    <h4 className="font-semibold">{userData?.isSuperAdmin}</h4>
                    <p className="text-xs hidden sm:block">{userData?.role}</p>
                  </div>
                  <IoIosArrowForward
                    className={`${
                      dropdownOpen2
                        ? "rotate-90 duration-200"
                        : "rotate-0 duration-200"
                    }`}
                    size={18}
                  />
                </div>

                {dropdownOpen2 && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-14 left-2 md:left-1/2 transform md:-translate-x-1/2 mt-2 w-48 bg-white rounded shadow-md z-50"
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
                  size={26}
                  className="cursor-pointer"
                  onClick={() => setOpen(!open)}
                />
              </li>
            </ul>
          </nav>
          {children}
        </div>

        {open && isMobile && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setOpen(false)}
          ></div>
        )}
      </div>
    </>
  );
}
SidebarAdmin.propTypes = {
  children: PropTypes.node.isRequired,
};
