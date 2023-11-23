import SectionDescription from "@/components/shared/section-description";
import SectionTitle from "@/components/shared/section-title";
import BenefitCard from "./benefit-card";

const Benefits = () => {
  const benefits = [
    {
      id: "1",
      title: "Low Energy costs",
      description:
        "One of the most significant benefits of owning an Eco Haven Realty Home is lower energy costs. Our eco-friendly homes are designed to use less energy with our solar powered system, saving money on bills.",
      img: "/images/benefit-1.jpg",
    },
    {
      id: "2",
      title: "Smaller carbon footprint ",
      description:
        "Our eco-friendly homes also have a smaller carbon footprint. They constantly use renewable energy sources and produce less waste which means they have a lower impact on the environment.",
      img: "/images/benefit-2.jpg",
    },
    {
      id: "3",
      title: "Indoor",
      description:
        "Our hybrid ventilation strategy includes both natural and mechanical ventilation, while our airtight wooden structure reduces risk of mold development, ensuring a healthy home.",
      img: "/images/benefit-3.jpg",
    },
  ];

  return (
    <section className="flex items-center justify-center flex-col space-y-2 py-16 bg-secondary drop-shadow-2xl">
      <div className="layout space-y-2">
        <SectionTitle>Benefits of owning an eco-friendly home.</SectionTitle>

        <SectionDescription>
          High-quality homes with low-carbon impact.
        </SectionDescription>
      </div>

      <div className="grid-layout place-items-center gap-y-8 justify-items-center w-full h-full layout pt-10">
        {benefits.map((benefit) => (
          <BenefitCard benefit={benefit} key={benefit.id} />
        ))}
      </div>
    </section>
  );
};

export default Benefits;
