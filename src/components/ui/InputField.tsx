import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { FormFieldProps } from "../../lib/types";
import { Eye, EyeOff, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import Button from "./Button";
import { useTranslation } from "react-i18next";

const InputField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  variant,
  size,
  className,
  error,
}) => {
  const startType = type;
  const [useType, setUseType] = useState(type);

  const { t, i18n } = useTranslation();

  return (
    <div className="flex flex-col gap-2 isolate">
      <div className="flex relative w-auto">
        <input
          id={name + "-input"}
          type={useType}
          placeholder={t(`${placeholder}`)}
          {...register(name)}
          className={cn(buttonVariants({ variant, size }), className)}
        />
        {startType === "password" && useType === "password" ? (
          <Button
            onClick={() => setUseType("text")}
            className="absolute right-0 top-0"
            type="button"
            variant="tertiary"
            size="sm"
          >
            <Eye size={24} strokeWidth={1.5} className="cursor-pointer" />
          </Button>
        ) : startType === "password" && useType === "text" ? (
          <Button
            onClick={() => setUseType("password")}
            className="absolute right-0 top-0"
            type="button"
            variant="tertiary"
            size="sm"
          >
            <EyeOff size={24} strokeWidth={1.5} className="cursor-pointer" />
          </Button>
        ) : (
          ""
        )}
      </div>
      {error && (
        <span id={name + "-error"} className=" text-danger">
          {t(`${error.message}`)}
        </span>
      )}
    </div>
  );
};

const buttonVariants = cva("rounded w-fit duration-300", {
  variants: {
    variant: {
      primary: "bg-text text-background",
      secondary: "bg-background text-text hover:bg-text ",
      tertiary: "bg-background text-text ",
    },
    size: {
      sm: "px-4 py-2  ",
      md: "px-8 py-2",
      lg: "px-12 py-2 ",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export default InputField;
