"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    role: z.string().refine((val) => ["admin", "user", "guest"].includes(val), {
        message: "Please select a valid role.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
});

export default function SignupPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            role: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        toast({
            title: "Account created successfully!",
            description: "Your account has been created.",
        });
        console.log(values);
    }

    return (
        <div className="container mx-auto flex min-h-[calc(100vh-200px)] max-w-xl flex-col items-center justify-center px-4 py-12">
            <Card className="w-full">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Create Job Connect Account</CardTitle>
                    <CardDescription>Sign up a Job Seeker or an Employer</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-foreground">Email address</FormLabel>
                                        <FormControl>
                                            <Input type="email" />
                                        </FormControl>
                                        <FormMessage className="text-destructive text-sm" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select your role" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-white">
                                                <SelectItem value="single">Employer</SelectItem>
                                                <SelectItem value="double">Job Seeker</SelectItem>
                                                <SelectItem value="triple">Admin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-foreground">Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-destructive text-sm" />
                                    </FormItem>
                                )}
                            />

                            <CardFooter className="flex flex-col space-y-4 p-0">
                                <Button type="submit" className="w-full bg-blue-700 text-white text-md ">
                                    Create Account
                                </Button>
                                <div className="text-center text-sm">
                                    Already have an account?{" "}
                                    <Link href="/login" className="text-primary hover:underline">
                                        Log in
                                    </Link>
                                </div>
                            </CardFooter>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}