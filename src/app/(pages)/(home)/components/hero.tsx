"use client";

import Combobox from "@/components/shared/combobox";
import { Category } from "@prisma/client";
const Hero = ({ categories }: { categories: Category[] }) => {
  return (
    <section className="h-full min-h-[calc(100vh_-_100px)] flex justify-center">
      <div className="flex items-center justify-center flex-col gap-5 mb-10 max-w-[80%] lg:max-w-none">
        <h1 className="text-5xl xl:text-6xl text-center font-semibold italic">
          Live green, live luxuriously.
        </h1>

        <h3 className="text-base text-center">
          Discover the Advantages of Eco-Friendly Homes with Our Real Estate
          Agency.
        </h3>

        <Combobox data={categories} variant="light" onChange={() => {}} />
      </div>

      <div className="-z-10 h-screen bg-home inset-0 bg-cover absolute flex flex-col items-center justify-center gap-5" />
    </section>
  );
};

export default Hero;
