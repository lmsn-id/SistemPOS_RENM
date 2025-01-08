import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LogoutButton({ className = "" }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const url = `${import.meta.env.VITE_Express_API_Backend}/api/auth/logout`;
    try {
      const response = await axios.post(
        url,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message, {
          onClose: () => {
            navigate(response.data.redirect);
          },
        });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Kesalahan saat logout");
      } else {
        toast.error("Kesalahan tidak terduga");
      }
    }
  };

  return (
    <button className={` ${className}`} onClick={handleLogout}>
      Logout
    </button>
  );
}
