import { useAdmin } from "@/app/components/Admin/AdminContex";
import { Helmet } from "react-helmet-async";
import { useLocation, Outlet } from "react-router-dom";
import SidebarAdmin from "@/app/components/Admin/SidebarAdmin";
import Admin from "./Page";

export default function LayoutAdmin() {
  const { userData } = useAdmin();
  const location = useLocation();
  const isSuperAdminHome =
    location.pathname === "/admin/" || location.pathname === "/admin";

  return (
    <SidebarAdmin>
      <Helmet>
        <title>Lazer Pos || Admin {userData?.role || ""}</title>
      </Helmet>
      <main className="w-full min-h-[calc(100vh-4.1rem)] bg-gray-100 text-gray-900 p-8 ">
        {isSuperAdminHome ? <Admin /> : <Outlet />}
      </main>
    </SidebarAdmin>
  );
}
