import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

interface Akun {
  id: string;
  Username: string;
  FullName: string;
  Email: string;
  Password: string;
  PhoneNumber: string;
  Alamat: string;
  Role: string;
}

export const useGetDataAkun = () => {
  async function getAllAkun() {
    const url = `${
      import.meta.env.VITE_Express_API_Backend
    }/api/auth/get-all-akun`;

    try {
      const response = await axios.get(url, {
        withCredentials: true,
      });

      if (response && response.status === 200) {
        return response.data;
      } else {
        return [];
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return [];
      } else {
        return [];
      }
    }
  }

  const [DataAkun, setDataAkun] = useState<Akun[]>([]);
  const [FilteredAkun, setFilteredAkun] = useState<Akun[]>([]);
  const [Roles, setRoles] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const baseurl = location.pathname;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllAkun();
      setDataAkun(data);
      setFilteredAkun(data);

      const uniqueRoles = Array.from(
        new Set(data.map((akun: Akun) => akun.Role))
      ) as string[];
      setRoles(uniqueRoles);
    };
    fetchData();
  }, []);

  const handleAddAkun = () => {
    navigate(`${baseurl}/add`);
  };

  const handleSortByRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = e.target.value;
    if (selectedRole === "") {
      setFilteredAkun(DataAkun);
    } else {
      const filtered = DataAkun.filter((akun) => akun.Role === selectedRole);
      setFilteredAkun(filtered);
    }
  };

  return {
    FilteredAkun,
    Roles,
    handleAddAkun,
    handleSortByRole,
  };
};
