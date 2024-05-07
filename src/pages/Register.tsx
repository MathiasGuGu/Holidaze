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
  };

  return (
    <div className="w-screen h-auto py-12 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(FormSubmitAction)}
        className="flex flex-col gap-8 w-full items-center "
      >
        <div className="flex">
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
            placeholder="Email"
            name="email"
            variant="tertiary"
            register={register}
            error={errors.email}
          ></InputField>
        </div>
        <InputField
          type="password"
          placeholder="Password"
          name="password"
          variant="tertiary"
          register={register}
          error={errors.password}
        ></InputField>
        <InputField
          type="text"
          placeholder="Bio"
          name="bio"
          variant="tertiary"
          register={register}
          error={errors.bio}
        ></InputField>
        <div className="flex">
          <InputField
            type="text"
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
            variant="tertiary"
            register={register}
            error={errors.bannerAlt}
          ></InputField>
        </div>
        <div className="flex">
          <InputField
            type="text"
            placeholder="Avatar Url"
            name="avatarUrl"
            variant="tertiary"
            register={register}
            error={errors.avatarUrl}
          ></InputField>
          <InputField
            type="text"
            placeholder="Avatar Alt"
            name="avatarAlt"
            variant="tertiary"
            register={register}
            error={errors.avatarAlt}
          ></InputField>
          <SelectInput
            type="checkbox"
            name="venueManager"
            register={register}
          ></SelectInput>
        </div>
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
  );
};

export default Register;
