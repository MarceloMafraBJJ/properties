"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Category, Property } from "@prisma/client";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "w-full max-w-[80%] lg:max-w-[600px] justify-between h-12",
  {
    variants: {
      variant: {
        default: "bg-background border border-border hover:bg-secondary",
        light: "bg-white text-black hover:bg-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Combobox = ({
  data,
  variant,
  onChange,
}: {
  data: Category[] | Property[];
  variant?: "default" | "light";
  onChange: (value: Category | Property) => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className={cn(buttonVariants({ variant }))}
        >
          {value
            ? data.find((data) => data.name.toLowerCase() === value)?.name
            : "Explore by categories..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="lg:w-[600px] p-0 mt-2">
        <Command>
          <CommandInput placeholder="Search category..." className="h-9" />
          <CommandEmpty>No category found.</CommandEmpty>
          <CommandGroup className="h-[200px] overflow-y-scroll">
            {data.map((data) => (
              <CommandItem
                key={data.id}
                value={data.name.toLowerCase()}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  onChange(data);
                  setOpen(false);
                }}
              >
                {data.name}

                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    data.name.toLowerCase() === value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
