"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Property } from "@prisma/client";
import { Clock3, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PropertyCard = ({
  name,
  price,
  imageUrls,
  location,
  createdAt,
  characteristics,
  slug,
}: Property) => {
  const formattedPrice = price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const formattedDate = createdAt.toLocaleDateString();

  return (
    <Link href={`/properties/${slug}`}>
      <Card className="group">
        <CardHeader>
          <div className="flex gap-2 flex-col">
            <CardTitle className="max-w-[200px] truncate text-xl">
              {name}
            </CardTitle>
            <CardTitle className="max-w-[200px] truncate font-medium">
              {formattedPrice}
            </CardTitle>
          </div>

          <div className="flex justify-between items-center gap-10">
            <CardDescription className="max-w-[200px] truncate">
              {characteristics.map((item) => `${item}, `)}
            </CardDescription>

            <span className="flex gap-2 text-xs text-muted-foreground items-center justify-center">
              <Clock3 size={15} />
              {formattedDate}
            </span>
          </div>
        </CardHeader>

        <CardContent>
          <div className="relative w-full h-[250px] overflow-hidden rounded-sm">
            <Image
              src={imageUrls[0]}
              alt={name}
              fill
              className="object-cover rounded-sm border-2 border-secondary group-hover:scale-110 transition-all"
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center">
          <p className="truncate max-w-[230px] text-sm decoration-dotted underline text-muted-foreground">
            {location}
          </p>

          <Heart
            size={18}
            className="hover:fill-white opacity-90 transition-all"
            onClick={() => {}}
          />
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PropertyCard;
