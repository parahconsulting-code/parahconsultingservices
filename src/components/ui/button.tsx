import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, forwardRef } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-label transition-all duration-300 active:scale-95",
          variant === "primary" && "bg-primary text-on-primary hover:opacity-90 hover:scale-[1.03]",
          variant === "secondary" && "bg-secondary text-white hover:bg-secondary-container hover:scale-[1.03]",
          variant === "outline" && "border border-primary text-primary hover:bg-primary hover:text-on-primary hover:scale-[1.03]",
          variant === "ghost" && "text-on-surface hover:bg-surface-container",
          size === "sm" && "px-4 py-2 text-sm",
          size === "md" && "px-6 py-3",
          size === "lg" && "px-8 py-4",
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"
