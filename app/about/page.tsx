import type { Metadata } from "next";
import { AboutSection, WhySection } from "@/components/home";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: site.about,
};

export default function AboutPage() {
  return (
    <>
      <AboutSection as="h1" />
      <WhySection />
    </>
  );
}
