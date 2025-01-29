import * as React from "react"

import { cn } from "@/lib/utils"
import { FieldError } from "react-hook-form"
import { Input } from "../ui/input"

interface InputProps extends React.ComponentProps<"input"> {
  error?: FieldError | undefined
}

const CustomInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <Input
        type={type}
        className={cn(
          ` w-full
            pl-4 pb-4
            appearance-none
            bg-transparent text-pure-white placeholder-half-pure-white caret-pure-red
            rounded-none
            border-0 border-b-[1px]
            ${error ? "border-pure-red" : "border-greyish-blue focus:border-pure-white"}
            outline-none
            disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
            focus-visible:outline-none focus-visible:ring-0
          `,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
CustomInput.displayName = "CustomInput"

export { CustomInput }
