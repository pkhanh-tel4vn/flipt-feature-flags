"use client";

import { useFliptVariantWithContext } from "@/libs/feature-flags/useFliptVariantWithContext";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const BUTTON_COLOR_FLAG = "button-color";
const DEFAULT_COLOR = "blue";
const BUTTON_COLORS: Record<string, string> = {
  blue: "bg-blue-500 hover:bg-blue-600",
  green: "bg-green-500 hover:bg-green-600",
  red: "bg-red-500 hover:bg-red-600",
  purple: "bg-purple-500 hover:bg-purple-600",
};

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  const variant = useFliptVariantWithContext(BUTTON_COLOR_FLAG, DEFAULT_COLOR);
  const buttonClasses = BUTTON_COLORS[variant] ?? BUTTON_COLORS[DEFAULT_COLOR];
  return (
    <button
      className={`cursor-pointer rounded-md px-4 py-2 text-white transition-colors ${buttonClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
