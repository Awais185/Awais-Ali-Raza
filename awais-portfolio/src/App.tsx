import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import SkillFlow from "@/components/sections/SkillFlow";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Research from "@/components/sections/Research";
import Contact from "@/components/sections/Contact";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <main className="w-full pt-20">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <SkillFlow />
        <Experience />
        <Education />
        <Research />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
