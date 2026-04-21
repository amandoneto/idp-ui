"use client"
import Link from 'next/link';
import Image from 'next/image';

export default function Main() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center pt-[100px] overflow-hidden bg-background transition-colors duration-500 text-center px-6">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/pdi.jpg"
                    alt="PDI Background"
                    fill
                    priority
                    className="object-cover object-center opacity-100 scale-105 animate-[subtle-zoom_20s_infinite_alternate]"
                />
                {/* Smooth Overlay for Readability - Theme Aware */}
                <div className="absolute inset-0 bg-linear-to-b from-background/80 via-background/40 to-background/80 backdrop-blur-[2px] transition-colors duration-500" />
            </div>

            <div className="relative z-10 max-w-4xl space-y-8 animate-[fade-up_1s_ease-out_forwards]">
                <h1 className="text-6xl md:text-7xl font-bold text-secondary tracking-tight leading-tight">
                    Bem-vindo a sua <br />
                    <span className="text-primary">Jornada de Desenvolvimento</span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium transition-all duration-700 delay-300">
                    Plano de Desenvolvimento Individual
                </p>

                <p className="text-muted-foreground/80 max-w-xl mx-auto leading-relaxed transition-all duration-700 delay-500">
                    Desenvolva-se e alcance seus objetivos com o PDI.
                    Gerencie seus objetivos, acompanhe seu progresso e atinja alturas novas em sua carreira e vida pessoal.
                </p>

                <div className="pt-8 transition-all duration-700 delay-700">
                    <Link href="/sign-in">
                        <button className="px-8 py-4 text-base font-bold text-white bg-primary hover:bg-orange-700 rounded-md transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 active:scale-95">
                            Começar
                        </button>
                    </Link>
                </div>
            </div>

            <style jsx global>{`
                @keyframes subtle-zoom {
                    from { transform: scale(1); }
                    to { transform: scale(1.1); }
                }
                @keyframes fade-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    );
}
