import Header from "@/components/landing/header";
import HeroSection from "@/components/landing/hero";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white dark:bg-black">
      <Header />
      <HeroSection />
      <Footer />
    </main>
  );
}
