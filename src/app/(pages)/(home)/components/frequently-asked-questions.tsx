import CtaButton from "@/components/shared/cta-button";
import SectionDescription from "@/components/shared/section-description";
import SectionTitle from "@/components/shared/section-title";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { FREQUENTLY_ASKED_QUESTIONS } from "@/constants";

const FrequentlyAskedQuestions = () => {
  return (
    <section className="flex justify-center flex-col lg:flex-row gap-x-20 h-full w-full">
      <div className="flex-[2] space-y-6">
        <div className="flex items-center gap-x-5">
          <div className="w-[100px] bg-white h-[2px] rounded-full" />
          <span className="uppercase text-sm">frequently asked questions</span>
        </div>

        <SectionTitle>
          Common questions asked about our eco-friendly homes.
        </SectionTitle>

        <SectionDescription>
          Here are some important questions that are frequently asked and the
          answers to the questions.
        </SectionDescription>

        <h2 className="text-lg font-semibold">Have a different question?</h2>

        <CtaButton>Learn More</CtaButton>
      </div>

      <Separator orientation="vertical" className="hidden lg:block" />

      <div className="flex-[3] lg:mt-0 mt-8">
        <Accordion type="multiple" className="space-y-8">
          {FREQUENTLY_ASKED_QUESTIONS.map(({ id, title, description }) => (
            <AccordionItem value={id} key={id}>
              <AccordionTrigger>{title}</AccordionTrigger>
              <AccordionContent>{description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FrequentlyAskedQuestions;
