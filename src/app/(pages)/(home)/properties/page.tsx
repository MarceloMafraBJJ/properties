import PropertyCard from "@/components/shared/property-card";
import { prismaClient } from "@/lib/prisma";
import SearchInput from "./components/search-input";
import { Separator } from "@/components/ui/separator";
import CategoryList from "./components/category-list";
import Combobox from "@/components/shared/combobox";
import FindPropertiesContainer from "./components/find-properties-container";

interface HomeProps {
  searchParams: {
    "category-slug": string;
  };
}

export default async function PropertiesPage({ searchParams }: HomeProps) {
  const properties = await prismaClient.property.findMany({
    take: 10,
    where: { category: { slug: searchParams["category-slug"] } },
  });

  const categories = await prismaClient.category.findMany();

  const categorySelected =
    searchParams["category-slug"] &&
    (await prismaClient.category.findUnique({
      where: { slug: searchParams["category-slug"] },
    }));

  return (
    <main className="h-full w-full space-y-12 layout">
      <div className="space-y-8">
        <h1 className="text-3xl uppercase font-semibold">
          {categorySelected ? categorySelected.name : "All Properties"}
        </h1>

        <FindPropertiesContainer
          properties={properties}
          categories={categories}
          searchParams={searchParams["category-slug"]}
        />
      </div>

      <Separator />

      <div className="grid-layout">
        {properties?.map((property) => (
          <PropertyCard {...property} key={property.id} />
        ))}
      </div>
    </main>
  );
}
