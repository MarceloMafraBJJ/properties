import CtaButton from "@/components/shared/cta-button";
import SectionDescription from "@/components/shared/section-description";
import SectionTitle from "@/components/shared/section-title";
import Image from "next/image";

const WhoWeAre = () => {
  return (
    <section className="grid lg:grid-cols-2 gap-10 py-8 lg:h-[400px] h-full place-items-center">
      <div className="flex flex-col space-y-8">
        <div className="flex items-center gap-x-5">
          <div className="w-[100px] bg-white h-[2px]" />
          <span className="uppercase text-sm">Who we are</span>
        </div>

        <SectionTitle>
          Discover Sustainable Luxury Living with EcoHaven Realty.
        </SectionTitle>

        <SectionDescription>
          EcoHaven Realty is a real estate agency specializing in eco-friendly
          homes and sustainable living. We offer a range of eco-friendly
          properties, including energy-efficient homes, homes built with
          eco-friendly materials, and homes equipped with sustainable
          technologies such as solar panels.
        </SectionDescription>

        <CtaButton>Our Company</CtaButton>
      </div>

      <div className="w-full h-full min-h-[200px] relative">
        <Image
          src={"/images/who-we-are.jpg"}
          alt="who we are img"
          fill
          className="object-cover rounded-xl"
        />
      </div>
    </section>
  );
};

export default WhoWeAre;
