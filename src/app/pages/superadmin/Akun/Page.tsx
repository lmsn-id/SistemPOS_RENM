import { useGetDataAkun } from "@/app/hook/useGet";
import { useNavigate, useLocation } from "react-router-dom";

export default function AkunSA() {
  const { FilteredAkun, Roles, handleAddAkun, handleSortByRole, handleDelete } =
    useGetDataAkun();
  const Navigate = useNavigate();

  const Location = useLocation();

  const handleEdit = (id: string) => {
    Navigate(`${Location.pathname}/update/${id}`);
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
                  className="p-2 border rounded-lg bg-[#3a3086] text-white w-36"
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
                {FilteredAkun.map((akun, index) => (
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
                      <button
                        onClick={() => handleDelete(akun.id, akun.FullName)}
                        className="p-2 bg-red-500 text-white rounded-lg"
                      >
                        Hapus
                      </button>
                      <button
                        onClick={() => handleEdit(akun.id)}
                        className="p-2 bg-blue-500 text-white rounded-lg"
                      >
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
