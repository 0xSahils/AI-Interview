"use client";
import { useRouter } from "next/navigation";
import Download from "@/components/ui/Download";
import Faq from "@/components/ui/Faq";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import Hero from "@/components/ui/Hero";
import Pricing from "@/components/ui/Pricing";
import Testimonials from "@/components/ui/Testimonials";
import "./globals.css";
import Features from "@/components/ui/Features";

export default function Home() {
  const router = useRouter();

  const handleSubscribe = () => {
    router.push("/dashboard");
  };

  return (
    <div className="overflow-hidden">
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <Faq />
      <Testimonials />
      <Download />
      <Footer />
    </div>
  );
}

/* <p>Subscribe</p>
<Button onClick={handleSubscribe}>Subscribe</Button>{" "} */
