"use server";

import { prismaClient } from "@/lib/prisma";
import { Category } from "@prisma/client";

export const createCategory = async ({
  categoryData,
}: {
  categoryData: Omit<Category, "id">;
}) => {
  try {
    const category = await prismaClient.category.create({
      data: { ...categoryData },
    });

    return category;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCategory = async ({ id }: { id: string }) => {
  try {
    const category = await prismaClient.category.delete({
      where: { id },
    });

    return category;
  } catch (error) {
    console.error(error);
  }
};

export const editCategory = async ({
  categoryData,
  id,
}: {
  categoryData: Omit<Category, "id">;
  id: string;
}) => {
  try {
    const category = await prismaClient.category.update({
      where: { id },
      data: { ...categoryData },
    });

    return category;
  } catch (error) {
    console.error(error);
  }
};
