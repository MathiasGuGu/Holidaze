import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { useTranslation } from "react-i18next";

type buttonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
};

export default function Button({
  className,
  variant,
  size,
  ...props
}: buttonProps) {
  return (
    <button
      {...props}
      className={cn(buttonVariants({ variant, size }), className)}
    />
  );
}

console.log("hello");

const buttonVariants = cva("rounded w-fit duration-300", {
  variants: {
    variant: {
      primary: "bg-text text-background",
      secondary: "bg-background text-text hover:bg-text hover:text-background",
      tertiary: "text-text ",
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
