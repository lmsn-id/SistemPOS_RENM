import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
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
  const [refresh, setRefresh] = useState(0);

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
  }, [refresh]);

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

  const handleDelete = async (id: string, FullName: string) => {
    const result = await Swal.fire({
      title: "Konfirmasi Hapus",
      text: `Apakah Anda yakin ingin menghapus Data Akun ${FullName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        const url = `${
          import.meta.env.VITE_Express_API_Backend
        }/api/auth/delete-akun/${id}`;

        const response = await axios.delete(url, {
          withCredentials: true,
        });

        if (response.status === 200) {
          await Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Data Berhasil dihapus",
          });
          setRefresh((prevKey) => prevKey + 1);
        }
      } catch (err) {
        console.error(err);
        await Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Data gagal dihapus",
        });
      }
    }
  };

  return {
    FilteredAkun,
    Roles,
    handleAddAkun,
    handleDelete,
    handleSortByRole,
  };
};
