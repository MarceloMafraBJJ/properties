import { uploadImageToS3 } from "@/actions/handleImageToS3";
import { createProperty } from "@/actions/property";
import { createSlug } from "@/app/helpers/create-slug";
import { Button } from "@/components/ui/button";
import useFormStore from "@/contexts/useFormStore";
import { Property } from "@prisma/client";
import {
  BadgeDollarSign,
  BedDouble,
  CarFront,
  Dot,
  LandPlot,
  MapPin,
  ScrollText,
  ShowerHead,
  SquareStack,
  Trash,
  Type,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CheckInfo = () => {
  const router = useRouter();

  const {
    basicInfo,
    location,
    selectedImages,
    setSelectedImages,
    setStep,
    step,
  } = useFormStore();

  switch (true) {
    case !basicInfo:
      setStep(1);
      break;
    case !location:
      setStep(2);
      break;
    case !selectedImages:
      setStep(3);
      break;
    default:
      break;
  }

  const formattedPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleRemoveImage = (previewUrl: string) => {
    if (selectedImages) {
      const index = selectedImages.previewUrls.findIndex(
        (url) => url === previewUrl
      );

      if (index !== -1) {
        const updatedFiles = [...selectedImages.files];
        updatedFiles.splice(index, 1);

        const updatedPreviewUrls = [...selectedImages.previewUrls];
        updatedPreviewUrls.splice(index, 1);

        setSelectedImages({
          files: updatedFiles,
          previewUrls: updatedPreviewUrls,
        });
      }
    }
  };

  const handleSubmit = async () => {
    let imageUrls: any = [];

    for (const file of selectedImages?.files!) {
      const formData = new FormData();
      formData.append("image", file);

      let uploadedImage = file && (await uploadImageToS3({ formData }));
      imageUrls.push(uploadedImage);
      try {
      } catch (error) {
        console.error("Error uploading image:", error);
      }

      const propertyData = {
        name: basicInfo?.name || "",
        slug: createSlug(basicInfo?.name || ""),
        price: parseFloat(basicInfo?.price!) || 0,
        description: basicInfo?.description || null,
        characteristics: location?.characteristics || [],
        location: location?.location || "",
        area: location?.area!,
        carSpaces: location?.carSpaces!,
        bathrooms: location?.bathrooms!,
        bedrooms: location?.bedrooms!,
        imageUrls: imageUrls,
        categoryId: basicInfo?.category?.id!,
      };

      await createProperty({ propertyData });
      toast.success("Property created successfully.");
      return router.refresh();
    }
  };

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-2xl uppercase italic">Basic Info</h2>

        <ul className="space-y-1 flex flex-wrap gap-4 w-full">
          <li>
            <Type /> {basicInfo?.name}
          </li>
          <li>
            <ScrollText /> {basicInfo?.description}
          </li>
          <li>
            <BadgeDollarSign /> {formattedPrice(Number(basicInfo?.price))}
          </li>
          <li>
            <SquareStack /> {basicInfo?.category?.name}
          </li>
        </ul>

        <h2 className="text-2xl uppercase italic">Location</h2>

        <ul className="space-y-1 flex flex-wrap gap-4 w-full">
          <li>
            <MapPin /> {location?.location}
          </li>
          <li>
            <LandPlot /> {location?.area}
          </li>
          <li>
            <ShowerHead /> {location?.bathrooms}
          </li>
          <li>
            <BedDouble /> {location?.bedrooms}
          </li>
          <li>
            <CarFront /> {location?.carSpaces}
          </li>
        </ul>

        <ul className="space-y-1 flex flex-wrap gap-2 w-full">
          {location?.characteristics?.map((item) => (
            <li>
              <Dot /> <li>{item}</li>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl uppercase italic">Images</h2>

        <ul className="space-y-1 flex flex-wrap gap-4 w-full">
          {selectedImages?.previewUrls.map((previewUrl) => (
            <li className="relative group">
              <Image
                src={previewUrl}
                alt="previewUrl"
                width={0}
                height={0}
                sizes="100vw"
                className="object-cover w-24 h-24 border-2 border-secondary rounded-md hover:scale-105 transition-all group-hover:opacity-50"
              />
              <Trash
                className="absolute inset-0 m-auto hidden group-hover:block text-red-500 fill-red-500 cursor-pointer"
                onClick={() => handleRemoveImage(previewUrl)}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="justify-between flex w-full mt-6">
        <Button type="button" onClick={() => setStep(step - 1)}>
          Prev Step
        </Button>

        <Button
          form="location-form"
          variant={"destructive"}
          onClick={handleSubmit}
        >
          Create Property
        </Button>
      </div>
    </>
  );
};

export default CheckInfo;
