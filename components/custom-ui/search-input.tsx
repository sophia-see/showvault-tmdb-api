import * as React from "react"

import { cn } from "@/lib/utils"
import { FieldError } from "react-hook-form"
import { Search } from "lucide-react"
import { CustomInput } from "./input"

interface InputProps extends React.ComponentProps<"input"> {
  error?: FieldError | undefined
}

const CustomSearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="flex items-center gap-4 w-full">
      {/* Icon */}
      <span className="flex items-center text-white">
        <Search className="w-6 h-6" />
      </span>
    
      {/* Input container with border */}
      <div className="w-full">
        <CustomInput
          type={type}
          className={cn(
            `pl-14 p-0 m-0 border-b border-transparent focus:border-greyish-blue outline-none`,
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    </div>
    
    )
  }
)
CustomSearchInput.displayName = "CustomSearchInput"

export { CustomSearchInput }
