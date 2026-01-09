import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

const buttonGroupVariants = cva(
  [
    // base
    "flex w-fit items-stretch",
    // focus stacking
    "[&>*]:focus-visible:z-10 [&>*]:focus-visible:relative",
    // select trigger width normalization
    "[&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit",
    // inputs expand
    "[&>input]:flex-1",
    // when nested groups exist, allow gap
    "has-[>[data-slot=button-group]]:gap-2",
  ].join(" "),
  {
    variants: {
      orientation: {
        horizontal: [
          // middle items: remove left radius & inner borders
          "[&>*:not(:first-child)]:rounded-l-none",
          "[&>*:not(:first-child)]:border-l-0",
          // middle items: remove right radius
          "[&>*:not(:last-child)]:rounded-r-none",
        ].join(" "),
        vertical: [
          "flex-col",
          "[&>*:not(:first-child)]:rounded-t-none",
          "[&>*:not(:first-child)]:border-t-0",
          "[&>*:not(:last-child)]:rounded-b-none",
        ].join(" "),
      },
      radius: {
        // ✅ site standardın
        xl: "rounded-xl",
        // (ihtiyaç olursa)
        lg: "rounded-lg",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      radius: "xl",
    },
  }
)

function ButtonGroup({
  className,
  orientation,
  radius,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation, radius }), className)}
      {...props}
    />
  )
}

function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      className={cn(
        [
          // ✅ match Button default height + radius language
          "h-11",
          "bg-muted/60",
          "flex items-center gap-2",
          "rounded-xl border",
          "px-4",
          "text-sm font-semibold",
          "shadow-sm",
          "backdrop-blur",
          "[&_svg]:pointer-events-none",
          "[&_svg:not([class*='size-'])]:size-4",
        ].join(" "),
        className
      )}
      {...props}
    />
  )
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "bg-input relative m-0! self-stretch data-[orientation=vertical]:h-auto",
        className
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}
