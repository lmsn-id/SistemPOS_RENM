import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../../service/ApiBackend";
import axios from "axios";

interface Akun {
  id: string;
  FullName: string;
  Email: string;
  Password: string;
  PhoneNumber: string;
  Alamat: string;
  Role: string;
}

async function getAllAkun() {
  const { ApiBackend } = api();
  const url = ApiBackend("/api/auth/get-all-akun");

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

export default function AkunSA() {
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

  return (
    <>
      <div className="w-full bg-white rounded-2xl shadow-md">
        <div className="p-6">
          <div className="w-full flex justify-center mb-4">
            <h1 className="text-gray-900 text-lg font-semibold">Tabel Akun</h1>
          </div>

          <div className="header">
            <div className="w-full flex justify-between mb-4 items-center">
              <div className="sortir flex gap-4">
                <select
                  name="sortByToko"
                  id="sortByToko"
                  className="p-2 border rounded-lg bg-[#3a3086] text-white"
                  defaultValue={""}
                  onChange={handleSortByRole}
                >
                  <option value="" disabled>
                    Sort By Toko
                  </option>
                  <option value="">All</option>
                  {Roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div className="add">
                <button
                  onClick={handleAddAkun}
                  className="p-2 border rounded-lg bg-[#3a3086] text-white"
                >
                  Add Akun
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-gray-600">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-medium">
                <tr>
                  <th className="px-6 py-3 border-b border-gray-300 text-center text-lg">
                    No
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 text-center text-lg">
                    Nama
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 text-center text-lg">
                    Email
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 text-center text-lg">
                    Role
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 flex justify-center text-lg">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {FilteredAkun.map((akun: Akun, index: number) => (
                  <tr key={akun.id} className="border-b border-gray-300">
                    <td className="px-6 py-3 text-center font-semibold text-lg">
                      {index + 1}
                    </td>
                    <td className="px-6 py-3 text-center font-semibold text-lg">
                      {akun.FullName}
                    </td>
                    <td className="px-6 py-3 text-center font-semibold text-lg">
                      {akun.Email}
                    </td>
                    <td className="px-6 py-3 text-center font-semibold text-lg">
                      {akun.Role}
                    </td>
                    <td className="px-6 py-3 text-center font-semibold text-lg space-x-6">
                      <button className="p-2 bg-red-500 text-white rounded-lg">
                        Hapus
                      </button>
                      <button className="p-2 bg-blue-500 text-white rounded-lg">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
