import { prismaClient } from "@/lib/prisma";
import CategoryForm from "./components/category-form";
import CategoryItem from "./components/category-item";
import { Separator } from "@/components/ui/separator";
import { Category } from "@prisma/client";

interface AdminCategoryProps {
  searchParams: {
    id: string;
  };
}

export default async function AdminCategory({
  searchParams,
}: AdminCategoryProps) {
  const categories = await prismaClient.category.findMany();
  const categoryToEdit =
    searchParams?.id &&
    (await prismaClient.category.findUnique({
      where: { id: searchParams.id },
    }));

  return (
    <main className="flex items-center justify-center flex-col lg:min-h-[calc(100vh_-_496px)]">
      <div className="w-full flex lg:flex-row flex-col gap-10 layout">
        <div className="flex-1 space-y-6">
          <h1 className="text-2xl uppercase font-semibold">
            Create Categories
          </h1>

          <CategoryForm categoryToEdit={categoryToEdit as Category} />
        </div>

        <Separator
          orientation="vertical"
          className="lg:min-h-[700px] hidden lg:block"
        />
        <Separator className="lg:hidden" />

        <div className="flex-1">
          <h1 className="text-xl font-semibold text-end">All Categories</h1>

          <div className="flex flex-col mt-12 gap-3 max-h-[500px] overflow-y-auto px-4 scrollbar-thin">
            {categories.length == 0 && (
              <p className="text-end text-muted-foreground">
                No categories found..
              </p>
            )}

            {categories?.map((category) => (
              <CategoryItem {...category} key={category.id} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
