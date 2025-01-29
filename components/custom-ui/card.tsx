import * as React from "react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"

const CustomCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn(`w-full mx-auto border-0 max-w-[327px] md:max-w-[400px] p-6 pb-0 md:p-8 md:pb-0`, className)}
    {...props}
  />
))
CustomCard.displayName = "CustomCard"

const CustomCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardHeader
    ref={ref}
    className={cn("p-0 pb-10", className)}
    {...props}
  />
))
CustomCardHeader.displayName = "CustomCardHeader"

const CustomCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardContent ref={ref} className={cn("p-0", className)} {...props} />
))
CustomCardContent.displayName = "CustomCardContent"

const CustomCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardFooter
    ref={ref}
    className={cn("justify-center pb-8 pt-6", className)}
    {...props}
  />
))
CustomCardFooter.displayName = "CustomCardFooter"

export { CustomCard, CustomCardHeader, CustomCardContent, CustomCardFooter }
