import { useLocation, useNavigate } from "react-router-dom";

export default function Menu() {
  const Location = useLocation();
  const baseUrl = Location.pathname;
  const navigate = useNavigate();

  const handleAddMenu = () => {
    navigate(`${baseUrl}/add-menu`);
  };
  return (
    <>
      <section className="w-full bg-white rounded-2xl shadow-md">
        <div className="p-6">
          <div className="w-full flex justify-center mb-4">
            <h1 className="text-gray-900 text-lg font-semibold">
              Tabel Menu Produk
            </h1>
          </div>

          <div className="header">
            <div className="w-full flex justify-between mb-4 items-center">
              <div className="sortir flex gap-4">
                <select
                  name="sortByMenu"
                  id="sortByMenu"
                  className="p-2 border rounded-lg bg-[#3a3086] text-white w-36"
                  defaultValue={""}
                >
                  <option value="" disabled>
                    Sort By Menu
                  </option>
                  <option value="">All</option>
                </select>
              </div>
              <div className="add">
                <button
                  onClick={handleAddMenu}
                  className="p-2 border rounded-lg bg-[#3a3086] text-white"
                >
                  Add Menu
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-gray-600">
              <thead className="bg-gray-200 text-gray-700 uppercase text-xs font-medium">
                <tr>
                  <th className="px-6 py-3 border-b border-gray-300 text-center text-lg">
                    No
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 text-center text-lg">
                    Nama
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 text-center text-lg">
                    Harga
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 text-center text-lg">
                    Aktive
                  </th>
                  <th className="px-6 py-3 border-b border-gray-300 flex justify-center text-lg">
                    Aksi
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
