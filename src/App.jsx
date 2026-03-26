import { useEffect, useRef, useState } from "react";

import Cursor from "./components/Cursor";
import Footer from "./components/Footer";
import GlobalStyle from "./components/GlobalStyle";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Noise from "./components/Noise";
import ThreeBackground from "./components/ThreeBackground";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import Process from "./sections/Process";
import Skills from "./sections/Skills";
import Testimonials from "./sections/Testimonials";
import Ticker from "./sections/Ticker";
import Works from "./sections/Works";

export default function App() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const [scrollT, setScrollT] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const bgIntensity = 0.85 + scrollT * 0.65;

  useEffect(() => {
    setLoadProgress(100);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
        setScrollT(Math.min(1, Math.max(0, window.scrollY / max)));
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (loadProgress < 100) return;
    const timer = setTimeout(() => setIsLoaded(true), 600);
    return () => clearTimeout(timer);
  }, [loadProgress]);

  return (
    <>
      <GlobalStyle />
      <Noise />
      <LoadingScreen progress={loadProgress} isVisible={!isLoaded} />
      <ThreeBackground mouseRef={mouseRef} intensity={bgIntensity} />
      <Cursor mouseRef={mouseRef} />
      <div style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.5s ease", pointerEvents: isLoaded ? "auto" : "none" }}>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Works />
        <Process />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      </div>
    </>
  );
}
