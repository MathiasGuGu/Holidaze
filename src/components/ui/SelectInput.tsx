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
    <label className="flex  gap-2 w-auto h-10 ">
      <span className="text-gray-600">{placeholder}</span>
      <input
        id={name + "-input"}
        type={type}
        onClick={() => {
          setChecked(!checked);
        }}
        {...register(name)}
        className={cn(
          {
            ["h-6 w-6   relative"]: true,
          },
          className
        )}
      />
      <p className="text-sm text-zinc-400">(checked = yes)</p>
    </label>
  );
};

export default SelectInput;
