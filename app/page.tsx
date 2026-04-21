import Header from "./components/Header";
import Hero from "./components/main";

export default function Home() {
    return (
        <main className="min-h-screen bg-background transition-colors duration-500">
            <Header />
            <Hero />
        </main>
    );
}
