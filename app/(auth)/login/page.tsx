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
import { signInFormSchema } from '@/lib/auth-schema'
import { authClient } from '@/lib/auth-client'
import { toast } from '@/hooks/use-toast'
import { CustomInput } from '@/components/custom-ui/input'
import { CustomCardContent} from '@/components/custom-ui/card'
import FormContainer from '@/components/form/FormContainer'
import FormFooter from '@/components/form/FormFooter'
import FormButton from '@/components/form/FormButton'
  
export default function SignIn() {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const { email, password } = values;
    await authClient.signIn.email({ 
        email, 
        password, 
        callbackURL: `${window.location.origin}/`
    }, { 
        onRequest: () => { 
          toast({
            title: "Please wait...",
          })
        }, 
        onSuccess: () => { 
          form.reset();
        }, 
        onError: () => { 
          toast({
            title: "Login failed",
          })
        }, 
      });
  }

  return (
    <FormContainer label='Login'>
        <CustomCardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              <div className="space-y-4">
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
              <FormButton label="Login to your account" />
            </form>
          </Form>
        </CustomCardContent>
        <FormFooter text={`Don't have an account yet? `}>
          <Link href='/sign-up' className='text-primary hover:underline'>
              Sign up
          </Link>
        </FormFooter>
    </FormContainer>
  )
}