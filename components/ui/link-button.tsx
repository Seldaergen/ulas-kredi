import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link> & {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
};

export function LinkButton({
  variant = "default",
  size = "default",
  ...props
}: Props) {
  return (
    <Button asChild variant={variant} size={size}>
      <Link {...props} />
    </Button>
  );
}
