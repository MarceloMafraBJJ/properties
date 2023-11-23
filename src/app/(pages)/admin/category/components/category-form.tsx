"use client";

import { createCategory, editCategory } from "@/actions/category";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputFile from "../../components/input-file";
import { Label } from "@/components/ui/label";
import { deleteImageFromS3, uploadImageToS3 } from "@/actions/handleImageToS3";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Category } from "@prisma/client";
import { XCircle } from "lucide-react";
import { useTransition } from "react";
import { createSlug } from "@/app/helpers/create-slug";

const MAX_FILE_SIZE = 10000000;

const checkFileType = (file: File) => {
  if (file?.name) {
    const fileType = file.name.split(".").pop() as string;
    if (["png", "jpeg", "jpg"].includes(fileType)) return true;
  }
  return false;
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(25, {
    message: "Message must be at least 25 characters.",
  }),
  file: z.any().nullable(),
});

const CategoryForm = ({ categoryToEdit }: { categoryToEdit?: Category }) => {
  const router = useRouter();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: categoryToEdit?.name || "",
      description: categoryToEdit?.description || "",
      file: categoryToEdit?.imageUrl || "",
    },
  });

  const onSubmit = async ({
    description,
    name,
    file,
  }: z.infer<typeof formSchema>) => {
    if (file[0] && file[0].size > MAX_FILE_SIZE) {
      return toast.error("Max size is 10MB.");
    } else if (checkFileType(file)) {
      return toast.error("Only .jpg, .gif, .png formats are supported.");
    }

    const formData = new FormData();
    formData.append("image", file[0]);

    if (categoryToEdit?.imageUrl && file) {
      await deleteImageFromS3({ file: categoryToEdit?.imageUrl });
    }

    let uploadedImage = file && (await uploadImageToS3({ formData }));

    let categoryData = {
      name,
      description,
      slug: createSlug(name),
      imageUrl: uploadedImage || "",
    };

    if (categoryToEdit) {
      await editCategory({ categoryData, id: categoryToEdit.id });
      toast.success("Category edited successfully.");
    } else {
      await createCategory({ categoryData });
      toast.success("Category created successfully.");
    }

    form.reset();
    return router.refresh();
  };

  const handleClearParams = () => {
    let params = new URLSearchParams(window.location.search);

    params.delete("id");

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@gmail.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Hello! ...." {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full space-y-2">
          <Label>Logo</Label>
          <InputFile
            onChange={(value: FileList) => form.setValue("file", value)}
            imageUrl={categoryToEdit?.imageUrl || ""}
            isEditing={null}
          />
        </div>

        {categoryToEdit ? (
          <div className="flex justify-between items-center">
            <Button type="submit">Edit Category</Button>

            <Button
              onClick={handleClearParams}
              variant={"destructive"}
              size={"icon"}
              type="button"
            >
              <XCircle />
            </Button>
          </div>
        ) : (
          <Button type="submit">Create Category</Button>
        )}
      </form>
    </Form>
  );
};

export default CategoryForm;
