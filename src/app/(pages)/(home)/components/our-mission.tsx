import CtaButton from "@/components/shared/cta-button";
import SectionDescription from "@/components/shared/section-description";
import SectionTitle from "@/components/shared/section-title";
import Image from "next/image";

const OurMission = () => {
  return (
    <section
      id="our-mission"
      className="flex flex-col-reverse lg:grid grid-cols-2 gap-10 lg:h-[400px] py-8 h-full place-items-center"
    >
      <div className="w-full h-full min-h-[200px] relative">
        <Image
          src={"/images/our-mission.jpg"}
          alt="who we are img"
          fill
          className="object-cover rounded-xl"
        />
      </div>

      <div className="flex flex-col space-y-8">
        <div className="flex items-center gap-x-5">
          <div className="w-[100px] bg-white h-[2px]" />

          <span className="uppercase text-sm">Our Mission</span>
        </div>

        <SectionTitle>
          Building a Better Future with Eco-Friendly Homes.
        </SectionTitle>

        <SectionDescription>
          The agency's mission is to provide clients with a selection of
          properties that meet high environmental standards, while also
          providing a comfortable and luxurious lifestyle.
        </SectionDescription>

        <CtaButton>Learn More</CtaButton>
      </div>
    </section>
  );
};

export default OurMission;
