import CtaButton from "@/components/shared/cta-button";
import SectionDescription from "@/components/shared/section-description";
import SectionTitle from "@/components/shared/section-title";

const CtaSection = () => {
  return (
    <section className="bg-cta h-[500px] rounded-xl bg-cover bg-center layout flex items-center justify-center">
      <div className="bg-secondary/90 p-8 rounded-lg flex flex-col items-center gap-3 w-[90%] lg:w-[600px] text-center">
        <SectionTitle>Ready to find your eco-friendly home?</SectionTitle>

        <SectionDescription>
          We have homes in 20+ cities across the country to choose from!
        </SectionDescription>

        <CtaButton>Browse Homes</CtaButton>
      </div>
    </section>
  );
};

export default CtaSection;
