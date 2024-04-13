import { cn } from "../../lib/utils";
import { useState } from "react";

type SelectFieldProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  name: string;
  register: any;
  className?: string;
};

const SelectInput: React.FC<SelectFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  className,
}: any) => {
  const [checked, setChecked] = useState(false);

  return (
    <label
      className={cn({
        ["flex flex-col gap-2 isolate relative w-16 h-8 p-1  border border-zinc-200 rounded-full transition-all duration-300 cursor-pointer"]:
          true,
        ["after:w-8 after:h-6 after:bg-text/60 after:rounded-full after:absolute after:top-1/2 after:-translate-y-1/2 "]:
          !checked,
        ["after:w-8 after:h-6 after:bg-primary after:rounded-full after:absolute after:translate-x-[70%] after:top-1/2 after:-translate-y-1/2 "]:
          checked,
      })}
    >
      <input
        id={name + "-input"}
        type={type}
        onClick={() => {
          setChecked(!checked);
        }}
        placeholder={placeholder}
        {...register(name)}
        className={cn(
          {
            ["w-full h-full rounded-full hidden relative"]: true,
          },
          className
        )}
      />
    </label>
  );
};

export default SelectInput;
