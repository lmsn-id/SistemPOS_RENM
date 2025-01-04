import { useState } from "react";
import { motion } from "framer-motion";
import wave from "../../../assets/wave.svg";
import left from "../../../assets/undraw_personal-website_kz7a.svg";
import Logo from "../../../assets/Logo.jpeg";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineRemoveRedEye, MdOutlineVisibilityOff } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

interface Login {
  identifier: string;
  Password: string;
}

export default function Login() {
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
      const url = "http://localhost:8080/api/auth";
      const response = await axios.post(`${url}/login`, payload, {
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

  const waveVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const leftImageVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.2 } },
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.8, ease: "easeInOut" } },
  };

  const formVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, delay: 0.5 } },
  };

  return (
    <>
      <main className="relative mx-auto w-full min-h-screen bg-[#6495ed] md:bg-gray-100 overflow-hidden">
        <motion.img
          src={wave}
          variants={waveVariants}
          initial="hidden"
          animate="visible"
          alt=""
          className="absolute w-[75%] md:w-[20%] h-full left-0 top-0 z-0"
        />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center min-h-screen">
          <motion.div
            variants={leftImageVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex justify-center w-1/2 h-full p-8"
          >
            <div className="">
              <img src={left} className="w-96" alt="Illustration" />
            </div>
          </motion.div>

          <div className="flex items-center justify-center w-full md:w-1/2">
            <div className="shadow-lg md:backdrop-blur-md sm:bg-white/30 rounded-lg p-8 w-full max-w-md">
              <motion.div
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                className="flex justify-center mb-8"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 text-white flex items-center justify-center rounded-full">
                  <img src={Logo} className="rounded-full" alt="" />
                </div>
              </motion.div>

              <motion.form
                onSubmit={handleSubmit(onSubmit)}
                variants={formVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-lg font-semibold text-white md:text-gray-700"
                  >
                    User Name
                  </label>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <input
                      id="username"
                      type="text"
                      className="flex-grow px-4 py-2 outline-none"
                      placeholder="Enter your username or email"
                      {...register("identifier")}
                    />
                    <div className="bg-blue-100 p-2">
                      <FaUserCircle className="w-5 h-5 text-blue-500" />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-lg font-semibold text-white md:text-gray-700"
                  >
                    Password
                  </label>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="flex-grow px-4 py-2 outline-none"
                      placeholder="Enter your password"
                      {...register("Password")}
                    />
                    <div className="bg-blue-100 p-2">
                      {showPassword ? (
                        <MdOutlineRemoveRedEye
                          className="w-5 h-5 text-blue-500 cursor-pointer"
                          onClick={togglePassword}
                        />
                      ) : (
                        <MdOutlineVisibilityOff
                          className="w-5 h-5 text-blue-500 cursor-pointer"
                          onClick={togglePassword}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={isConfirmed}
                      onChange={(e) => setIsConfirmed(e.target.checked)}
                    />
                    <span className="text-lg font-semibold text-white md:text-gray-600">
                      Remember Password
                    </span>
                  </label>
                  <a href="#" className="text-sm text-white hover:underline">
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium py-2 rounded-lg hover:shadow-lg focus:outline-none"
                >
                  Sign in
                </button>
              </motion.form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
