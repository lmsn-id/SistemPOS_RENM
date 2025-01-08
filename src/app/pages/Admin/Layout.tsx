import { useAdmin } from "@/app/hook/useAdmin";
import { useLocation, Outlet } from "react-router-dom";
import SidebarAdmin from "@/app/components/Admin/SidebarAdmin";
import Admin from "./Page";

export default function LayoutAdmin() {
  useAdmin();
  const location = useLocation();
  const isSuperAdminHome =
    location.pathname === "/admin/" || location.pathname === "/admin";

  return (
    <SidebarAdmin>
      <main className=" w-full min-h-[calc(100vh-4.1rem)] bg-gray-100 text-gray-900 ">
        {isSuperAdminHome ? (
          <>
            <Admin />
          </>
        ) : (
          <Outlet />
        )}
      </main>
    </SidebarAdmin>
  );
}
