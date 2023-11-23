import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { PROPERTY_FEATURES } from "@/constants";
import useFormStore from "@/contexts/useFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BedDouble,
  CarFront,
  LandPlot,
  MapPin,
  ShowerHead,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  location: z.string().min(10, {
    message: "Location must be at least 10 characters.",
  }),
  area: z.string(),
  carSpaces: z.string(),
  bedrooms: z.string(),
  bathrooms: z.string(),
  characteristics: z.string().array().nullish(),
});

const LocationForm = () => {
  const { setStep, step, setLocation, location } = useFormStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      location: location?.location || "",
      area: location?.area || "",
      carSpaces: location?.carSpaces || "",
      bedrooms: location?.bedrooms || "",
      bathrooms: location?.bathrooms || "",
      characteristics: location?.characteristics || [],
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLocation({ ...data });
    return setStep(step + 1);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          id="location-form"
        >
          <div className="flex w-full gap-5">
            <Card>
              <CardHeader className="items-center">
                <MapPin size={50} />

                <CardTitle>Street with nº</CardTitle>
              </CardHeader>

              <CardContent>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder="44, Arizona Street, Ori nelson"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="items-center">
                <LandPlot size={50} />

                <CardTitle>Area - m²</CardTitle>
              </CardHeader>

              <CardContent>
                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input type="number" placeholder="2" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="items-center">
                <CarFront size={50} />

                <CardTitle>Car Spaces</CardTitle>
              </CardHeader>

              <CardContent>
                <FormField
                  control={form.control}
                  name="carSpaces"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input type="number" placeholder="2" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <div className="flex w-full gap-5">
            <Card>
              <CardHeader className="items-center">
                <BedDouble size={50} />

                <CardTitle>Bedrooms</CardTitle>
              </CardHeader>

              <CardContent>
                <FormField
                  control={form.control}
                  name="bedrooms"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input type="number" placeholder="2" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="items-center">
                <ShowerHead size={50} />

                <CardTitle>Bathrooms</CardTitle>
              </CardHeader>

              <CardContent>
                <FormField
                  control={form.control}
                  name="bathrooms"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input type="number" placeholder="2" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <FormField
            control={form.control}
            name="characteristics"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Characteristics</FormLabel>
                <FormControl>
                  <MultiSelect
                    selected={field.value || []}
                    options={PROPERTY_FEATURES}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="justify-between flex w-full mt-6">
        <Button type="button" onClick={() => setStep(step - 1)}>
          Prev Step
        </Button>

        <Button form="location-form">Next Step</Button>
      </div>
    </>
  );
};

export default LocationForm;
