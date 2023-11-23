"use server";

import { prismaClient } from "@/lib/prisma";
import { Property } from "@prisma/client";

export const createProperty = async ({
  propertyData,
}: {
  propertyData: Omit<Property, "id">;
}) => {
  try {
    const category = await prismaClient.property.create({
      data: { ...propertyData },
    });

    return category;
  } catch (error) {
    console.error(error);
  }
};
