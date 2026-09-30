import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:-translate-y-1 hover:bg-primary/92 hover:shadow-soft",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:-translate-y-1",
        outline:
          "border border-primary/15 bg-card/80 text-foreground shadow-soft hover:-translate-y-1 hover:border-primary/30 hover:bg-primary/6 hover:text-primary",
        "warm-outline":
          "border-2 border-secondary bg-white text-secondary hover:-translate-y-1 hover:bg-secondary/5 hover:shadow-warm font-semibold dark:border-secondary/70 dark:bg-slate-950/50 dark:text-secondary-foreground dark:hover:bg-secondary/10",
        secondary: "bg-secondary text-secondary-foreground shadow-warm hover:-translate-y-1 hover:bg-secondary/92",
        ghost: "hover:bg-accent/80 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        sanctuary: "bg-gradient-warm text-secondary-foreground shadow-warm hover:-translate-y-1 hover:brightness-[1.02] hover:shadow-sanctuary font-heading font-medium",
        cta: "bg-gradient-primary text-primary-foreground shadow-sanctuary hover:-translate-y-1 hover:brightness-[1.03] hover:shadow-glow font-heading font-semibold",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 px-4",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
