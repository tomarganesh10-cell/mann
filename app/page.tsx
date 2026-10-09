import { Approach } from "@/components/Approach";
import { Contact } from "@/components/Contact";
import { Ecosystem } from "@/components/Ecosystem";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Impact } from "@/components/Impact";
import { Intro } from "@/components/Intro";
import { Navbar } from "@/components/Navbar";
import { PartnershipCTA } from "@/components/PartnershipCTA";

export default function Home() {
  return (
    <>
      <a href="#about" className="sr-only z-[100] bg-lime px-4 py-2 text-forest focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <Ecosystem />
        <Approach />
        <Impact />
        <PartnershipCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
