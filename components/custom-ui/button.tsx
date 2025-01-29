import React from "react"
import { Button, ButtonProps } from "../ui/button"
import { cn } from "@/lib/utils"

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
      
      return (
        <Button
          className={cn(`text-body-m font-light`, className)}
          variant={variant}
          size={size}
          asChild={asChild}
          ref={ref}
          {...props}
        />
      )
    }
  )
  CustomButton.displayName = "CustomButton"
  
  export { CustomButton }