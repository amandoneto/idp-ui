"use client";

import Header from "../components/Header";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema } from "../schemas/login";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth-context";

import axios from "axios";

export default function SignIn() {
    const router = useRouter();
    const { login, isPending } = useAuth();
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: z.infer<typeof loginSchema>) {
        try {
            await login(data);
            toast.success("Signed in successfully");
            router.push("/dashboard");
        } catch (error) {
            let message = "Failed to sign in. Please check your credentials.";
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                message = error.response.data.message;
            }
            toast.error(message);
        }
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4">
            <Header />
            <Card className="w-[80%] max-w-2xl mt-8">
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup className="gap-y-4">
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                        <Input
                                            id="email"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="john@doe.com"
                                            type="email"
                                            {...field}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel htmlFor="password">Password</FieldLabel>
                                        <Input
                                            id="password"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="********"
                                            type="password"
                                            {...field}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Button
                                disabled={isPending}
                                className="relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground group"
                                type="submit"
                            >
                                {/* Shimmer effect */}
                                <span className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/20 to-transparent" />

                                {isPending ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="size-4 animate-spin" />
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    <span className="relative z-10">Sign In</span>
                                )}
                            </Button>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}
