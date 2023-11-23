"use client";

import useFormStore from "@/contexts/useFormStore";
import BasicInfoForm from "./basic-info-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ReactNode } from "react";
import LocationForm from "./location-form";
import { Category } from "@prisma/client";
import ImagesForm from "./images-form";
import CheckInfo from "./check-info";

const FormSteps = ({ categories }: { categories: Category[] }) => {
  const { step } = useFormStore();

  switch (step) {
    case 1:
      return (
        <CardStep title="Basic info">
          <BasicInfoForm categories={categories} />
        </CardStep>
      );
    case 2:
      return (
        <CardStep title="Location">
          <LocationForm />
        </CardStep>
      );
    case 3:
      return (
        <CardStep title="Select your favorite images">
          <ImagesForm />
        </CardStep>
      );
    case 4:
      return (
        <CardStep title="Check your property infos">
          <CheckInfo />
        </CardStep>
      );
  }
};

export default FormSteps;

const CardStep = ({
  title,
  children,
}: {
  title: string;

  children: ReactNode;
}) => {
  const { step } = useFormStore();

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle className="text-2xl">
          {title} - <span className="text-xl font-medium">Step {step}</span>
        </CardTitle>
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
};
