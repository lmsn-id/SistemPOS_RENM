import { useForm } from "react-hook-form";
import { api } from "../../../../service/ApiBackend";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface Akun {
  FullName: string;
  Email: string;
  Password: string;
  PhoneNumber: string;
  Alamat: string;
  Role: string;
}

export default function AddAkun() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<Akun>({
    defaultValues: {
      FullName: "",
      Email: "",
      Password: "",
      PhoneNumber: "",
      Alamat: "",
      Role: "",
    },
  });

  const onSubmit = async (data: Akun) => {
    console.log(data);

    const { ApiBackend } = api();
    const url = ApiBackend("/api/auth/add-akun");

    try {
      const response = await axios.post(url, data, {
        withCredentials: true,
      });

      if (response && response.status === 200) {
        toast.success(response.data.message, {
          onClose: () => {
            navigate(response.data.redirect);
          },
        });
      } else {
        toast.error(response.data.message);
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
    <>
      <div className="w-full h-full bg-white rounded-2xl shadow-md">
        <div className="p-6 max-h-full overflow-y-auto">
          <div className="w-full flex justify-center mb-4">
            <h1 className="text-gray-900 text-lg font-semibold">Add Akun</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="fullname"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Full Name
              </label>
              <input
                className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                id="fullname"
                type="text"
                placeholder="Masukan Full Name"
                {...register("FullName")}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Masukan Email"
                {...register("Email")}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                id="password"
                type="text"
                {...register("Password")}
                placeholder="Masukan Password"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phonenumber"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nomer Telepon
              </label>
              <input
                className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                id="phonenumber"
                type="text"
                placeholder="Masukan Nomer Telepon"
                {...register("PhoneNumber")}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="alamat"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nama Toko
              </label>
              <input
                className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                id="alamat"
                type="text"
                placeholder="Masukan Nomer Alamat"
                {...register("Role")}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="alamat"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Alamat Toko
              </label>
              <input
                className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                id="alamat"
                type="text"
                placeholder="Masukan Nomer Alamat"
                {...register("Alamat")}
              />
            </div>
            <div className="w-full flex justify-end space-x-8">
              <button
                type="submit"
                className="bg-[#3a3086] hover:bg-[#0095da] rounded-lg shadow-md px-4 py-2 text-white font-semibold"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
