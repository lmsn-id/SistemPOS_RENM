import { useAddAkun } from "@/app/hook/usePost";

export default function AddAkun() {
  const { register, handleSubmit, onSubmit } = useAddAkun();

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
                Nama Pemilik
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
