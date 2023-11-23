import WhoWeAre from "./components/who-we-are";
import OurMission from "./components/our-mission";
import Hero from "./components/hero";
import PropertiesForSale from "./components/properties-for-sale";
import { Separator } from "@/components/ui/separator";
import Benefits from "./components/benefits";
import Testimonials from "./components/testimonials";
import FrequentlyAskedQuestions from "./components/frequently-asked-questions";
import Contact from "./components/contact";
import CtaSection from "./components/cta-section";
import { prismaClient } from "@/lib/prisma";

interface HomeProps {
  searchParams: {
    category?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const categories = await prismaClient.category.findMany();
  const properties = await prismaClient.property.findMany();

  return (
    <main className="h-full w-full space-y-12 lg:space-y-24">
      <Hero categories={categories} />

      <div className="layout space-y-6 lg:space-y-24">
        <WhoWeAre />
        <OurMission />

        <Separator className="my-8" />

        <PropertiesForSale
          properties={properties}
          categories={categories}
          categorySelected={searchParams?.category}
        />
      </div>

      <Benefits />

      <div className="layout space-y-12 lg:space-y-24">
        <Testimonials />
        <FrequentlyAskedQuestions />
      </div>

      <Contact />

      <CtaSection />
    </main>
  );
}
