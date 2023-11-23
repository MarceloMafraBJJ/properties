"use client";

import { Label } from "@/components/ui/label";
import { FileVideo } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

const InputFile = ({
  onChange,
  previewURLsChange,
  imageUrl,
  isEditing,
  multiple = false,
}: {
  onChange: (value: FileList) => void;
  previewURLsChange?: (value?: string[]) => void;
  imageUrl: string;
  isEditing: Object | null;
  multiple?: boolean;
}) => {
  const [file, setFile] = useState<FileList>();
  const [previewURLs, setPreviewURLs] = useState<string[]>([]);

  const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) return;

    setFile(files);

    const newPreviewURLs = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewURLs((prev) => [...prev, ...newPreviewURLs]);
  };

  const previewStaticURL = useMemo(() => {
    if (!file || previewURLs.length === 0) {
      return null;
    }

    return previewURLs[0];
  }, [file, previewURLs]);

  useEffect(() => {
    if (previewURLsChange) {
      previewURLsChange(previewURLs);
    }
  }, [previewURLs, previewURLsChange]);

  useEffect(() => {
    if (file) {
      onChange(file);
    }
  }, [file, onChange]);

  return (
    <div>
      <Label
        htmlFor="file"
        className={`relative flex h-[300px] min-w-[250px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded border border-dashed border-muted-foreground text-sm text-muted-foreground hover:bg-primary/5 
        `}
      >
        {imageUrl || previewStaticURL ? (
          <Image
            src={!isEditing ? previewStaticURL || imageUrl : imageUrl}
            alt="Company preview"
            width={0}
            height={0}
            sizes="100vw"
            className="h-full w-full object-cover max-w-max"
          />
        ) : (
          <>
            <FileVideo className="h-4 w-4" />
            Files
          </>
        )}
      </Label>

      <input
        type="file"
        id="file"
        accept="image/png, image/jpeg, image/jpg"
        className="sr-only"
        multiple={multiple}
        onChange={handleFileSelected}
      />
    </div>
  );
};

export default InputFile;
