import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../../components/Logout";

export default function SuperAdmin() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/auth/access-token",
          {
            withCredentials: true,
          }
        );

        console.log("Access Token Data:", response.data);

        const { role, isSuperAdmin } = response.data;

        if (role !== "SuperAdmin" || isSuperAdmin !== "SuperAdmin") {
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

  return (
    <main className="container mx-auto w-full min-h-[calc(100vh)] bg-gray-200 px-8">
      <h1 className="text-3xl font-bold underline">SuperAdmin Page</h1>
      <LogoutButton />
    </main>
  );
}
