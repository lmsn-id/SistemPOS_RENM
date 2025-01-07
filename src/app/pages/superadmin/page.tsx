import { useLocation, Outlet } from "react-router-dom";
import SidebarSuperAdmin from "@/app/components/SuperAdmin/SidebarSA";
import { useSuperAdmin } from "@/app/hook/useSuperAdmin";

export default function SuperAdmin() {
  useSuperAdmin();

  const location = useLocation();
  const isSuperAdminHome =
    location.pathname === "/superadmin/" || location.pathname === "/superadmin";

  return (
    <SidebarSuperAdmin>
      <main className=" w-full min-h-[calc(100vh-4.1rem)] bg-gray-100 text-gray-900 p-8 ">
        {isSuperAdminHome ? (
          <>
            <h1 className="text-3xl font-bold underline">SuperAdmin Page</h1>
          </>
        ) : (
          <Outlet />
        )}
      </main>
    </SidebarSuperAdmin>
  );
}
