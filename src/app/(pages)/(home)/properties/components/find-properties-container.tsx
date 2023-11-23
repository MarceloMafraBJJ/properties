"use client";

import Combobox from "@/components/shared/combobox";
import CategoryList from "./category-list";
import { Category, Property } from "@prisma/client";

interface FindPropertiesContainerProps {
  properties: Property[];
  categories: Category[];
  searchParams: string;
}

const FindPropertiesContainer = ({
  categories,
  properties,
  searchParams,
}: FindPropertiesContainerProps) => {
  return (
    <div className="flex lg:flex-row flex-col gap-10">
      <Combobox data={properties} onChange={() => {}} />

      <CategoryList categories={categories} searchParams={searchParams} />
    </div>
  );
};

export default FindPropertiesContainer;
