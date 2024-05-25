import { useForm } from "react-hook-form";
import HolidazeButton from "@/components/ui/HolidazeButton";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../components/ui/InputField";
import { LoginSchema, RegisterFormData } from "../lib/types";
import { ApiAuthEndpoints, BASE_URL } from "../lib/api";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../stores/authStore";
import { useStore } from "zustand";
import { redirect } from "react-router-dom";

const Login = () => {
  // TODO: Add form validation

  const store: any = useStore(useAuthStore); // Get the store instance
  const login = store.login;

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

  const submitFunction = async (e: any) => {
    localStorage.setItem("login", "true");

    try {
      setLoading(true);

      let res = await fetch(
        BASE_URL + ApiAuthEndpoints.login + "?_holidaze=true",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(e),
        }
      );

      let data = await res.json();

      if (data.errors) {
        setError("name", {
          type: "manual",
          message: data.errors.status,
        });
        setLoading(false);
        return;
      }

      const { accessToken } = data.data;

      let apiRes = await fetch(BASE_URL + "/auth/create-api-key", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      type apiKeyType = {
        data: {
          name: string;
          status: string;
          key: string;
        };
        meta: {};
      };
      let apiKey: apiKeyType = await apiRes.json();

      console.log(apiKey);

      login({ ...data.data }, accessToken, apiKey.data);

      //   localStorage.setItem("accessToken", accessToken);
      //   localStorage.setItem("data", JSON.stringify(data.data));

      setLoading(false);
      redirect("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setIsError(true);
    }
  };

  return (
    <div className="w-screen h-auto  flex items-center justify-center">
      <div className="w-[50vw] h-auto hidden min-h-screen md:flex flex-col items-center justify-center   bg-gradient-to-br from-blue-50 to-blue-300"></div>
      <section className="w-full py-64 md:py-0  md:w-1/2 h-auto flex flex-col items-center justify-center  ">
        <form
          onSubmit={handleSubmit(submitFunction)}
          className="flex flex-col gap-4  w-full xl:w-1/2 px-4  "
        >
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-bold font-title">Welcome Back!</h1>
            <h2 className="text-lg text-zinc-500">Sign in to your account</h2>
          </div>
          <InputField
            type="text"
            placeholder="Email"
            name="email"
            variant="tertiary"
            className="w-[350px]"
            register={register}
            error={errors.email}
          ></InputField>
          <InputField
            type="password"
            placeholder="Password"
            name="password"
            variant="tertiary"
            className="w-[350px]"
            register={register}
            error={errors.password}
          ></InputField>

          <HolidazeButton
            id="submit-login-button"
            type="submit"
            variant="primary"
            size="md"
          >
            {loading ? (
              <Loader2 className="animate-spin" strokeWidth={1.5} size={22} />
            ) : (
              t("Submit")
            )}
          </HolidazeButton>
        </form>
      </section>

      {isError && (
        <span className="text-danger">{t("Invalid credentials")}</span>
      )}
    </div>
  );
};

export default Login;
