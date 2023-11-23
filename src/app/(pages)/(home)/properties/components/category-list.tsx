"use client";

import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const CategoryList = ({
  categories,
  searchParams,
}: {
  categories: Category[];
  searchParams: string;
}) => {
  const { replace, refresh } = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const handleEditCategory = async (slug: string) => {
    let params = new URLSearchParams(window.location.search);

    if (slug && slug !== searchParams) {
      params.set("category-slug", slug);
    } else if (!slug || searchParams) {
      params.delete("category-slug");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });

    refresh();
  };

  return (
    <div className="flex gap-4 w-full overflow-x-auto scrollbar scrollbar-h-1 scrollbar-thumb-secondary-foreground/60 pb-1">
      {categories.map((category) => (
        <Button
          onClick={() => handleEditCategory(category.slug)}
          variant={"secondary"}
          className="h-full"
          key={category.id}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryList;
