import {
  AboutSection,
  CategoryGrid,
  ContactSection,
  FeaturedProducts,
  Hero,
  HowToOrder,
  InstagramSection,
  Occasions,
  TrustStrip,
  WhySection,
} from "@/components/home";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <HowToOrder />
      <CategoryGrid />
      <FeaturedProducts />
      <WhySection />
      <Occasions />
      <InstagramSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
