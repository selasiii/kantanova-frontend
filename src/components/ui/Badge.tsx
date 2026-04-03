import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-noir-blue focus:ring-offset-2 uppercase tracking-widest font-display",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-noir-black text-noir-white hover:bg-noir-black/80",
        secondary:
          "border-transparent bg-noir-blue text-white hover:bg-noir-blue/80",
        outline: "text-noir-black border-noir-border",
        success: "border-transparent bg-green-500/10 text-green-700",
        warning: "border-transparent bg-yellow-500/10 text-yellow-700",
        error: "border-transparent bg-red-500/10 text-red-700",
        destructive: "border-transparent bg-red-500/10 text-red-700",
      },

    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export { Badge, badgeVariants }
