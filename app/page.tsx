import React from "react";
import { Navbar, SubNav } from "@/components/navigation";
import { HeroSection } from "@/components/hero";
import { KeyMetricsBar } from "@/components/KeyMetricsBar";
import { ChatWidget } from "@/components/chat/ChatWidget";
import {
  GlimpseSection,
  PackagesSection,
  PlanSection,
  DetailsSection,
  CtaSection,
  Footer,
} from "@/components/sections";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f6f3ec] text-slate-900 font-sans selection:bg-[#fa7a3d] selection:text-white relative">
      {/* 1. Main Navigation Bar (Sticky at top-0) */}
      <Navbar />

      {/* 2. Hero Section with Video Background */}
      <HeroSection />

      {/* 3. Floating Key Specifications Bar (overlapping the hero) */}
      <KeyMetricsBar />

      {/* 4. Sticky In-Page Sub-Navigation Bar (Sticky at top-[72px] right below Main Nav) */}
      <SubNav />

      {/* 5. A Glimpse of the Jump (Editorial & Experience Photo) */}
      <GlimpseSection />

      {/* 6. Choose Your Package (3-Tier Pricing Cards: Eco, Deluxe, VIP) */}
      <PackagesSection />

      {/* 7. The Plan (Your Day, Step by Step - 4 Linear Steps) */}
      <PlanSection />

      {/* 8. Details & Good to Know (The Specifics & Before You Book) */}
      <DetailsSection />

      {/* 9. Full-Width Bottom Call to Action Banner */}
      <CtaSection />

      {/* 10. Brand Footer */}
      <Footer />

      {/* 11. AI Chatbot Widget (assistant-ui & Gemini backend) */}
      <ChatWidget />
    </main>
  );
}
