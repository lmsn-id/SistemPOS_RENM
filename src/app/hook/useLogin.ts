import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface Login {
  Username: string;
  Email: string;
  Password: string;
}

export const Login = () => {
  const { register, handleSubmit } = useForm<Login>({
    defaultValues: {
      Username: "",
      Email: "",
      Password: "",
    },
  });
  const router = useNavigate();
};
