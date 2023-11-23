"use client";

import SectionTitle from "@/components/shared/section-title";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import PropertyCard from "@/components/shared/property-card";
import CtaButton from "@/components/shared/cta-button";
import { Category, Property } from "@prisma/client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const PropertiesForSale = ({
  properties,
  categories,
  categorySelected,
}: {
  properties: Property[];
  categories: Category[];
  categorySelected?: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const { replace, push } = useRouter();
  const pathname = usePathname();

  const handleSearchCategory = (slug: string) => {
    let params = new URLSearchParams(window.location.search);

    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}&#properties-for-sale`);
    });
  };

  const categorySelectedData = categories.find(
    (category) => category.slug == (categorySelected || categories[0].slug)
  );

  const filteredProperties = properties.filter(
    (property) => property.categoryId == categorySelectedData?.id
  );

  return (
    <section id="properties-for-sale" className="py-8">
      <SectionTitle>Explore Eco-friendly Homes Near You.</SectionTitle>

      <div className="my-4 gap-4 flex flex-col lg:flex-row">
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => handleSearchCategory(category.slug)}
            variant={categorySelected == category.slug ? "default" : "outline"}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="flex items-center justify-center flex-col space-y-8 my-10">
        <div className="grid-layout transition-all">
          {filteredProperties.map((property) => (
            <PropertyCard {...property} key={property?.id} />
          ))}
        </div>

        <CtaButton onClick={() => push("/properties")}> Browse now </CtaButton>
      </div>
    </section>
  );
};

export default PropertiesForSale;
