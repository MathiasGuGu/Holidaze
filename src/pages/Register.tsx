import { useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../components/ui/InputField";
import { RegisterFormData, RegisterSchema } from "../lib/types";
import SelectInput from "../components/ui/SelectInput";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();

  const asd = async (data: any) => {
    localStorage.setItem("success", "true");
  };

  return (
    <div className="w-screen h-auto py-12 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(asd)}
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
        <Button type="submit" variant="primary" size="md">
          {t("Submit")}
        </Button>
      </form>
    </div>
  );
};

export default Register;
