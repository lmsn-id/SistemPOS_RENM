import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";

interface Login {
  identifier: string;
  Password: string;
}

export const useLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const Navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const { register, handleSubmit } = useForm<Login>({
    defaultValues: {
      identifier: "",
      Password: "",
    },
  });

  const onSubmit = async (data: Login) => {
    console.log(data);

    if (!data.identifier || !data.Password) {
      toast.error("Tolong isi semua data");
      return;
    }

    if (!isConfirmed) {
      toast.error("Tolong centang kotak Remember Password");
      return;
    }

    const isEmail = /^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(data.identifier);
    const payload = {
      ...data,
      isEmail,
    };

    try {
      const url: string = `${
        import.meta.env.VITE_Express_API_Backend
      }/api/auth/login`;
      console.log("API URL:", url);

      const response = await axios.post(url, payload, {
        withCredentials: true,
      });

      const result = response.data;
      if (response.status === 200) {
        toast.success(result.message, {
          onClose: () => {
            Navigate(result.redirect);
          },
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Terjadi kesalahan saat login");
        }
      } else {
        toast.error("Kesalahan tidak terduga");
      }
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return {
    togglePassword,
    onsubmit,
    register,
    onSubmit,
    handleSubmit,
    setIsConfirmed,
    showPassword,
    isConfirmed,
  };
};
