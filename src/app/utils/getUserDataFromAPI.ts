import axios from "axios";

export const getUserDataFromAPI = async () => {
  const url = `${
    import.meta.env.VITE_Express_API_Backend
  }/api/auth/access-token`;
  const response = await axios.get(url, { withCredentials: true });
  const { id, role, isSuperAdmin, fullName } = response.data;
  return { id, role, isSuperAdmin, fullName };
};
