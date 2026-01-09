// app/page.tsx
import HeroSection from "@/components/home/HeroSection";
import QuickActions from "@/components/home/QuickActions";
import VideoSection from "@/components/home/VideoSection";
import FeaturedContent from "@/components/home/FeaturedContent";
import ServicesShowcase from "@/components/home/ServicesShowcase";
import CalculatorsSection from "@/components/home/CalculatorsSection";
import TrustSection from "@/components/home/TrustSection";
import FaqOptimized from "@/components/home/FaqOptimized";
import { Contact } from "@/components/contact";
import { FloatingAction } from "@/components/floating-contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-slate-900">
      <HeroSection />
      <QuickActions />
      <FeaturedContent />
      <VideoSection />
      <ServicesShowcase />
      <CalculatorsSection />
      <TrustSection />
      <FaqOptimized />
      <Contact />
      <FloatingAction />
    </main>
  );
}
