"use client";

import SectionDescription from "@/components/shared/section-description";
import SectionTitle from "@/components/shared/section-title";
import StarRating from "@/components/shared/star-rating";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SLIDES } from "@/constants";

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const previousSlide = () => {
    setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="flex items-center justify-center flex-col">
      <SectionTitle>What our customers say?</SectionTitle>
      <SectionDescription>
        Hear from our satisfied customers and clients.
      </SectionDescription>

      <div className="flex gap-10 transition-all duration-500 w-full items-center pt-12 pb-8 justify-center lg:hidden">
        <AnimatePresence initial={false} custom={current}>
          {SLIDES.slice(current, current + 1).map((slide, index) => (
            <motion.div
              key={index}
              className="w-[500px] h-[230px] relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Card className="w-full h-full relative">
                <div className="bg-secondary p-4 rounded-full max-w-max absolute -top-8 right-8">
                  <Quote size={26} />
                </div>

                <CardHeader className="pt-10">
                  <CardTitle className="text-xl truncate">
                    {slide.user}
                  </CardTitle>

                  <div className="flex gap-2 items-center">
                    <CardDescription className="text-base">
                      {slide.assessment.toFixed(1)}
                    </CardDescription>
                    <StarRating assessment={slide.assessment} />
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="line-clamp-3">{slide.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="lg:flex gap-10 transition-all duration-500 w-full items-center pt-12 pb-8 justify-center hidden">
        <AnimatePresence initial={false} custom={current}>
          {SLIDES.slice(current, current + 2).map((slide, index) => (
            <motion.div
              key={index}
              className="w-[500px] h-[230px] relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Card className="w-full h-full relative">
                <div className="bg-secondary p-4 rounded-full max-w-max absolute -top-8 right-8">
                  <Quote size={26} />
                </div>

                <CardHeader className="pt-10">
                  <CardTitle className="text-xl truncate">
                    {slide.user}
                  </CardTitle>

                  <div className="flex gap-2 items-center">
                    <CardDescription className="text-base">
                      {slide.assessment.toFixed(1)}
                    </CardDescription>
                    <StarRating assessment={slide.assessment} />
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="line-clamp-3">{slide.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex gap-4">
        <Button onClick={previousSlide} variant={"secondary"}>
          <ArrowLeft />
        </Button>

        <Button onClick={nextSlide} variant={"secondary"}>
          <ArrowRight />
        </Button>
      </div>
    </section>
  );
};

export default Testimonials;
