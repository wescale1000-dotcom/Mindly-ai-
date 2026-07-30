import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Stats } from "../components/Stats";
import { Capabilities } from "../components/Capabilities";
import { Features } from "../components/Features";
import { Templates } from "../components/Templates";
import { CommunitySection } from "../components/CommunitySection";
import { PricingSection } from "../components/PricingSection";
import { ExamsSection } from "../components/ExamsSection";
import { AboutSection } from "../components/AboutSection";
import { CareersSection } from "../components/CareersSection";
import { Cta } from "../components/Cta";
import { Footer } from "../components/Footer";

export function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('hasSignedUp') === 'true') {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-sky-200 selection:text-sky-900">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Capabilities />
        <Features />
        <Templates />
        <ExamsSection />
        <CommunitySection />
        <PricingSection />
        <AboutSection />
        <CareersSection />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
