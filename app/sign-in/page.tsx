import Header from "../components/Header";

export default function SignIn() {
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <div className="flex items-center justify-center min-h-screen pt-[100px] px-4">
                <div className="w-full max-w-[400px] space-y-8">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold text-secondary">Sign In</h1>
                        <p className="text-gray-500">Enter your credentials to access your account</p>
                    </div>

                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-base font-bold text-black">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                placeholder="seu@email.com"
                                className="w-full h-[38px] px-4 bg-white border border-[#94979B] rounded-[8px] text-[#101820] placeholder-[#A2AAB6] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-base font-bold text-black">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                placeholder="********"
                                className="w-full h-[38px] px-4 bg-white border border-[#94979B] rounded-[8px] text-[#101820] placeholder-[#A2AAB6] focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                type="button"
                                className="w-full h-[40px] px-6 text-lg font-normal text-white bg-[#EA7603] hover:bg-[#d66b02] rounded-full transition-all duration-200 shadow-sm flex items-center justify-center cursor-pointer"
                            >
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
