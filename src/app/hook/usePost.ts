import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Akun {
  Username: string;
  FullName: string;
  Email: string;
  Password: string;
  PhoneNumber: string;
  Alamat: string;
  Role: string;
}

export const useAddAkun = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<Akun>({
    defaultValues: {
      Username: "",
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

    const url: string = `${
      import.meta.env.VITE_Express_API_Backend
    }/api/auth/add-akun`;

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

  return {
    register,
    handleSubmit,
    onSubmit,
  };
};
