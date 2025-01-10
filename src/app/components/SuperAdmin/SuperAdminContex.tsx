import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDataFromAPI } from "@/app/utils/getUserDataFromAPI";

interface UserData {
  id: string;
  role: string;
  isSuperAdmin: string;
  fullName: string;
}

interface SuperAdminContextProps {
  userData: UserData | null;
  loading: boolean;
}

const SuperAdminContext = createContext<SuperAdminContextProps | undefined>(
  undefined
);

export const SuperAdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserDataFromAPI();
        setUserData(userData);

        if (
          userData.role !== "SuperAdmin" &&
          userData.isSuperAdmin !== "SuperAdmin"
        ) {
          navigate("/404");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        navigate("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <SuperAdminContext.Provider value={{ userData, loading }}>
      {children}
    </SuperAdminContext.Provider>
  );
};

export const useSuperAdmin = () => {
  const context = useContext(SuperAdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
