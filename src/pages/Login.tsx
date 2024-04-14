import { set, useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../components/ui/InputField";
import { LoginSchema, RegisterFormData } from "../lib/types";
import { ApiAuthEndpoints, BASE_URL } from "../lib/api";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

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

  let { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const asd = async (e: any) => {
    localStorage.setItem("login", "true");

    setLoading(true);

    let res = await fetch(BASE_URL + ApiAuthEndpoints.login, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e),
    });

    let data = await res.json();

    if (data.errors) {
      setError("name", {
        type: "manual",
        message: data.errors.status,
      });
      setIsError(true);
      setLoading(false);
      return;
    }

    const { accessToken, email } = data.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("email", email);

    setLoading(false);
  };

  return (
    <div className="w-screen h-auto py-12 flex items-center justify-center">
      <form onSubmit={handleSubmit(asd)} className="flex flex-col gap-2">
        <InputField
          type="text"
          placeholder="Email"
          name="email"
          variant="tertiary"
          register={register}
          error={errors.email}
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
          {loading ? (
            <Loader2 className="animate-spin" strokeWidth={1.5} size={22} />
          ) : (
            t("Submit")
          )}
        </Button>
      </form>
      {isError && (
        <span className="text-danger">{t("Invalid credentials")}</span>
      )}
    </div>
  );
};

export default Login;
