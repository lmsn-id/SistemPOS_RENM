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

export const useUpadeteDataAkun = () => {
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

  return {
    onSubmit,
    register,
    handleSubmit,
  };
};
