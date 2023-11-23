import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useFormStore from "@/contexts/useFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputFile from "../../components/input-file";
import toast from "react-hot-toast";

const MAX_FILE_SIZE = 10000000;

const checkFileType = (file: File) => {
  if (file?.name) {
    const fileType = file.name.split(".").pop() as string;
    if (["png", "jpeg", "jpg"].includes(fileType)) return true;
  }
  return false;
};

const formSchema = z.object({
  files: z.any().nullable(),
  previewUrls: z.any().nullable(),
});

const ImagesForm = () => {
  const { setStep, step, setSelectedImages, selectedImages } = useFormStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      files: selectedImages?.files || "",
      previewUrls: selectedImages?.previewUrls || "",
    },
  });

  const onSubmit = async ({
    files,
    previewUrls,
  }: z.infer<typeof formSchema>) => {
    const fileArray: File[] = files ? Array.from(files) : [];

    const isLarger =
      fileArray.length > 0 &&
      fileArray.every((file: File) => file.size > MAX_FILE_SIZE);

    if (isLarger) {
      return toast.error("One or more files exceed the maximum size of 10MB.");
    } else if (fileArray.length > 0 && !checkFileType(fileArray[0])) {
      return toast.error("Only .jpg, .jpeg, and .png formats are supported.");
    }

    setSelectedImages({ files, previewUrls });
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
          <InputFile
            onChange={(value: FileList) => form.setValue("files", value)}
            imageUrl=""
            isEditing={null}
            previewURLsChange={(value?: string[]) =>
              form.setValue("previewUrls", value)
            }
            multiple
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

export default ImagesForm;
