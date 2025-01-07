import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

interface UpdateResponse {
  success: boolean;
  redirect?: string;
  message?: string;
}

async function GetData(id: string): Promise<Akun | null> {
  const url = `${
    import.meta.env.VITE_Express_API_Backend
  }/api/auth/get-akun/${id}`;

  try {
    const response = await axios.get(url, { withCredentials: true });
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (err) {
    toast.error("Gagal memuat data akun.");
    console.error(err);
    return null;
  }
}

async function UpdateData(data: Akun): Promise<UpdateResponse> {
  const url = `${
    import.meta.env.VITE_Express_API_Backend
  }/api/auth/update-akun`;

  try {
    const response = await axios.put(url, data, { withCredentials: true });

    if (response.status === 200) {
      return {
        success: true,
        redirect: response.data.redirect,
        message: response.data.message,
      };
    }
    return { success: false };
  } catch (err) {
    toast.error("Gagal memperbarui data akun.");
    console.error(err);
    return { success: false };
  }
}

export default function UpdateDataAkun() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm<Akun>();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const data = await GetData(id);
        if (data) {
          Object.keys(data).forEach((key) =>
            setValue(key as keyof Akun, data[key as keyof Akun])
          );
        }
      }
    };
    fetchData();
  }, [id, setValue]);

  const onSubmit = async (formData: Akun) => {
    const { success, redirect, message } = await UpdateData(formData);

    if (success) {
      toast.success(message, {
        onClose: () => {
          if (redirect) {
            navigate(redirect);
          }
        },
      });
    } else {
      toast.error("Gagal memperbarui data akun.");
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md">
      <div className="p-6">
        <div className="w-full flex justify-center mb-4">
          <h1 className="text-gray-900 text-lg font-semibold">Update Akun</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="fullname"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nama Pemilik
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              id="fullname"
              type="text"
              placeholder="Masukan Full Name"
              {...register("FullName", { required: "Full Name wajib diisi" })}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Masukan Username"
              {...register("Username")}
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
