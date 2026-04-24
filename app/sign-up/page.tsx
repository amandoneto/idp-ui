"use client";

import Header from "../components/Header";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerSchema } from "../schemas/register";

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
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";


export default function SignUp() {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
            verifyPassword: "",
        },
    });
    const [isPending, startTransition] = useTransition();

    async function onSubmit(data: z.infer<typeof registerSchema>) {
        startTransition(async () => {
            await register({
                email: data.email,
                name: data.name,
                password: data.password,
                verifyPassword: data.verifyPassword,
            });
        });
    }

    const register = async (data: z.infer<typeof registerSchema>) => {
        console.log(data);
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4">
            <Header />
            <Card className="w-[80%] max-w-2xl mt-8">
                <CardHeader>
                    <CardTitle>Sign up</CardTitle>
                    <CardDescription>Create an account to get started</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup className="gap-y-4">
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel htmlFor="name">Full Name</FieldLabel>
                                        <Input
                                            id="name"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="John Doe"
                                            {...field}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
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
                            <Controller
                                name="verifyPassword"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel htmlFor="verifyPassword">Verify Password</FieldLabel>
                                        <Input
                                            id="verifyPassword"
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
                            >
                                {/* Shimmer effect */}
                                <span className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/20 to-transparent" />

                                {isPending ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="size-4 animate-spin" />
                                        <span>Creating account...</span>
                                    </div>
                                ) : (
                                    <span className="relative z-10">Create Account</span>
                                )}
                            </Button>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}
