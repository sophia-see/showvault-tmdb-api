"use client"

import React from 'react'
import Link from 'next/link'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { formSchema } from '@/lib/auth-schema'
import { authClient } from '@/lib/auth-client'
import { toast } from '@/hooks/use-toast'
import { CustomCardContent } from '@/components/custom-ui/card'
import { CustomInput } from '@/components/custom-ui/input'
import FormContainer from '@/components/form/FormContainer'
import FormFooter from '@/components/form/FormFooter'
import FormButton from '@/components/form/FormButton'

export default function SignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
      email: "",
      password: "",
    },
  })
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, email, password } = values;
    await authClient.signUp.email({ 
        email, 
        password, 
        name, 
        callbackURL: "/login"
    }, { 
        onRequest: () => { 
          toast({
            title: "Please wait...",
          })
        }, 
        onSuccess: () => { 
          form.reset();
          window.location.href = "/login"; 
        }, 
        onError: (ctx) => { 
          toast({ title: ctx.error.message, variant: 'destructive' });
          form.setError('email', {
            type: 'manual',
            message: ctx.error.message
          })
        }, 
      });
  }

  return (
    <FormContainer label='Sign Up'>
        <CustomCardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => {
                    const error = fieldState?.error;

                    return (
                      <FormItem>
                        <FormControl>
                          <CustomInput
                            type='text'
                            placeholder="Name"
                            error={error}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field, fieldState }) => {
                    const error = fieldState?.error;

                    return (
                      <FormItem>
                        <FormControl>
                          <CustomInput
                            type='text'
                            placeholder="Email Address"
                            error={error}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => {
                    const error = fieldState?.error;

                    return (
                      <FormItem>
                        <FormControl>
                          <CustomInput 
                            type='password' 
                            placeholder="Password"
                            error={error}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              </div>
              <FormButton label="Create an account" />
            </form>
          </Form>
        </CustomCardContent>
        <FormFooter text={`Already have an account? `}>
          <Link href='/login' className='text-primary hover:underline'>
              Login
          </Link>
        </FormFooter>
    </FormContainer>
  )
}
 