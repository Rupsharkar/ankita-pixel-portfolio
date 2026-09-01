import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { Toaster } from "sonner";
import { initLenis, startScroll, stopScroll } from "@/lib/scroll";
import CRTOverlay from "@/components/CRTOverlay";
import Navbar from "@/components/Navbar";
import BootScreen from "@/components/BootScreen";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Quests from "@/components/Quests";
import Achievements from "@/components/Achievements";
import MiniGame from "@/components/MiniGame";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import KonamiEasterEgg from "@/components/KonamiEasterEgg";
import KawaiiBuddy from "@/components/KawaiiBuddy";

export default function Home() {
  const [booted, setBooted] = useState(false);

  useEffect(() => initLenis(), []);

  useEffect(() => {
    if (booted) startScroll();
    else stopScroll();
  }, [booted]);

  return (
    <div className="min-h-screen bg-void font-code text-slate-200">
      <CRTOverlay />
      <Navbar />
      <AnimatePresence>{!booted && <BootScreen onStart={() => setBooted(true)} />}</AnimatePresence>
      <main>
        <Hero booted={booted} />
        <Marquee />
        <About />
        <Skills />
        <Quests />
        <Achievements />
        <MiniGame />
        <Contact />
      </main>
      <Footer />
      <KonamiEasterEgg />
      <KawaiiBuddy />
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "#0f172a",
            border: "2px solid #06b6d4",
            color: "#e2e8f0",
            fontFamily: "'VT323', monospace",
            fontSize: "18px",
            borderRadius: 0,
          },
        }}
      />
    </div>
  );
}
