"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Link from 'next/link';

const formSchema = z.object({
    email: z.string().email("Invalid Email Address").trim().min(1, "Email is required"),
    password: z.string().min(1, "Password must be at least 8 characters"),
})

type FormType = z.infer<typeof formSchema>

export const SignInCard = () => {
    const form = useForm<FormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const onSubmit = (values: FormType) => {
        console.log({ values })
        // Here you would typically handle the login logic
    }

    return (
        <Card className="w-full max-w-md mx-auto shadow-lg">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl">Welcome Back!</CardTitle>
            </CardHeader>
            <Separator className="mx-7" />
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} type="email" placeholder="Enter your email" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} type="password" placeholder="Enter your password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" size="lg" className="w-full">
                            Login
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <Separator className="mx-7" />
            <CardContent className="p-7 space-y-4">
                <Button size="lg" variant="secondary" className="w-full">
                    <FcGoogle className="mr-2 h-5 w-5" />
                    Login with Google
                </Button>
                <Button size="lg" variant="secondary" className="w-full">
                    <FaGithub className="mr-2 h-5 w-5" />
                    Login with Github
                </Button>
            </CardContent>
            <div className='px-7'>
                <Separator />
            </div>
            <CardContent className="p-7 flex items-center justify-center">
                <p>
                    Don&apos;t have an account?{' '}
                    <Link href="/sign-up"  >
                        <span className='text-blue-700'>
                            &nbsp; Sign Up
                        </span>
                         </Link>
                </p>
            </CardContent>
        </Card>
    );
};

export default SignInCard;