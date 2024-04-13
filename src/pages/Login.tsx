import { useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../components/ui/InputField";
import { LoginFormData, LoginSchema, RegisterFormData } from "../lib/types";

const Login = () => {
  // TODO: Add form validation

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const asd = async () => {
    localStorage.setItem("login", "true");
  };

  return (
    <div className="w-screen h-auto py-12 flex items-center justify-center">
      <form onSubmit={handleSubmit(asd)} className="flex flex-col gap-2">
        <InputField
          type="text"
          placeholder="Name"
          name="name"
          variant="tertiary"
          register={register}
          error={errors.name}
        ></InputField>
        <InputField
          type="text"
          placeholder="Password"
          name="password"
          variant="tertiary"
          register={register}
          error={errors.password}
        ></InputField>

        <Button type="submit" variant="primary" size="md">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Login;
