import { useState, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type FormValues = {
  Nama: string;
  Harga: string;
  Jenis: string;
};

export default function AddMenu() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      Nama: "",
      Harga: "",
      Jenis: "",
    },
  });
  const [images, setImages] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const newFiles = Array.from(event.target.files);
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    const validFiles = newFiles.filter(
      (file) =>
        allowedTypes.includes(file.type) &&
        !images.some((img) => img.includes(file.name))
    );

    if (images.length + validFiles.length > 3) {
      toast.error("Maksimal 3 gambar");
    } else {
      validFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result) {
            setImages((prev) => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }

    event.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormValues) => {
    if (images.length === 0) {
      toast.error("Mohon unggah minimal satu gambar.");
      return;
    }

    const payload = {
      Nama: data.Nama,
      Harga: data.Harga,
      Jenis: data.Jenis,
      Images: images,
    };

    const url = `${import.meta.env.VITE_Express_API_Backend}/api/auth/add-menu`;

    try {
      console.log(payload);
      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
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
        toast.error(
          err.response?.data?.message || "Kesalahan saat menambahkan menu"
        );
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
            <h1 className="text-gray-900 text-lg font-semibold">Add Menu</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="Nama"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nama Produk
              </label>
              <input
                {...register("Nama", { required: "Nama produk wajib diisi" })}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                id="Nama"
                type="text"
                placeholder="Masukan Nama Produk"
              />
              {errors.Nama && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.Nama.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="Harga"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Harga
              </label>
              <input
                {...register("Harga", { required: "Harga wajib diisi" })}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                id="Harga"
                type="text"
                placeholder="Masukan Harga"
              />
              {errors.Harga && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.Harga.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="Jenis"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Jenis
              </label>
              <select
                {...register("Jenis", {
                  required: "Jenis produk wajib dipilih",
                })}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              >
                <option value="" disabled>
                  Jenis Menu Makanan || Minuman
                </option>
                <option value="Makanan">Makanan</option>
                <option value="Minuman">Minuman</option>
              </select>
              {errors.Jenis && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.Jenis.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Image
              </label>
              <input
                className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                id="image"
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                multiple
                onChange={handleImageUpload}
              />
              <div className="mt-4 flex gap-4">
                {images.length > 0 &&
                  images.map((image, index) => (
                    <div
                      key={index}
                      className="relative group w-32 h-32 border rounded-lg overflow-hidden"
                    >
                      <img
                        src={image}
                        alt={`Uploaded ${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveImage(index)}
                      >
                        X
                      </button>
                    </div>
                  ))}
              </div>
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
