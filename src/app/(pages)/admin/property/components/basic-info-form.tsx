import Combobox from "@/components/shared/combobox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useFormStore from "@/contexts/useFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Property } from "@prisma/client";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(25, {
    message: "Message must be at least 25 characters.",
  }),
  price: z.string(),
  category: z.any(),
});

const BasicInfoForm = ({ categories }: { categories: Category[] }) => {
  const { setStep, step, setBasicInfo, basicInfo } = useFormStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: basicInfo?.name || "",
      description: basicInfo?.description || "",
      price: basicInfo?.price || "",
      category: basicInfo?.category || "",
    },
  });

  const onSubmit = async ({
    name,
    description,
    price,
    category,
  }: z.infer<typeof formSchema>) => {
    if (!name || !description || !price) return toast.error("Fill all fields");
    setBasicInfo({ name, description, price, category });
    return setStep(step + 1);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          id="basic-form"
        >
          <div className="flex w-full gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Great Property in Brazil" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="$ 490.000" type="number" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Great Property in Brazil, with a big area and a great kitchen."
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <Label>Select a category</Label>
            <Combobox
              data={categories}
              onChange={(value: Category | Property) =>
                form.setValue("category", value)
              }
            />
          </div>
        </form>
      </Form>

      <Button form="basic-form" className="mt-6">
        Next Step
      </Button>
    </>
  );
};

export default BasicInfoForm;
