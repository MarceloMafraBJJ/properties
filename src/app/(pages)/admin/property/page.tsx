import { Toaster } from "react-hot-toast";
import FormSteps from "./components/form-steps";
import { prismaClient } from "@/lib/prisma";

export default async function AdminProperty() {
  const categories = await prismaClient.category.findMany();

  return (
    <main className="flex items-center justify-center lg:min-h-[calc(100vh_-_496px)]">
      <Toaster />

      <div className="layout flex items-center justify-center w-full h-full">
        <FormSteps categories={categories} />
      </div>
    </main>
  );
}
