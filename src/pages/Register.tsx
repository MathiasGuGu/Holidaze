import { useForm } from "react-hook-form";
import HolidazeButton from "@/components/ui/HolidazeButton";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../components/ui/InputField";
import { RegisterFormData, RegisterSchema } from "../lib/types";
import SelectInput from "../components/ui/SelectInput";
import { useTranslation } from "react-i18next";
import { ApiAuthEndpoints, BASE_URL } from "../lib/api";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
  // TODO: Add form validation

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { t } = useTranslation();

  const FormSubmitAction = async (e: any) => {
    setLoading(true);

    // fetch the data
    let res = await fetch(`${BASE_URL}${ApiAuthEndpoints.register}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e),
    });

    let data = await res.json();

    // stop the loader
    setLoading(false);

    // if the data has an error, set the error message
    if (data.error) {
      setIsError(true);
      setError("name", {
        type: "manual",
        message: data.message,
      });
      return;
    }

    // if the data is successful, set success to true, can remove, just for testing
    localStorage.setItem("success", "true");

    // If everything worked, set errors to false just in case
    setIsError(false);
    window.location.href = "/login";
  };

  return (
    <div className="w-screen h-auto flex items-center justify-center">
      <div className="w-[50vw] h-auto hidden min-h-screen md:flex flex-col items-center justify-center   bg-gradient-to-br from-blue-50 to-blue-300"></div>
      <div className="w-full md:w-[50vw] h-auto py-12 ">
        <div className="flex flex-col gap-2 md:px-32 px-2 text-center">
          <h1 className="text-4xl font-bold font-title">Register</h1>
          <h2 className="text-lg text-zinc-500">
            {t("Create an account to get started")}
          </h2>
          <Link to={"/sign-in"} className="text-sm text-blue-400">
            {t("Already have an account? Sign in")}
          </Link>
        </div>
        <form
          onSubmit={handleSubmit(FormSubmitAction)}
          className="flex flex-col gap-8 md:px-32 w-full px-2 py-20 items-start "
        >
          <div className="flex gap-2 flex-wrap">
            <InputField
              type="text"
              placeholder="Name"
              name="name"
              variant="tertiary"
              className="w-[350px]"
              register={register}
              error={errors.name}
            ></InputField>
            <InputField
              type="text"
              placeholder="Email"
              name="email"
              variant="tertiary"
              className="w-[350px]"
              register={register}
              error={errors.email}
            ></InputField>
          </div>
          <InputField
            type="password"
            placeholder="Password"
            name="password"
            className="w-[350px]"
            variant="tertiary"
            register={register}
            error={errors.password}
          ></InputField>
          <InputField
            type="text"
            placeholder="Bio"
            name="bio"
            className="w-[350px]"
            variant="tertiary"
            register={register}
            error={errors.bio}
          ></InputField>
          <div className="flex flex-wrap gap-2">
            <InputField
              type="text"
              className="w-[350px]"
              placeholder="Banner Url"
              name="bannerUrl"
              variant="tertiary"
              register={register}
              error={errors.bannerUrl}
            ></InputField>
            <InputField
              type="text"
              placeholder="Banner Alt"
              name="bannerAlt"
              className="w-[350px]"
              variant="tertiary"
              register={register}
              error={errors.bannerAlt}
            ></InputField>
          </div>
          <div className="flex flex-wrap gap-2">
            <InputField
              type="text"
              placeholder="Avatar Url"
              name="avatarUrl"
              variant="tertiary"
              className="w-[350px]"
              register={register}
              error={errors.avatarUrl}
            ></InputField>
            <InputField
              type="text"
              placeholder="Avatar Alt"
              name="avatarAlt"
              className="w-[350px]"
              variant="tertiary"
              register={register}
              error={errors.avatarAlt}
            ></InputField>
          </div>
          <SelectInput
            type="checkbox"
            name="venueManager"
            placeholder="Venue manager?"
            register={register}
          ></SelectInput>
          {isError && (
            <span id="error" className="text-danger">
              {isError && errors.name?.message}
            </span>
          )}
          <HolidazeButton
            id="submit-register-button"
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
      </div>
    </div>
  );
};

export default Register;
