import * as React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full"
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "lg", ...props }, ref) => {
    const maxWidths = {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      full: "max-w-full",
    }

    return (
      <div
        ref={ref}
        className={cn("mx-auto w-full px-4 md:px-6", maxWidths[size], className)}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "col"
  spacing?: "none" | "xs" | "sm" | "md" | "lg" | "xl"
  align?: "start" | "center" | "end" | "stretch"
  justify?: "start" | "center" | "end" | "between"
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction = "col", spacing = "md", align, justify, ...props }, ref) => {
    const spacings = {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    }

    const aligns = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    }

    const justifies = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          direction === "col" ? "flex-col" : "flex-row",
          spacings[spacing],
          align && aligns[align],
          justify && justifies[justify],
          className
        )}
        {...props}
      />
    )
  }
)
Stack.displayName = "Stack"

export { Container, Stack }
