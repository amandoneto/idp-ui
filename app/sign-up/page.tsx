"use client";

import Header from "../components/Header";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .max(20, "Password must be at most 20 characters long"),
    verifyPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Please verify your password"),
}).required();

type FormData = yup.InferType<typeof schema>;

export default function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
        // Endpoint pending
    };

    return (
        <main className="min-h-screen bg-white">
            <Header />
            <div className="flex items-center justify-center min-h-screen pt-[100px] px-4">
                <div className="w-full max-w-[400px] space-y-8">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold text-secondary">Sign UP</h1>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-base font-bold text-black">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Your Name"
                                {...register("name")}
                                className="w-full h-[38px] px-4 bg-white border border-[#94979B] rounded-[8px] text-[#101820] placeholder-[#A2AAB6] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-base font-bold text-black">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="seu@email.com"
                                {...register("email")}
                                className="w-full h-[38px] px-4 bg-white border border-[#94979B] rounded-[8px] text-[#101820] placeholder-[#A2AAB6] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-base font-bold text-black">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="********"
                                {...register("password")}
                                className="w-full h-[38px] px-4 bg-white border border-[#94979B] rounded-[8px] text-[#101820] placeholder-[#A2AAB6] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                            />
                            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="verifyPassword" className="block text-base font-bold text-black">
                                Verify Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="verifyPassword"
                                type="password"
                                placeholder="********"
                                {...register("verifyPassword")}
                                className="w-full h-[38px] px-4 bg-white border border-[#94979B] rounded-[8px] text-[#101820] placeholder-[#A2AAB6] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                            />
                            {errors.verifyPassword && <span className="text-red-500 text-sm">{errors.verifyPassword.message}</span>}
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full h-[40px] px-6 text-lg font-normal text-white bg-[#EA7603] hover:bg-[#d66b02] rounded-full transition-all duration-200 shadow-sm flex items-center justify-center cursor-pointer"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
