import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface GetData {
  id: string;
  role: string;
  isSuperAdmin: string;
  fullName: string;
}

export const useAdmin = () => {
  const [data, setData] = useState<GetData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const url = `${
      import.meta.env.VITE_Express_API_Backend
    }/api/auth/access-token`;
    const fetchAccessToken = async () => {
      try {
        const response = await axios.get(url, {
          withCredentials: true,
        });

        const { role, isSuperAdmin, fullName, id } = response.data;

        setData({
          id,
          fullName,
          isSuperAdmin,
          role,
        });

        if (isSuperAdmin !== "Admin") {
          navigate("/404");
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error(
            "Error fetching access token:",
            err.response?.data?.message || err.message
          );
        } else {
          console.error("Unexpected error:", err);
        }

        navigate("/404");
      }
    };

    fetchAccessToken();
  }, [navigate]);

  return data;
};
