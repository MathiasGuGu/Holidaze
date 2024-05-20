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

      login({ ...data.data, ...apiKey }, accessToken);

      //   localStorage.setItem("accessToken", accessToken);
      //   localStorage.setItem("data", JSON.stringify(data.data));

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setIsError(true);
    }
  };

  return (
    <div className="w-screen h-auto py-12 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(submitFunction)}
        className="flex flex-col gap-2"
      >
        <InputField
          type="text"
          placeholder="Email"
          name="email"
          variant="tertiary"
          register={register}
          error={errors.email}
        ></InputField>
        <InputField
          type="password"
          placeholder="Password"
          name="password"
          variant="tertiary"
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
      {isError && (
        <span className="text-danger">{t("Invalid credentials")}</span>
      )}
    </div>
  );
};

export default Login;
