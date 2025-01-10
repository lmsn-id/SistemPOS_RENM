import { FaMoneyBillWave, FaChartBar } from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <>
      <section className="">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 place-items-center">
          <div className="p-4 rounded-lg shadow-md text-white bg-gradient-to-r from-blue-400 to-blue-500 flex flex-col justify-between h-full w-72 sm:w-full">
            <div className="flex items-center justify-between mb-2">
              <FaMoneyBillWave className="text-2xl" />
              <div className="text-sm md:text-lg font-semibold">
                Penghasilan
              </div>
            </div>
            <div className="relative mb-2">
              <div className="absolute w-full border-t border-white"></div>
            </div>
            <div className="mt-auto">
              <div className="flex justify-center m-2">
                <div className="flex items-center justify-start gap-3 w-full h-12 rounded-full ">
                  <div className="text-lg md:text-xl font-bold">Rp :</div>
                  <div className="text-lg md:text-xl font-bold">10.866.000</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm md:text-base font-semibold">
                  Pemasukan Hari Ini
                </p>
                <Link
                  to=""
                  className="text-sm md:text-base font-semibold underline hover:text-gray-900"
                >
                  Lihat Semua
                </Link>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg shadow-md text-white bg-gradient-to-r from-purple-400 to-purple-500 flex flex-col justify-between h-full w-72 sm:w-full">
            <div className="flex items-center justify-between mb-2">
              <FaChartBar className="text-2xl" />
              <div className="text-sm md:text-lg font-semibold">
                Total Transaksi
              </div>
            </div>
            <div className="relative mb-2">
              <div className="absolute w-full border-t border-white"></div>
            </div>
            <div className="mt-auto">
              <div className="flex justify-center m-2">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white">
                  <span className="text-green-500 text-lg font-bold">142</span>
                </div>
              </div>
              <p className="text-sm md:text-base font-semibold">
                Total Penjualan Hari Ini
              </p>
            </div>
          </div>

          <div className="p-4 rounded-lg shadow-md text-white bg-gradient-to-r from-red-400 to-red-500 flex flex-col justify-between h-full w-72 sm:w-full">
            <div className="flex items-center justify-between mb-2">
              <MdOutlineRestaurantMenu className="text-2xl" />
              <div className="text-sm md:text-lg font-semibold">Menu</div>
            </div>
            <div className="relative mb-2">
              <div className="absolute w-full border-t border-white"></div>
            </div>
            <div className="mt-auto">
              <div className="flex justify-center m-2">
                <div className="flex items-center justify-start gap-3 w-full h-12 rounded-full ">
                  <div className="text-lg md:text-xl font-bold">Menu :</div>
                  <div className="text-lg md:text-xl font-bold">10</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm md:text-base font-semibold">Total Menu</p>
                <Link
                  to=""
                  className="text-sm md:text-base font-semibold underline hover:text-gray-900"
                >
                  Lihat Semua
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
