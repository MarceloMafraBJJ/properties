"use client";

import { deleteCategory } from "@/actions/category";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Category } from "@prisma/client";
import { FileEdit, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast, { Toaster } from "react-hot-toast";

const CategoryItem = ({ id, name, description, slug, imageUrl }: Category) => {
  const router = useRouter();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteCategory = async (categoryId: string) => {
    setIsLoading(true);
    await deleteCategory({ id: categoryId });
    toast.success("Category deleted successfully!");
    return router.refresh();
  };

  const handleEditCategory = async (id: string) => {
    let params = new URLSearchParams(window.location.search);

    if (id) {
      params.set("id", id);
    } else {
      params.delete("id");
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });

    router.refresh();
  };

  return (
    <Card className="hover:bg-secondary transition-all cursor-pointer flex items-center justify-between px-4 lg:px-8">
      <Toaster />
      <CardHeader className="px-0">
        <CardTitle className="truncate max-w-[200px]">{name}</CardTitle>

        <CardDescription className="line-clamp-2 max-w-[300px] bre">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center flex-row gap-3 p-0">
        <Button
          onClick={() => handleEditCategory(id)}
          disabled={isLoading}
          size={"icon"}
        >
          <FileEdit size={20} />
        </Button>

        <Button
          disabled={isLoading}
          variant={"destructive"}
          size={"icon"}
          onClick={() => handleDeleteCategory(id)}
        >
          <X size={20} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default CategoryItem;
