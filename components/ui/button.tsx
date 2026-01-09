import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-cyan-400/40 focus-visible:ring-[3px] focus-visible:border-cyan-300 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // ✅ Primary default = senin istediğin buton stili
        default: "bg-cyan-600 text-white hover:bg-cyan-700",

        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",

        // Secondary (site genelinde çok kullanışlı)
        secondary:
          "border border-slate-200 bg-white/70 text-slate-900 hover:bg-white shadow-sm backdrop-blur dark:bg-white/5 dark:border-white/10 dark:text-slate-100 dark:hover:bg-white/10",

        outline:
          "border border-slate-200 bg-white/60 text-slate-900 hover:bg-white dark:bg-white/5 dark:border-white/10 dark:text-slate-100 dark:hover:bg-white/10",

        ghost:
          "hover:bg-slate-100 text-slate-900 dark:hover:bg-white/10 dark:text-slate-100",

        link: "text-cyan-700 underline-offset-4 hover:underline",
      },
      size: {
        // ✅ Default size = h-11 + rounded-xl + px-5 (senin istediğin)
        default: "h-11 px-5 rounded-xl",

        sm: "h-9 rounded-lg gap-1.5 px-4",
        lg: "h-12 rounded-xl px-6",
        icon: "size-11 rounded-xl",
        "icon-sm": "size-9 rounded-lg",
        "icon-lg": "size-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
